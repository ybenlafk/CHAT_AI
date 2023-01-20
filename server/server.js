import express from 'express'
import * as dotenv from 'dotenv'
import cros from 'cors'
import {Configuration, OpenAIApi} from 'openai'

dotenv.config();

const config = new Configuration({
  apiKey:process.env.OPENAI_API_KEY,
});

const openai = new  OpenAIApi(config);

const app = express();
app.use(cros());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Hello from CHAT AI',
  })
})

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot : response.data.choices[0].text
    });
  } catch (error) {
    console.log(error);
    res.status(200).send({error});
  }
})

app.listen(5000, () => console.log(`port http://localhost:5000`))