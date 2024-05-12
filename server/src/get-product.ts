import axios from "axios";
const randomUseragent = require("random-useragent");
var jp = require("jsonpath");

const headers = {
  Accept: "application/json",
  "User-Agent": randomUseragent.getRandom(),
};
const removeHtmlTags = (s: string) => (s || "").replace(/(<([^>]+)>)/gi, "");

export default async function getProduct(url: string): Promise<object> {
  let response = await axios.get(url, { headers });

  const responseData = response.data;
  if (!responseData) return [];
  const Nut=jp.query(responseData,'$..nutritionals[0].value[0]')
  console.log(response.data)
  return {
      category: jp.value(responseData, "$..primaryCategory.path").split('/').pop(),
      Manufacturer:jp.query(responseData,"$..product.brand.name")[0],
      name:jp.query(responseData,"$..skus[0].name")[0],
      images:jp.query(responseData,"$..variant.images[0]")[0][2]['url'].replace('//','www.'),
      price:jp.query(responseData,"$..actualPrice")[0],
      description: removeHtmlTags(jp.value(responseData, "$..variant.description")),
      ingredients: removeHtmlTags(jp.value(responseData, "$..otherIngredients.text")),
      // Nutritional: Nut.length?{
      //         "PerServing": {
      //           "Energy": Nut[0].sections[0]?.fact.keys[0].value,
      //           "Fat": Nut[0].sections[0]?.fact.keys[1].value,
      //           "ofWhichSaturates": Nut[0].sections[0]?.fact.keys[2].value,
      //           "Carbohydrates": Nut[0].sections[0]?.fact.keys[3].value,
      //           "ofWhichSugars": Nut[0].sections[0]?.fact.keys[4].value,
      //           "Protein": Nut[0].sections[0]?.fact.keys[5].value,
      //           "Salt": Nut[0].sections[0]?.fact.keys[6].value
      //         },
      //         "Per100g": {
      //           "Energy": Nut[0].sections[1]?.fact.keys[0].value,
      //           "Fat": Nut[0].sections[1]?.fact.keys[1].value,
      //           "ofWhichSaturates": Nut[0].sections[1]?.fact.keys[2].value,
      //           "Carbohydrates": Nut[0].sections[1]?.fact.keys[3].value,
      //           "ofWhichSugars": Nut[0].sections[1]?.fact.keys[4].value,
      //           "Protein": Nut[0].sections[1]?.fact.keys[5].value,
      //           "Salt": Nut[0].sections[1]?.fact.keys[6].value
      //         }
      //     }:[]
    }
}
