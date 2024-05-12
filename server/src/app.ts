import express, { Request, Response } from "express";
import getCategories from "./get-categories";
import getProducts from "./get-products";

const app = express();

const baseUrl: string = "https://www.hollandandbarrett.com";

app.get("/categories", async (req: Request, res: Response) => {
  try {
    const categories = await getCategories(baseUrl);
    res.json(categories);
  } catch (err: any) {
    console.log("err");
    res.status(500).json({ error: err?.message });
  }
});

app.get("/products", async (req: Request, res: Response) => {
  try {
    const categoryUrl: any = req.query.url;
    const productLinks = await getProducts(categoryUrl);
    res.json(productLinks);
  } catch (err: any) {
    console.error("err");
    res.status(500).json({ error: err?.message });
  }
});

app.listen(4000, () => {
  console.log(`Server is running `);
});
