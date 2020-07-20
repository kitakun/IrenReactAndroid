import React from 'react';
import { StyleSheet, View, Text, PermissionsAndroid } from 'react-native';
// thirdparty
import { FAB, Button } from 'react-native-paper';
// local
import { getQuestionsFromTest, QuestionsResponse } from '../logic';
// Store
import { store } from '../App';
import { useSelector } from 'react-redux';
import { AppState } from '../state/types';
import { PreviousTestStatus } from '../state/previous-test/types';
import { fetchPreviousTest, storePreviousTest } from '../state/previous-test/actions';

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
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: "space-between"
    },
    prevTestFont: {
        fontSize: 20
    },
    previousTestContainer: {
        backgroundColor: 'white',
        padding: 20,
        marginTop: 10
    }
});

const HomeScreen = ({ navigation }: { navigation: any }) => {

    const canFetchPrevTest = useSelector<AppState>(sel => sel.previousTest.status === PreviousTestStatus.NotInited) as boolean;
    if (canFetchPrevTest) {
        store.dispatch(fetchPreviousTest());
    }
    const previousTestData = useSelector<AppState>(sel => sel.previousTest.data) as QuestionsResponse;
    const hasPreviousTest = !!previousTestData;

    const loadTestFromFile = async function () {

        const permissionsForReadWrite = await PermissionsAndroid.requestMultiple([
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE"
        ]);

        if (permissionsForReadWrite["android.permission.READ_EXTERNAL_STORAGE"] == PermissionsAndroid.RESULTS.GRANTED
            && permissionsForReadWrite["android.permission.WRITE_EXTERNAL_STORAGE"] == PermissionsAndroid.RESULTS.GRANTED) {
            const testData = await getQuestionsFromTest();
            if (testData) {

                await store.dispatch(storePreviousTest(testData.unpackFileName));
                if (testData) {
                    navigation.navigate('DoTest', {
                        filename: testData.fileName,
                        data: testData.questions
                    });
                }
            } else {
                // TODO dialog - failed to get test
            }
        } else {
            // TODO dialog - no permissions
        }
    }

    const loadPreviousTest = async function () {
        navigation.navigate('DoTest', {
            filename: previousTestData.fileName,
            data: previousTestData.questions
        });
    }

    let previousTestControl = null;
    if (hasPreviousTest) {
        previousTestControl =
            <View style={homeScreenStyles.previousTestContainer}>
                <View style={homeScreenStyles.inline}>
                    <Text style={homeScreenStyles.prevTestFont}>{previousTestData.fileName} ({previousTestData.questions.length} вопросов)</Text>
                    <Button
                        mode="outlined"
                        icon="arrow-right-bold-circle"
                        onPress={loadPreviousTest}><Text></Text></Button>
                </View>
            </View>;
    } else {
        previousTestControl =
            <View style={homeScreenStyles.previousTestContainer}>
                <Text>Пусто</Text>
            </View>;
    }

    return (
        <View style={homeScreenStyles.rootContainer}>
            <FAB
                style={homeScreenStyles.fab}
                icon="plus"
                onPress={loadTestFromFile}
            />

            <View>
                <Text style={homeScreenStyles.title}>Предыдущий тест:</Text>
                {previousTestControl}
            </View>
        </View>
    );
};

export default HomeScreen;