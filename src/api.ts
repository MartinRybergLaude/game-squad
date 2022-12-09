import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";

export function getSelectedGames(params: string[], paramType = "id"): Promise<Game[]> {
  // Could this be cleaner? Yes
  // Does it fulfill its purpose? Also yes
  let get = "";
  if (paramType == "id") {
    get = "where id = (" + params.join(",") + ")";
  } else if (paramType == "search") {
    get = 'search "' + params[0] + '"';
  } else {
    throw new Error("param_type has to be be id or search!");
  }

  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url; ${get};`,
  }).then(response => response.json());
}
