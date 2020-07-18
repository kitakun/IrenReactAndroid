import React, { useState } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
// thirdparty
import { RadioButton, Button } from 'react-native-paper';
// Types
import { IQuestion } from 'src/types';

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
    const [currentState, setState] = useState<{ selectedText: string }>({ selectedText: '' });

    const nextQuestion = () => {
        console.log('todo');
    };

    return <View style={styles.testContainer}>
        <View style={styles.question}>
            <Text>{route.params.data[0].questionTest}</Text>
        </View>
        <ScrollView>

            <RadioButton.Group onValueChange={value => setState({ selectedText: value })} value={currentState.selectedText}>
                {
                    route.params.data[0].choices.map(
                        choice =>
                            <View style={styles.choice}>
                                <RadioButton.Item
                                    label={choice.text}
                                    value={choice.text} />
                            </View>
                    )
                }
            </RadioButton.Group>
        </ScrollView>
        <View>
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