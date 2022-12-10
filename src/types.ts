export interface Game extends BaseGame {
  name: string;
  summary: string;
  cover: {
    id: number;
    url: string;
  };
}

export interface BaseGame {
  id: string;
  upvotes: string[];
  downvotes: string[];
}

export interface Squad {
  id: string;
  name: string;
  owner: string;
  users: string[];
  games?: BaseGame[];
}
