import { NativeModules } from 'react-native';
const It2Picker = NativeModules.It2PickerModule as It2PickerModuleType;

export interface It2PickerModuleType {
    /**
     * Show Intent file selector and return content path
     */
    pickFile(): Promise<string>;
}

export { It2Picker };
