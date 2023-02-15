import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "@/styles/Home.module.css";
import axios from "axios";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const urlKey =
    "W87DOAeFblCeoq76UkfcBttIcSgClKzxgmr7P9SxT4dV0s0ugyH1yPAa16ZvPLPNJ5Hpn/Fi7vEVeNZb8DvQQQ==";
  const apiUrl =
    "http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcNrgTrade";
  const url = `${apiUrl}?serviceKey=${urlKey}&LAWD_CD=11110&DEAL_YMD=202212`;
  // https://cors-anywhere.herokuapp.com/
  const openaiTest = async () => {
    const apiKey = "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";
    const result = await axios({
      method: "get",
      url: "https://api.openai.com/v1/completions",
      data: {
        model: "text-davinci-003",
        prompt: "hello",
        temperature: 0,
        max_tokens: 1,
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    });
    console.log(result);
  };

  const frontHandle = async () => {
    const result = await axios({
      url,
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("??됐다고?");
    console.log(result);
  };
  const expressHandle = async () => {
    try {
      const { data } = await axios.get(`/getRequest`);
      console.log(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  };

  const expressTest = async () => {
    try {
      const { data } = await axios.get("/getTest");
      console.log(JSON.parse(data));
    } catch (e) {
      console.log(e);
    }
  };
  // const callChatApi = async () => {
  //   try {
  //     const { data } = await axios.get(
  //       `${process.env.NEXT_PUBLIC_URL}/getChatApi`
  //     );
  //     console.log("???");
  //     console.log(JSON.parse(data));
  //   } catch (err) {}
  // };

  useEffect(() => {
    console.log("helllllloooo222dsfsdfsdfsdfsdf22");
    // openaiTest();
    expressTest();
    // expressHandle();
  }, []);
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <button onClick={expressHandle}>expressHandle</button>
        <br />
        <button onClick={frontHandle}>frontHandle</button>
      </main>
    </>
  );
}
