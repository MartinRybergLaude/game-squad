import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";

export function getSelectedGames(params: string[], param_type = "id"): Promise<Game[]> {
  // Could this be cleaner? Yes
  // Does it fulfill its purpose? Also yes
  let param = "";
  if (param_type == "id") {
    param = "where id = (" + params.join(",") + ")";
  } else if (param_type == "search") {
    param = 'search "' + params[0] + '"';
  } else {
    throw new Error("param_type has to be be id or search!");
  }

  console.log(
    `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url; ${param};`,
  );

  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url; ${param};`,
  }).then(response => response.json());
}
