import axios from "axios";
const randomUseragent = require("random-useragent");
var jp = require("jsonpath");

const headers = {
  Accept: "application/json",
  "User-Agent": randomUseragent.getRandom(),
};

export default async function getProduct(url: string): Promise<object> {
  let response = await axios.get(url, { headers });
  console.log("got response headers", response.headers);

  const responseData = response.data;
  if (!responseData) return [];
  console.log(responseData);

  const product = jp.query(responseData, "$..")[0];
  return {};
}
