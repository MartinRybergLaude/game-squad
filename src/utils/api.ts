import { Game, MultiplayerId, MultiplayerModeObject } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";
const MULTIPLAYER_URL =
  "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/multiplayer_modes";

export function getSelectedGames(ids?: string[]): Promise<Game[]> | null {
  if (ids == null || ids.length === 0) return null;
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, genres, cover.url, url; where id = (${ids.join(",")});`,
  }).then(response => response.json());
}

export function getGamesBySearch(
  searchText: string,
  limit = 5,
  multiplayerIds?: MultiplayerModeObject,
): Promise<Game[]> | null {
  if (multiplayerIds == null || Object.keys(multiplayerIds).length === 0) return null;
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, genres, summary, url, multiplayer_modes;
           where category = 0; 
           search "${searchText}";
           limit ${limit};`,
  }).then(response => response.json());
}

export function getMultiplayerIds(players: number): Promise<MultiplayerId[]> {
  return fetch(`${MULTIPLAYER_URL}`, {
    method: "POST",
    body: "fields onlinecoopmax, onlinemax; limit 500;",
  }).then(response => response.json());
}
