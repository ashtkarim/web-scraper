import axios, { AxiosResponse } from "axios";
const randomUseragent = require("random-useragent");

interface Category {
  link: string;
  name: string;
}

export default async function getCategories(
  baseUrl: string
): Promise<Category[]> {
  let categories: Category[] = [];
  const regex =
    /\{(?:\s*"id"\s*:\s*"[^"]+",\s*"link"\s*:\s*"[^"]+",\s*"name"\s*:\s*"[^"]+"\s*)\}/g;
  const response: AxiosResponse = await axios.get(baseUrl, {
    headers: {
      Accept: "application/json",
      "User-Agent": randomUseragent.getRandom(),
    },
  });

  const catRes = await response.data;

  if (catRes) {
    const elements: string = JSON.stringify(catRes);
    const matches = elements.match(regex);
    if (matches) {
      categories = matches
        .map((match) => JSON.parse(match))
        .filter(
          (obj) =>
            typeof obj === "object" && obj.link && !obj.link.includes("offers")
        )
        .map((obj) => ({
          link: baseUrl + obj.link,
          name: obj.name,
        }));
    }
  }
  return categories;
}
