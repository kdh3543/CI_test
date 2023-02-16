import express from "express";
import next from "next";
import cors from "cors";
import axios from "axios";
import { Configuration, OpenAIApi } from "openai";

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const port = prod ? process.env.PORT : 3000;
const app = next({ dev });

const handle = app.getRequestHandler();
const server = express();
server.use(cors());

app.prepare().then(() => {
  server.get("/getRequest", async (req, res) => {
    const apiUrl =
      "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade";
    const urlKey = process.env.NEXT_PUBLIC_URLKEY;

    const url = `${apiUrl}?serviceKey=${urlKey}&LAWD_CD=11110&DEAL_YMD=202302`;
    const result = await axios.get(url);
    const data = JSON.stringify(result.data.response.body.items);
    return res.status(200).json(data);

    // return res.status(200).json({ data: "hello" });
  });

  server.get("/getTest", async (req, res) => {
    const test = { name: "hello" };
    return res.status(200).json(JSON.stringify(test));
  });
  server.get("/getChatApi", async (req, res) => {
    console.log("여기로 들어왔음");
    const configuration = new Configuration({
      apiKey: "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",
    });

    const openai = new OpenAIApi(configuration);
    const result = await openai
      .createCompletion({
        model: "text-davinci-002",
        prompt: "hello?",
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
      .then((res) => {
        console.log(res.data);
      });

    // return res.end(response);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    console.log("ready on " + port);
  });
});
