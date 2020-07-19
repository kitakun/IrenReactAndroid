import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
// thirdparty
import { FAB } from 'react-native-paper';
// local
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
    const loadTestFromFile = async function () {
        const testData = await getQuestionsFromTest();
        if (testData) {
            navigation.navigate('DoTest', {
                filename: testData.fileName,
                data: testData.questions
            })
        }
    }

    return (
        <View style={homeScreenStyles.rootContainer}>

            <FAB
                style={homeScreenStyles.fab}
                icon="plus"
                onPress={() => loadTestFromFile()}
            />

            <Text style={homeScreenStyles.title}>Позже, {"\n"}
             тут будут предыдущие тесты
            </Text>

        </View>
    );
};

export default HomeScreen;