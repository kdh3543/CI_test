"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const next_1 = __importDefault(require("next"));
const cors_1 = __importDefault(require("cors"));
const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const port = prod ? process.env.PORT : 3000;
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
app.prepare().then(() => {
    server.get("/getRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log("hello");
        // const apiUrl =
        //   "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade";
        // const urlKey =
        //   "W87DOAeFblCeoq76UkfcBttIcSgClKzxgmr7P9SxT4dV0s0ugyH1yPAa16ZvPLPNJ5Hpn/Fi7vEVeNZb8DvQQQ==";
        // const url = `${apiUrl}?serviceKey=${urlKey}&LAWD_CD=11110&DEAL_YMD=202212`;
        // const result = await axios.get(url);
        // const data = JSON.stringify(result.data.response.body.items);
        // return res.status(200).json(data);
        return res.status(200).json({ data: "hello" });
    }));
    server.all("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        console.log("ready on " + port);
    });
});
