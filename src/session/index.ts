import readline from "readline";

type AsyncQuestion = (question: string) => Promise<string>;

const createSession = async (
  session: (question: AsyncQuestion) => Promise<void>,
  options?: {
    // todo: add more string parsing options if needed
    trim?: boolean;
  }
) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const asyncQuestion: AsyncQuestion = (question) =>
    new Promise<string>((res, rej) => {
      try {
        rl.question(question, (input) => {
          let result = input;

          if (options?.trim) {
            result = result.trim();
          }

          res(result);
        });
      } catch (err) {
        rej(err);
      }
    });

  await session(asyncQuestion);

  rl.close();
};

export default createSession;
