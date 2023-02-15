import express from "express";
import next from "next";
import cors from "cors";
import axios from "axios";
import OpenAI from "openai-api";

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const port = prod ? process.env.PORT : 3000;
const app = next({ dev });

const handle = app.getRequestHandler();
const server = express();
server.use(cors());
app.prepare().then(() => {
  server.get("/getRequest", async (req, res) => {
    console.log(server);
    const apiUrl =
      "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade";
    const urlKey = process.env.NEXT_PUBLIC_URLKEY;

    const url = `${apiUrl}?serviceKey=${urlKey}&LAWD_CD=11110&DEAL_YMD=202302`;
    const result = await axios.get(url);
    const data = JSON.stringify(result.data.response.body.items);
    return res.status(200).json(data);

    // return res.status(200).json({ data: "hello" });
  });

  server.get("/getChatApi", async (req, res) => {
    const apiKey = "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";
    const openai = new OpenAI(apiKey);

    const response = await openai.complete({
      engine: "davinci",
      prompt: "this is a test",
      maxTokens: 5,
      temperature: 0.9,
      topP: 1,
      presencePenalty: 0,
      frequencyPenalty: 0,
      bestOf: 1,
      n: 1,
      stream: false,
      stop: ["\n", "testing"],
    });
    console.log(response.data);
    const data = JSON.stringify(response.data);
    return res.status(200).json(data);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    console.log("ready on " + port);
  });
});
