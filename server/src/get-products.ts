import axios from "axios";
const randomUseragent = require("random-useragent");
var jp = require("jsonpath");

interface Product {
  id: string,
  link: string,
  name: string,
  images: string,
  price:string ,
  category:string,
}

const headers = {
  Accept: "application/json",
  "User-Agent": randomUseragent.getRandom(),
};

export default async function getProducts(baseUrl: string): Promise<Product[]> {
  return await getProductPage(baseUrl, 1);
}

async function getProductPage(
  baseUrl: string,
  page: number
): Promise<Product[]> {

  let response = await axios.get(baseUrl + `?page=${page}`, { headers });

  const responseData = response.data;

  if (!responseData) return [];

  const totalPages = jp.query(responseData, "$..pagination.totalPages")[0];

  let productFromPage = jp
    .query(responseData, "$..data.tiles[*]")
    .map((elem: any) => ({ 
      id: elem.id,
      link: elem.url,
      name: elem.name,
      images: elem.images,
      price:elem.actualPrice ,
      category:elem.primaryCategory.path?.split('/').pop(),
    }));
  
  if (page >= totalPages) return productFromPage;

  return [...productFromPage, ...(await getProductPage(baseUrl, page + 1))];
}
