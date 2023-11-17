import express from 'express';
import cors from 'cors';
import { Configuration, OpenAIApi } from 'openai';
import dotenv from 'dotenv';

//TODO role: "assistant"역할 부여도 파라미터에 넣어야함
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors()); // CORS 미들웨어 추가

// const configuration = new Configuration({
//   organization: "org-qDHKBQQkfeOwrWiL0lEkbcGq",
//   apiKey: "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",
// });

const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
console.log('1');

app.post('/chat', async (req, res) => {
  try {
    console.log(req.body.message);
    console.log('시작전');
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: req.body.message }],
      // messages: [{ role: "user", content: "안녕" }],
    });
    console.log('시작후');
    res.json(response.data.choices[0].message.content);
  } catch (error) {
    console.log('3');
    res.status(500).send(error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});