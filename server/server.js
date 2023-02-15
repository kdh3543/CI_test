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
const axios_1 = __importDefault(require("axios"));
const openai_api_1 = __importDefault(require("openai-api"));
const dev = process.env.NODE_ENV !== "production";
const prod = process.env.NODE_ENV === "production";
const port = prod ? process.env.PORT : 3000;
const app = (0, next_1.default)({ dev });
const handle = app.getRequestHandler();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
app.prepare().then(() => {
    server.get("/getRequest", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(server);
        const apiUrl = "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade";
        const urlKey = process.env.NEXT_PUBLIC_URLKEY;
        const url = `${apiUrl}?serviceKey=${urlKey}&LAWD_CD=11110&DEAL_YMD=202302`;
        const result = yield axios_1.default.get(url);
        const data = JSON.stringify(result.data.response.body.items);
        return res.status(200).json(data);
        // return res.status(200).json({ data: "hello" });
    }));
    server.get("/getChatApi", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const apiKey = "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";
        const openai = new openai_api_1.default(apiKey);
        const response = yield openai.complete({
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
    }));
    server.all("*", (req, res) => {
        return handle(req, res);
    });
    server.listen(port, (err) => {
        console.log("ready on " + port);
    });
});
