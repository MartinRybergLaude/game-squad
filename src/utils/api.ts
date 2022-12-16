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
  // players: number[],
): Promise<Game[]> {
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, genres, summary, url;
           where name ~ "${searchText}"* & category = 0; 
           sort rating desc;
           limit ${limit};`,
  }).then(response => response.json());
}
//  & multiplayer_mode = (${players.join(",")})

export function getGenresByIds(ids: number[]): Promise<Game[]> {
  return fetch(`${GENRE_URL}`, {
    method: "POST",
    body: `fields name;
        where id = (${ids.join(",")});`,
  }).then(response => response.json());
}

export function multiplayerIds(players = 2) {
  const { data } = useQuery(["players"], () => getMultiplayerIds(players));
  // console.log(data);
  // data ? console.log(Array.from(Object.keys(data))) : null;
  return data ? Object.keys(data) : null;
}

function getMultiplayerIds(players: number): Promise<Game[]> {
  return fetch(`${MULTIPLAYER_URL}`, {
    method: "POST",
    body: `fields onlinecoopmax;
      where onlinecoopmax >= ${players};
      limit 500;`, // 500 is the limit, unfortunately
  }).then(response => response.json());
}

// where onlinecoop = true & onlinecoopmax >= ${players};`,
