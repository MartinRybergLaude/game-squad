export interface Game {
  id: string;
  name: string;
  summary: string;
  cover: {
    id: number;
    url: string;
  };
}
