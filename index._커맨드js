import { Configuration, OpenAIApi } from "openai";
import readline from "readline";

const configuration = new Configuration({
  organization: "org-qDHKBQQkfeOwrWiL0lEkbcGq",
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const userInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userInterface.prompt();

userInterface.on("line", async (input) => {
  await openai
    .createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: input }],
    })
    .then((res) => {
      console.log(res.data.choices[0].message.content);
      userInterface.prompt();
    })
    .catch((e) => {
      console.log(e);
    });
});
