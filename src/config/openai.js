import OpenAI from "openai";

const key = "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";
const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

export const generateText = ({ text, origin, target, callback }) => {
  openai.completions
    .create({
      model: "text-curie-001",
      prompt: `just translate this text : "${text}" from ${origin} to ${target} and don't answer me , just translate it`,
      max_tokens: 100,
    })
    .then((completion) => {
      callback(completion.choices[0].text);
    });
};
