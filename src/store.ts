import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Squad } from "./types";

// Contains a list of groups the user is a member of
export const squadsAtom = atom<Squad[]>([]);
export const selectedSquadIdAtom = atomWithStorage<string | null>("selectedSquad", null);
