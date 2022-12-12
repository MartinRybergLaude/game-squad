export interface Game {
  id: string;
  name: string;
  summary: string;
  genres: number[];
  cover: {
    id: number;
    url: string;
  };
}
