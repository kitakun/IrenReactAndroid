import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs';
import { It2Picker } from '../modules/It2PickerModule';
import { DOMParser } from 'xmldom';
import { IQuestion } from 'src/types';

window.DOMParser = DOMParser;

interface questionsResponse {
    fileName: string;
    questions: Array<IQuestion>;
}

/**
 * Show pickup dialog and unzip data from it
 */
const getQuestionsFromTest = async function (): Promise<questionsResponse> {
    try {
        const response = await It2Picker.pickFile()
        const splittedName = response.split('/');

        const unzipPath = await unzipTestArchive(response, 'test.it2');

        const rawXmlData = await RNFS.readFile(unzipPath);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawXmlData);

        const allQuestionsNodes = xmlDoc.getElementsByTagName('question');
        const arrayQuestionNodes = Array.from(allQuestionsNodes);
        return {
            fileName: splittedName[splittedName.length - 1],
            questions: arrayQuestionNodes.map(node => {
                const choicesHolder = Array.from(node.getElementsByTagName('choice'));
                return {
                    questionTest: node.getElementsByTagName('text')[0].attributes[0].nodeValue,
                    choices: choicesHolder.map(choiceNode => {
                        return {
                            correct: choiceNode.getAttribute('correct') === 'true',
                            text: choiceNode.getElementsByTagName('text')[0].attributes[0].nodeValue
                        }
                    })
                } as IQuestion;
            })
        }
    } catch (exception) {
        console.error(exception);
        return Promise.reject(undefined);
    }
}

/**
 * Unzip selected file to app-external-source and return path to it
 * @param sourcePath selected file path
 * @param sourceName selected file name with format
 */
const unzipTestArchive = async function (sourcePath: string, sourceName: string) {

    const charset = 'UTF-8';

    const pathToUnzip = `${RNFS.ExternalDirectoryPath}/${sourceName.replace('.it2', '')}`;

    console.log(`pathToUnzip=${pathToUnzip}`);

    await RNFS.mkdir(pathToUnzip);

    await RNFS.unlink(pathToUnzip);

    const unzipPath = await unzip(sourcePath, pathToUnzip, charset);

    return `${unzipPath}/test.xml`;
}

export { getQuestionsFromTest };