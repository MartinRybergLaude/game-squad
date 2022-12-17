import { useQuery } from "@tanstack/react-query";

import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";
const GENRE_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/genres";
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
  multiplayerIds?: { [key: number]: number },
): Promise<Game[]> | null {
  if (multiplayerIds == null || Object.keys(multiplayerIds).length === 0) return null;
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, genres, summary, url, multiplayer_modes;
           where name ~ "${searchText}"* & category = 0 & multiplayer_modes = (${Object.keys(
      multiplayerIds,
    ).join(",")}); 
           sort rating desc;
           limit ${limit};`,
  }).then(response => response.json());
}

export function getGenresByIds(ids: number[]): Promise<Game[]> {
  return fetch(`${GENRE_URL}`, {
    method: "POST",
    body: `fields name;
        where id = (${ids.join(",")});`,
  }).then(response => response.json());
}

export function multiplayerIds(players: number) {
  const { data } = useQuery(["players"], async () => await getMultiplayerIds(players));
  // Returns dictionary where id:onlinecoopmax
  return data ? Object.assign({}, ...data.map(x => ({ [x.id]: x.onlinecoopmax }))) : {};
}

export function getMultiplayerIds(players: number): Promise<Game[]> {
  return fetch(`${MULTIPLAYER_URL}`, {
    method: "POST",
    body: `fields onlinecoopmax;
      where onlinecoopmax >= ${players};
      limit 500;`, // 500 is the limit, unfortunately
  }).then(response => response.json());
}
