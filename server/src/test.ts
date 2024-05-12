const data = require("./product2.json");
var jp = require("jsonpath");

const removeHtmlTags = (s: string) => (s || "").replace(/(<([^>]+)>)/gi, "");




const info = jp.query(data, "$..data.variant")[0];

// console.log(JSON.stringify(product, null, 2));

const Nut=jp.query(data,'$..nutritionals[0].value[0]')
const product={
    category: jp.value(data, "$..primaryCategory.path").split('/').pop(),
    Manufacturer:jp.query(data,"$..product.brand.name")[0],
    name:jp.query(data,"$..skus[0].name")[0],
    images:jp.query(data,"$..variant.images[0]")[0][2]['url'].replace('//','www.'),
    price:jp.query(data,"$..actualPrice")[0],
    description: removeHtmlTags(jp.value(data, "$..variant.description")),
    ingredients: removeHtmlTags(jp.value(data, "$..otherIngredients.text") || ""),
    Nutritional:Nut.length?{
            "PerServing": {
              "Energy": Nut[0].sections[0].fact.keys[0].value,
              "Fat": Nut[0].sections[0].fact.keys[1].value,
              "ofWhichSaturates": Nut[0].sections[0].fact.keys[2].value,
              "Carbohydrates": Nut[0].sections[0].fact.keys[3].value,
              "ofWhichSugars": Nut[0].sections[0].fact.keys[4].value,
              "Protein": Nut[0].sections[0].fact.keys[5].value,
              "Salt": Nut[0].sections[0].fact.keys[6].value
            },
            "Per100g": {
              "Energy": Nut[0].sections[1].fact.keys[0].value,
              "Fat": Nut[0].sections[1].fact.keys[1].value,
              "ofWhichSaturates": Nut[0].sections[1].fact.keys[2].value,
              "Carbohydrates": Nut[0].sections[1].fact.keys[3].value,
              "ofWhichSugars": Nut[0].sections[1].fact.keys[4].value,
              "Protein": Nut[0].sections[1].fact.keys[5].value,
              "Salt": Nut[0].sections[1].fact.keys[6].value
            }
        }:[]
}

console.log(product);
