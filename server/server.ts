import express, { Request, Response } from "express";
import { createServer } from "http";
import next from "next";
import cors from "cors";
import axios from "axios";

const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const port = prod ? process.env.PORT : 3000;
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get("/getRequest", async (req, res) => {
    console.log("hello");
    const apiUrl =
      "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade";
    const urlKey =
      "W87DOAeFblCeoq76UkfcBttIcSgClKzxgmr7P9SxT4dV0s0ugyH1yPAa16ZvPLPNJ5Hpn/Fi7vEVeNZb8DvQQQ==";
    const url = `${apiUrl}?serviceKey=${urlKey}&LAWD_CD=11110&DEAL_YMD=202212`;
    const result = await axios.get(url);
    const data = JSON.stringify(result.data.response.body.items);
    return res.status(200).json(data);
  });

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err?: any) => {
    console.log("ready on " + port);
  });
});
