import { Game } from "./types";

const API_URL = "https://z9n3vcs114.execute-api.eu-north-1.amazonaws.com/production/v4/games";

export function getSelectedGames(ids?: string[]): Promise<Game[]> | null {
  if (ids == null || ids.length === 0) return null;
  return fetch(`${API_URL}`, {
    method: "POST",
    body: `fields name, cover.url, first_release_date, platforms.abbreviation, rating, rating_count, summary, total_rating, total_rating_count, url; where id = (${ids.join(
      ",",
    )});`,
  }).then(response => response.json());
}
