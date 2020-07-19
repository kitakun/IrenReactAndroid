import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
// thirdparty
import { RadioButton, Button } from 'react-native-paper';
// Types
import { IQuestion } from 'src/types';
// States
import { useSelector } from 'react-redux';
import { AppState } from '../state/types';
import { store } from '../App';
import * as TestActions from '../state/test/actions';

interface Props {
    navigation: StackNavigationProp<{}>;
    route: {
        key: string,
        name: string,
        params: {
            data: Array<IQuestion>
        }
    }
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

const DoTestScreen = ({ route, navigation }: Props) => {
    // local state
    const [currentState, setState] = useState<{ selectedText: string }>({ selectedText: '' });
    if ((useSelector<AppState>(sel => sel.test.questions) as Array<IQuestion>).length != route.params.data.length) {
        // load data to global state
        store.dispatch(TestActions.loadTestData(route.params.data));
    }
    // gstate vars
    const questionsList = useSelector<AppState>(sel => sel.test.questions) as Array<IQuestion>;
    const currentQuestion = useSelector<AppState>(sel => sel.test.currenctTestIndex) as number;

    const nextQuestion = () => {
        const selectedAnswer = questionsList[currentQuestion].choices.find(f => f.text === currentState.selectedText);
        let correctAnswer = null;
        if (selectedAnswer?.correct) {
            correctAnswer = selectedAnswer;
        } else {
            correctAnswer = questionsList[currentQuestion].choices.find(f => f.correct);
        }

        store.dispatch(TestActions.selectAnswer({
            correctText: correctAnswer?.text || '',
            selectedText: selectedAnswer?.text || ''
        }));

        setState({ selectedText: '' });

        store.dispatch(TestActions.nextQuestion());
    };

    const finishTest = () => {
        navigation.goBack();
        (navigation as any).navigate('TestResults', {});
    };

    return <View style={styles.testContainer}>
        <View style={styles.question}>
            <Text>{questionsList.length > 0 ? questionsList[currentQuestion].questionTest : '-вопроса нет-'}</Text>
        </View>
        <ScrollView>

            <RadioButton.Group
                onValueChange={value => setState({ selectedText: value })}
                value={currentState.selectedText}>
                {
                    questionsList.length > 0
                        ? questionsList[currentQuestion].choices.map(
                            choice =>
                                <View
                                    style={styles.choice}
                                    key={choice.text}>
                                    <RadioButton.Item
                                        label={choice.text}
                                        value={choice.text} />
                                </View>
                        )
                        : <></>
                }
            </RadioButton.Group>
        </ScrollView>
        <View>
            <Button
                mode={"outlined"}
                onPress={() => finishTest()}>
                <Text style={styles.bottomStyles}>Закончить тест</Text>
            </Button>
            <Button
                mode={"outlined"}
                disabled={currentState.selectedText.length === 0}
                onPress={() => nextQuestion()}>
                <Text style={styles.bottomStyles}>Следующий вопрос</Text>
            </Button>
        </View>
    </View>
};

export default DoTestScreen;