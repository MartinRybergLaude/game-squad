import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";

export function getSelectedGames(ids?: string[]): Promise<Game[]> | null {
  if (ids == null || ids.length === 0) return null;
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, genres, summary, cover.url, url, multiplayer_modes; where id = (${ids.join(
      ",",
    )});`,
  }).then(response => response.json());
}

export function getGamesBySearch(searchText: string, limit = 5): Promise<Game[]> | null {
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, genres, summary, url, multiplayer_modes;
           where category = 0; 
           search "${searchText}";
           limit ${limit};`,
  }).then(response => response.json());
}
