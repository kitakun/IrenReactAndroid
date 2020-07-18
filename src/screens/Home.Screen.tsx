import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Button, FAB } from 'react-native-paper';

import { getQuestionsFromTest } from '../logic';

const homeScreenStyles = StyleSheet.create({
    rootContainer: {
        margin: 10,
        flex: 1,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold"
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
});

const HomeScreen = ({ navigation }: { navigation: any }) => {
    return (
        <View style={homeScreenStyles.rootContainer}>

            <FAB
                style={homeScreenStyles.fab}
                icon="plus"
                onPress={() => getQuestionsFromTest()}
            />

            <Text style={homeScreenStyles.title}>Later, {"\n"}
             here will be previous test link
            </Text>

        </View>
    );
};

export default HomeScreen;