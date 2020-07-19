import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
// Types
import { IncorrectAnswer } from 'src/types';
// States
import { useSelector } from 'react-redux';
import { store } from '../App';
import { AppState } from '../state/types';
import { clearTestData } from '../state/test/actions';

interface INavigation {
    addListener(type: string, callback: Function): void;
    removeListener(type: string, callback: Function): void;
}

const styles = StyleSheet.create({
    testContainer: {
        margin: 10,
        flex: 1,
    },
    question: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 40,
    },
    bold: {
        fontWeight: "bold",
    },
    inline: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    choice: {
        padding: 10,
        marginTop: 5,
        marginBottom: 20,
        margin: 10,
        fontSize: 18,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    bottomStyles: {
        fontSize: 20
    }
});

let subbedOnClosed = false;

const TestResultScreen = ({ navigation }: { navigation: INavigation }) => {
    if (!subbedOnClosed) {
        const subFunction = function () {
            navigation.removeListener('beforeRemove', subFunction);
            store.dispatch(clearTestData());
            subbedOnClosed = false;
        };
        navigation.addListener('beforeRemove', subFunction);
        subbedOnClosed = true;
    }

    const incorrectAnswers = useSelector<AppState>(sel => sel.test.incorrectAnswers) as Array<IncorrectAnswer>;
    const totalCount = useSelector<AppState>(sel => sel.test.passedTestIndexes.length) as number;

    return <View style={styles.testContainer}>
        <View style={styles.question}>
            <View style={styles.inline}>
                <Text>Пройдено вопросов:</Text>
                <Text style={styles.bold}>{totalCount}</Text>
            </View>
            <View style={styles.inline}>
                <Text>Неправильных ответов:</Text>
                <Text style={styles.bold}>{incorrectAnswers.length}</Text>
            </View>
        </View>

        <ScrollView>
            {
                incorrectAnswers.map(incorrect =>
                    <View
                        style={styles.choice}
                        key={incorrect.question}>
                        <View>
                            <View style={styles.inline}>
                                <Text style={styles.bold}>Вопрос: </Text>
                                <Text>{incorrect.question}</Text>
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.bold}>Правильный ответ:  </Text>
                                <Text>{incorrect.correctAnswer}</Text>
                            </View>
                            <View style={styles.inline}>
                                <Text style={styles.bold}>Ваш ответ: </Text>
                                <Text>{incorrect.incorrectAsnwer}</Text>
                            </View>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    </View>
};

export default TestResultScreen;