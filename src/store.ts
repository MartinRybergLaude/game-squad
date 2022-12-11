import { FirebaseError } from "firebase/app";
import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

import { Squad } from "./types";

// Contains a list of groups the user is a member of
export const squadsAtom = atom<Squad[]>([]);
export const squadsLoadingAtom = atom(false);
export const squadsErrorAtom = atom<FirebaseError | undefined>(undefined);

// Contains the ID of the currently selected group
export const selectedSquadIdAtom = atomWithStorage<string | null>("selectedSquad", null);

export const selectedSquadAtom = atom<Squad | undefined>(undefined);
export const selectedSquadLoadingAtom = atom(false);
export const selectedSquadErrorAtom = atom<FirebaseError | undefined>(undefined);

// Determines whether sidebar is open in mobile view
export const sidebarOpenAtom = atom(false);
