import { LanguagePairCurriculum } from '../curriculumTemplate';
import { javaScriptToPython } from './javaScriptToPython';
import { pythonToJavaScript } from './pythonToJavaScript';
import { javaToJavaScript } from './javaToJavaScript';
import { javaScriptToJava } from './javaScriptToJava';
import { pythonToJava } from './pythonToJava';
import { javaToPython } from './javaToPython';
import { typeScriptToPython } from './typeScriptToPython';
import { pythonToTypeScript } from './pythonToTypeScript';
import { javaToTypeScript } from './javaToTypeScript';
import { typeScriptToJava } from './typeScriptToJava';
import { javaScriptToTypeScript } from './javaScriptToTypeScript';
import { typeScriptToJavaScript } from './typeScriptToJavaScript';
import { rustToPython } from './rustToPython';
import { pythonToRust } from './pythonToRust';
import { javaToRust } from './javaToRust';
import { rustToJava } from './rustToJava';
import { javaScriptToRust } from './javaScriptToRust';
import { rustToJavaScript } from './rustToJavaScript';
import { typeScriptToRust } from './typeScriptToRust';
import { rustToTypeScript } from './rustToTypeScript';

// All possible language pair combinations
export const languagePairs: { [key: string]: LanguagePairCurriculum } = {
  'javascript-python': javaScriptToPython,
  'python-javascript': pythonToJavaScript,
  'java-javascript': javaToJavaScript,
  'javascript-java': javaScriptToJava,
  'python-java': pythonToJava,
  'java-python': javaToPython,
  'typescript-python': typeScriptToPython,
  'python-typescript': pythonToTypeScript,
  'java-typescript': javaToTypeScript,
  'typescript-java': typeScriptToJava,
  'javascript-typescript': javaScriptToTypeScript,
  'typescript-javascript': typeScriptToJavaScript,
  'rust-python': rustToPython,
  'python-rust': pythonToRust,
  'java-rust': javaToRust,
  'rust-java': rustToJava,
  'javascript-rust': javaScriptToRust,
  'rust-javascript': rustToJavaScript,
  'typescript-rust': typeScriptToRust,
  'rust-typescript': rustToTypeScript
};
