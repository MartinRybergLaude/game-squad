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
    return JSON.parse(JSON.stringify(data)).access_token.trim();
  });

console.log(await twitchKey);

async function getGames() {
  const key = await twitchKey;
  // endpoint = endpoint? endpoint: "" //If endpoint undefined (falsy), endpoint = empty string
  // params = params? params: "" //If params undefined (falsy), params = empty string
  return fetch(
    "https://api.igdb.com/v4/games",
    {
      // object literal
      method: "POST",
      // mode: "no-cors",
      headers: {
        Accept: "application/json",
        "Client-ID": client_id,
        Authorization: "Bearer " + key,
        "Access-Control-Allow-Origin": "https://api.igdb.com/v4/games", //I have no idea what this does
      }, // end of headers object
      // data: "fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites;",
      // data: "fields name; limit 10;",
    } /* end of second fetch parameter, object */,
  ).then(response => response.json());
}

// function treatHTTPResponseACB(response) {
//   if (response.status == 200) {
//     return response.json();
//   } else {
//     throw "Error";
//   }
// }

console.log(getGames());

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
