import axios from "axios";
const randomUseragent = require("random-useragent");
var jp = require("jsonpath");

interface Product {
  link: string;
  id: string;
}
const headers = {
  Accept: "application/json",
  "User-Agent": randomUseragent.getRandom(),
};

export default async function getProducts(baseUrl: string): Promise<Product[]> {
  const page = 1;
  return await getProductPage(baseUrl, page);
}

async function getProductPage(
  baseUrl: string,
  page: number
): Promise<Product[]> {
  console.log("making request");

  let response = await axios.get(baseUrl + `?page=${page}`, { headers });
  console.log("got response headers", response.headers);

  const responseData = response.data;
  if (!responseData) return [];
  console.log("sent request");

  const totalPages = jp.query(responseData, "$..pagination.totalPages")[0];

  let productFromPage = jp
    .query(responseData, "$..data.tiles[*]")
    .map((elem: any) => ({ link: elem.url, id: elem.id }));

  if (page >= totalPages) {
    return productFromPage;
  }

  console.log("request page", page);
  return [...productFromPage, ...(await getProductPage(baseUrl, page + 1))];
}
