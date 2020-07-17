import React from 'react';
import { Button, Text } from 'react-native';
import DocumentPicker from 'react-native-document-picker';

const ProfileScreen = () => {
    return <>
        <Text>This is Jane's profile</Text>
        <Button
            title={'open file?'}
            onPress={pickSingleFile}></Button>
    </>;
};

const pickSingleFile = async function () {
    try {
        const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
        });
        console.log(
            res.uri,
            res.type, // mime type
            res.name,
            res.size
        );
    } catch (err) {
        if (DocumentPicker.isCancel(err)) {
            // User cancelled the picker, exit any dialogs or menus and move on
        } else {
            throw err;
        }
    }
}

export default ProfileScreen;