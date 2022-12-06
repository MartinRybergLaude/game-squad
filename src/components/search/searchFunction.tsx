export default function searchGame(param: string) {
  if (param.length > 2) {
    console.log(param);
  }
}

const client_id = "elzv2c0ss2ct4i30jd3eo5x14b80y9";
const client_secret = "nrpmj9cl21jlcbqkbuwsisyyxs0kja";

const twitchKey = fetch(
  "https://id.twitch.tv/oauth2/token?client_id=" +
    client_id +
    "&client_secret=" +
    client_secret +
    "&grant_type=client_credentials",
  {
    method: "POST",
  },
)
  .then(response => response.json())
  .then(data => {
    return data;
  });

console.log(await twitchKey);

// .then(response => JSON.parse(response));

// function getDishDetails() {
//   // endpoint = endpoint? endpoint: "" //If endpoint undefined (falsy), endpoint = empty string
//   // params = params? params: "" //If params undefined (falsy), params = empty string
//   return fetch(
//     " https://api-docs.igdb.com/#game",
//     {
//       // object literal
//       method: "GET", // HTTP method
//       headers: {
//         'Accept': 'application/json',
//         'Client-ID: Client ID',
//         'Authorization: Bearer access_token',
//       }, // end of headers object
//     } /* end of second fetch parameter, object */,
//   ).then(treatHTTPResponseACB);
// }

// function treatHTTPResponseACB(response) {
//   if (response.status == 200) {
//     return response.json();
//   } else {
//     throw "Error";
//   }
// }

// function searchDishes(params) {
//   // Just in case an undefined slipped in
//   if (!params.type) {
//     params.type = "";
//   }
//   if (!params.query) {
//     params.query = "";
//   }
//   const url = new URLSearchParams(params);
//   return fetch(
//     BASE_URL + "recipes/search?" + url.toString(),
//     {
//       // object literal
//       method: "GET", // HTTP method
//       headers: {
//         // HTTP headers, also object literal
//         "X-Mashape-Key": API_KEY,
//         "x-rapidapi-host": "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
//       }, // end of headers object
//     } /* end of second fetch parameter, object */,
//   )
//     .then(treatHTTPResponseACB)
//     .then(transformSearchResultACB);
// }

// function transformSearchResultACB(searchResult) {
//   return searchResult.results;
// }

// console.log(getDishDetails());

// export { getDishDetails, searchDishes };
