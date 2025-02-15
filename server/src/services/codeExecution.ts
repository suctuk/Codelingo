import { spawn } from 'child_process';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as crypto from 'crypto';

interface ExecutionResult {
  output: string;
  error: string | null;
  executionTime: number;
  memoryUsage: number;
}

interface TestCase {
  input: string;
  expectedOutput: string;
  description: string;
}

export class CodeExecutionService {
  private readonly tempDir: string;
  private readonly runtimes: { [key: string]: RuntimeConfig };

  constructor() {
    this.tempDir = path.join(process.cwd(), 'temp');
    this.runtimes = {
      python: {
        fileExtension: '.py',
        command: 'python',
        args: ['-u'],  // Unbuffered output
        setupCode: '',
      },
      javascript: {
        fileExtension: '.js',
        command: 'node',
        args: [],
        setupCode: '',
      },
      java: {
        fileExtension: '.java',
        command: 'java',
        args: [],
        setupCode: (className: string) => `
          public class ${className} {
            public static void main(String[] args) {
              // CODE_PLACEHOLDER
            }
          }
        `,
      },
      cpp: {
        fileExtension: '.cpp',
        command: 'g++',
        args: [],
        setupCode: `
          #include <iostream>
          using namespace std;
          
          int main() {
            // CODE_PLACEHOLDER
            return 0;
          }
        `,
      },
    };
  }

  async executeCode(
    language: string,
    code: string,
    input: string = '',
    timeoutMs: number = 5000
  ): Promise<ExecutionResult> {
    const runtime = this.runtimes[language.toLowerCase()];
    if (!runtime) {
      throw new Error(`Unsupported language: ${language}`);
    }

    const sessionId = crypto.randomBytes(16).toString('hex');
    const fileName = `${sessionId}${runtime.fileExtension}`;
    const filePath = path.join(this.tempDir, fileName);

    try {
      // Create temp directory if it doesn't exist
      await fs.mkdir(this.tempDir, { recursive: true });

      // Prepare code with proper setup
      let finalCode = code;
      if (typeof runtime.setupCode === 'function') {
        finalCode = runtime.setupCode(sessionId).replace('// CODE_PLACEHOLDER', code);
      } else if (runtime.setupCode) {
        finalCode = runtime.setupCode.replace('// CODE_PLACEHOLDER', code);
      }

      // Write code to file
      await fs.writeFile(filePath, finalCode);

      // Special handling for compiled languages
      if (language === 'cpp') {
        await this.compileCpp(filePath);
      } else if (language === 'java') {
        await this.compileJava(filePath);
      }

      // Execute code
      const startTime = process.hrtime();
      const result = await this.runProcess(runtime.command, [...runtime.args, filePath], input, timeoutMs);
      const [seconds, nanoseconds] = process.hrtime(startTime);
      const executionTime = seconds * 1000 + nanoseconds / 1e6;

      return {
        output: result.output,
        error: result.error,
        executionTime,
        memoryUsage: process.memoryUsage().heapUsed,
      };
    } finally {
      // Cleanup
      try {
        await fs.unlink(filePath);
        if (language === 'cpp') {
          await fs.unlink(filePath.replace('.cpp', '.exe'));
        } else if (language === 'java') {
          await fs.unlink(filePath.replace('.java', '.class'));
        }
      } catch (err) {
        console.error('Cleanup error:', err);
      }
    }
  }

  private async compileCpp(filePath: string): Promise<void> {
    const outputPath = filePath.replace('.cpp', '.exe');
    await new Promise<void>((resolve, reject) => {
      const process = spawn('g++', [filePath, '-o', outputPath]);
      
      let error = '';
      process.stderr.on('data', (data) => {
        error += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Compilation failed: ${error}`));
        }
      });
    });
  }

  private async compileJava(filePath: string): Promise<void> {
    await new Promise<void>((resolve, reject) => {
      const process = spawn('javac', [filePath]);
      
      let error = '';
      process.stderr.on('data', (data) => {
        error += data.toString();
      });

      process.on('close', (code) => {
        if (code === 0) {
          resolve();
        } else {
          reject(new Error(`Compilation failed: ${error}`));
        }
      });
    });
  }

  private async runProcess(
    command: string,
    args: string[],
    input: string,
    timeoutMs: number
  ): Promise<{ output: string; error: string | null }> {
    return new Promise((resolve) => {
      const process = spawn(command, args);
      let output = '';
      let error = '';
      let timeoutId: NodeJS.Timeout;

      process.stdout.on('data', (data) => {
        output += data.toString();
      });

      process.stderr.on('data', (data) => {
        error += data.toString();
      });

      if (input) {
        process.stdin.write(input);
        process.stdin.end();
      }

      timeoutId = setTimeout(() => {
        process.kill();
        resolve({
          output: '',
          error: 'Execution timed out',
        });
      }, timeoutMs);

      process.on('close', () => {
        clearTimeout(timeoutId);
        resolve({
          output: output.trim(),
          error: error.trim() || null,
        });
      });
    });
  }

  async runTests(language: string, code: string, tests: TestCase[]): Promise<boolean[]> {
    const results: boolean[] = [];

    for (const test of tests) {
      const result = await this.executeCode(language, code, test.input);
      results.push(
        result.error === null && result.output.trim() === test.expectedOutput.trim()
      );
    }

    return results;
  }

  getLanguageTemplate(language: string): string {
    const runtime = this.runtimes[language.toLowerCase()];
    if (!runtime) {
      throw new Error(`Unsupported language: ${language}`);
    }

    if (typeof runtime.setupCode === 'function') {
      return runtime.setupCode('Main');
    }
    return runtime.setupCode || '';
  }
}
