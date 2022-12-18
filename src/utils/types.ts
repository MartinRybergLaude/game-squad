export interface Game extends BaseGame {
  name: string;
  summary: string;
  genres?: string[];
  cover?: {
    id?: number;
    url?: string;
  };
  multiplayer_modes: number;
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
  invite_code: string;
  users: string[];
  games?: BaseGame[];
}

export interface MultiplayerId {
  onlinecoopmax?: number;
  onlinemax?: number;
}

export type ReloadFunction = () => void;

export type GenreObject = { [key: string]: string };

export type MultiplayerModeObject = { [key: string]: MultiplayerMaxPlayers };

export type MultiplayerMaxPlayers = { coop: number; online: number };

export const Genres: GenreObject = {
  "2": "Point-and-click",
  "4": "Fighting",
  "5": "Shooter",
  "7": "Music",
  "8": "Platform",
  "9": "Puzzle",
  "10": "Racing",
  "11": "Real Time Strategy (RTS)",
  "12": "Role-playing (RPG)",
  "13": "Simulator",
  "14": "Sport",
  "15": "Strategy",
  "16": "Turn-based strategy (TBS)",
  "24": "Tactical",
  "25": "Hack and slash/Beat 'em up",
  "26": "Quiz/Trivia",
  "30": "Pinball",
  "31": "Adventure",
  "32": "Indie",
  "33": "Arcade",
  "34": "Visual Novel",
  "35": "Card & Board Game",
  "36": "MOBA",
};
