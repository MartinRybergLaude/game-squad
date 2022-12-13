import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";
const GENRE_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/genres";

export function getSelectedGames(ids?: string[]): Promise<Game[]> | null {
  if (ids == null || ids.length === 0) return null;
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url; where id = (${ids.join(
      ",",
    )});`,
  }).then(response => response.json());
}

export function getGamesBySearch(searchText: string): Promise<Game[]> {
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, category, first_release_date, genres, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url;
           where name ~ "${searchText}"* & category = 0;
           sort rating desc;
           limit 5;`,
  }).then(response => response.json());
}

export function getGenresByIds(ids: number[]): Promise<Game[]> {
  return fetch(`${GENRE_URL}`, {
    method: "POST",
    body: `fields name;
        where id = (${ids.join(",")});`,
  }).then(response => response.json());
}
