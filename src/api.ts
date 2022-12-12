import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";

export function getGamesByIds(ids: string[]): Promise<Game[]> {
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url;
           where id = (${ids.join(",")});`,
  }).then(response => response.json());
}

export function getGamesBySearch(searchText: string): Promise<Game[]> {
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, category, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url;
           where name ~ "${searchText}"* & category = 0;
           sort rating desc;
           limit 5;`,
  }).then(response => response.json());
}
