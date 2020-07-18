import { NativeModules } from 'react-native';
const It2Picker = NativeModules.It2PickerModule as It2PickerModuleType;

export interface It2PickerModuleType{
    pickFile(): Promise<string>;
}

export { It2Picker };
