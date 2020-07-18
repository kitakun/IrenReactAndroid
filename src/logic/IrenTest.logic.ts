import { unzip } from 'react-native-zip-archive';
import * as RNFS from 'react-native-fs';
import { It2Picker } from '../modules/It2PickerModule';
import { DOMParser } from 'xmldom';

window.DOMParser = DOMParser;

/**
 * Show pickup dialog and unzip data from it
 */
const getQuestionsFromTest = async function () {
    try {
        const response = await It2Picker.pickFile()
        console.log(`Recieved path: ${response}`);

        const unzipPath = await unzipTestArchive(response, 'test.it2');

        const rawXmlData = await RNFS.readFile(unzipPath);

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(rawXmlData);

        const allQuestionsNodes = xmlDoc.getElementsByTagName('question');
        console.log('get questions count = ' + allQuestionsNodes.length)
    } catch (exception) {
        console.error(exception);
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