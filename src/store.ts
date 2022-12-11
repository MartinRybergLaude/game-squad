import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Squad } from "./types";

// Contains a list of groups the user is a member of
export const squadsAtom = atom<Squad[]>([]);
// Contains the ID of the currently selected group
export const selectedSquadIdAtom = atomWithStorage<string | null>("selectedSquad", null);

// Determines whether sidebar is open in mobile view
export const sidebarOpenAtom = atom(false);
