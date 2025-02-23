import { NextResponse } from 'next/server';

interface ExecuteRequest {
  code: string;
  language?: string;
}

export async function POST(request: Request) {
  try {
    const { code, language = 'javascript' } = await request.json() as ExecuteRequest;

    if (!code) {
      return NextResponse.json(
        { error: 'No code provided' },
        { status: 400 }
      );
    }

    // For Python code, we'll use a mock Python interpreter
    if (language === 'python') {
      const output = executePythonCode(code);
      return NextResponse.json({ output });
    }

    // For JavaScript code, use the Function constructor
    const output = await executeJavaScriptCode(code);
    return NextResponse.json({ output });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to execute code' },
      { status: 500 }
    );
  }
}

function executePythonCode(code: string): string {
  let output = '';
  const context: Record<string, any> = {};

  // Add print function to context
  context.print = (...args: any[]) => {
    output += args.join(' ') + '\n';
  };

  try {
    // Split code into lines
    const lines = code.split('\n');
    let currentFunction = '';
    let functionBody = '';
    let inFunction = false;
    let blockLevel = 0;

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trimEnd();
      if (!line.trim()) continue;

      if (line.startsWith('def ')) {
        // Start of function definition
        inFunction = true;
        blockLevel = 1;
        const funcMatch = line.match(/def\s+(\w+)\s*\((.*?)\):/);
        if (!funcMatch) throw new Error('Invalid function definition');
        
        currentFunction = funcMatch[1];
        const params = funcMatch[2] ? funcMatch[2].split(',').map(p => p.trim()) : [];
        functionBody = `var ${currentFunction} = function(${params.join(', ')}) {`;
        continue;
      }

      if (inFunction) {
        const indent = line.match(/^\s*/)[0].length;
        const codeLine = line.trim();
        
        if (indent === 0 && codeLine && !codeLine.startsWith('#')) {
          // End of function
          inFunction = false;
          while (blockLevel > 0) {
            functionBody += '\n}';
            blockLevel--;
          }
          
          try {
            eval(functionBody);
            context[currentFunction] = eval(currentFunction);
          } catch (e) {
            throw new Error(`Error in function ${currentFunction}: ${e.message}`);
          }
          i--; // Process this line again
          continue;
        }

        if (!codeLine || codeLine.startsWith('#')) continue;

        if (codeLine.startsWith('return ')) {
          functionBody += `\n${' '.repeat(blockLevel * 2)}return ${codeLine.slice(7)};`;
        } else if (codeLine.startsWith('if ')) {
          const condition = codeLine.match(/if\s+(.+?):/)?.[1];
          if (condition) {
            functionBody += `\n${' '.repeat(blockLevel * 2)}if (${condition}) {`;
            blockLevel++;
          }
        } else if (codeLine === 'else:') {
          blockLevel--;
          functionBody += `\n${' '.repeat(blockLevel * 2)}} else {`;
          blockLevel++;
        } else if (codeLine.startsWith('elif ')) {
          const condition = codeLine.match(/elif\s+(.+?):/)?.[1];
          if (condition) {
            blockLevel--;
            functionBody += `\n${' '.repeat(blockLevel * 2)}} else if (${condition}) {`;
            blockLevel++;
          }
        } else {
          functionBody += `\n${' '.repeat(blockLevel * 2)}${codeLine}`;
        }
      } else {
        const codeLine = line.trim();
        if (!codeLine || codeLine.startsWith('#')) continue;

        if (codeLine.startsWith('print(')) {
          const match = codeLine.match(/print\((.*)\)/);
          if (!match) throw new Error('Invalid print statement');
          
          const args = match[1].split(',').map(arg => {
            const trimmed = arg.trim();
            return trimmed in context ? context[trimmed] : eval(trimmed);
          });
          context.print(...args);
        } else if (codeLine.includes('(')) {
          const funcMatch = codeLine.match(/(\w+)\((.*)\)/);
          if (funcMatch) {
            const [_, funcName, argsStr] = funcMatch;
            if (!(funcName in context)) {
              throw new Error(`Name '${funcName}' is not defined`);
            }
            const args = argsStr.split(',').map(arg => {
              const trimmed = arg.trim();
              return trimmed in context ? context[trimmed] : eval(trimmed);
            });
            const result = context[funcName].call(null, ...args);
            if (result !== undefined) {
              context.print(result);
            }
          }
        }
      }
    }

    // Close any remaining function
    if (inFunction) {
      while (blockLevel > 0) {
        functionBody += '\n}';
        blockLevel--;
      }
      try {
        eval(functionBody);
        context[currentFunction] = eval(currentFunction);
      } catch (e) {
        throw new Error(`Error in function ${currentFunction}: ${e.message}`);
      }
    }

    return output || 'No output';
  } catch (error) {
    return `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
  }
}

function executeJavaScriptCode(code: string): string {
  return new Promise((resolve) => {
    try {
      // Create a function from the code string
      const fn = new Function('console', `
        let output = '';
        const customConsole = {
          log: (...args) => {
            output += args.join(' ') + '\\n';
          },
          error: (...args) => {
            output += 'Error: ' + args.join(' ') + '\\n';
          }
        };
        try {
          ${code}
        } catch (error) {
          customConsole.error(error.message);
        }
        return output;
      `);

      // Execute the function with our custom console
      const output = fn({});
      resolve(output || 'No output');
    } catch (error) {
      resolve(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  });
}
