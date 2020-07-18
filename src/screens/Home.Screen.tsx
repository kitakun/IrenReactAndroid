import React from 'react';
import { Button, Text } from 'react-native';

const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <>
            <Text>Later here will be previous test link</Text>
            <Button
                title="Go to Jane's profile"
                onPress={() =>
                    navigation.navigate('Profile', { name: 'Jane' })
                }
            />
        </>
    );
};

export default HomeScreen;