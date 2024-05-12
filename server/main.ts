import getCategories from "./get-categories";

const data = require("./product.json");

var jp = require("jsonpath");

// const p = jp.query(data, '$..data.products[?(@.id=="048765")]');

// const removeHtmlTags = (s: string) => (s || "").replace(/(<([^>]+)>)/gi, "");
// const product = {
//   name: jp.value(p, "$..title"),
//   manufacturer: jp.value(p, "$..brand.name") || jp.value(p, "$..brandName"),
//   category: jp.value(p, "$..primaryCategory.path"),
//   price: jp.value(p, "$..actualPrice"),
//   ingredients: removeHtmlTags(jp.value(data, "$..otherIngredients.text") || ""),
//   description: removeHtmlTags(
//     jp.query(data, "$..data.variant.description")[0] || ""
//   ),
//   images: jp.value(p, "$..images[0].*.url") || [],
// };

// console.log(JSON.stringify(p, null, 2));
// console.log("---");

const info = jp.query(data, "$..data.variant")[0];

// console.log(JSON.stringify(product, null, 2));

console.log(info);
