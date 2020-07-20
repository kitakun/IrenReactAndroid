package com.it2pickermodule;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.BaseActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class It2PickerModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

    private static final int IMAGE_PICKER_REQUEST = 1;
    private static final String E_ACTIVITY_DOES_NOT_EXIST = "E_ACTIVITY_DOES_NOT_EXIST";
    private static final String E_PICKER_CANCELLED = "E_PICKER_CANCELLED";
    private static final String E_FAILED_TO_SHOW_PICKER = "E_FAILED_TO_SHOW_PICKER";
    private static final String E_NO_FILE_DATA_FOUND = "E_NO_FILE_DATA_FOUND";
    private static final String E_UNEXPECTED_RESULT = "E_UNEXPECTED_RESULT";

    private Promise mPickerPromise;

    private final ActivityEventListener mActivityEventListener = new BaseActivityEventListener() {

        @Override
        public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent intent) {
            try {
                if (requestCode == IMAGE_PICKER_REQUEST) {
                    if (mPickerPromise != null) {
                        if (resultCode == Activity.RESULT_CANCELED) {
                            mPickerPromise.reject(E_PICKER_CANCELLED, "File picker was cancelled");
                        } else if (resultCode == Activity.RESULT_OK) {
                            Uri uri = intent.getData();

                            if (uri == null) {
                                mPickerPromise.reject(E_NO_FILE_DATA_FOUND, "No file data found");
                            } else {
                                mPickerPromise.resolve(uri.getPath());
                            }
                        }
                    }
                }
            } catch (Exception error) {
                mPickerPromise.reject(E_UNEXPECTED_RESULT, error.getMessage());
            } finally {
                mPickerPromise = null;
            }
        }
    };

    public It2PickerModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;

        reactContext.addActivityEventListener(mActivityEventListener);
    }

    @Override
    public String getName() {
        return "It2PickerModule";
    }

    @ReactMethod
    public void pickFile(Promise resultPromise) {
        Activity currentActivity = getCurrentActivity();

        if (currentActivity == null) {
            resultPromise.reject(E_ACTIVITY_DOES_NOT_EXIST, "Activity doesn't exist");
            return;
        }

        // Store the promise to resolve/reject when picker returns data
        mPickerPromise = resultPromise;

        try {
            final Intent fileSelectorIntent = new Intent(Intent.ACTION_GET_CONTENT);

            fileSelectorIntent.addCategory(Intent.CATEGORY_OPENABLE);
            fileSelectorIntent.setType("*/*");

            final Intent chooserIntent = Intent.createChooser(fileSelectorIntent, "Pick an .it2 file");

            currentActivity.startActivityForResult(chooserIntent, IMAGE_PICKER_REQUEST);
        } catch (Exception e) {
            mPickerPromise.reject(E_FAILED_TO_SHOW_PICKER, e);
            mPickerPromise = null;
        }
    }
}