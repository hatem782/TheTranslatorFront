// import OpenAI from "openai";

// const key = "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";
// const openai = new OpenAI({ apiKey: key, dangerouslyAllowBrowser: true });

// export const generateText = ({ text, origin, target, callback }) => {
//   openai.completions
//     .create({
//       model: "text-curie-001",
//       prompt: `just translate this text : "${text}" from ${origin} to ${target} and don't answer me , just translate it`,
//       max_tokens: 100,
//     })
//     .then((completion) => {
//       callback(completion.choices[0].text);
//     });
// };

import axios from "axios";

export const generateText = ({ text, origin, target, callback }) => {
  let message = `just translate this text : "${text}" from "${origin}" to "${target}" and don't answer me , just translate it`;
  const options = {
    method: "POST",
    url: "https://api.edenai.run/v2/text/question_answer",
    headers: {
      authorization: `Bearer ${process.env.REACT_APP_KEY}`,
    },
    data: {
      texts: [message],
      temperature: 0.8,
      examples: [[message, message]],
      providers: "openai",
      question: message,
      examples_context: message,
    },
  };

  axios
    .request(options)
    .then((response) => {
      callback(
        response?.data?.openai?.answers.join(" ") ||
          "i can't answer this question"
      );
    })
    .catch((error) => {
      console.error(error);
    });
};
