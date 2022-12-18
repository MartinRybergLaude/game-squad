import { ChangeEvent } from "react";
import { Group, ScrollArea, SimpleGrid, TextInput } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

import { Game, MultiplayerModeObject } from "~/utils/types";

import LoaderScreenPresenter from "../loaderScreen/loaderScreenPresenter";
import SearchCardPresenter from "../searchCard/searchCardPresenter";

interface SearchViewProps {
  games?: Game[] | null;
  loading?: boolean;
  multiplayerModes?: MultiplayerModeObject;
  onSearchTextChanged: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchView({
  games,
  loading,
  multiplayerModes,
  onSearchTextChanged,
}: SearchViewProps) {
  return (
    <>
      <TextInput placeholder="Search" size="xs" mb="sm" onChange={onSearchTextChanged} />
      <div style={{ minHeight: 200, width: "100%", position: "relative" }}>
        <AnimatePresence>
          {games && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScrollArea style={{ height: 500 }}>
                <Group style={{ width: "100%" }}>
                  {games.map(game => (
                    <SearchCardPresenter
                      game={game}
                      key={game.id}
                      maxPlayers={
                        multiplayerModes ? multiplayerModes[game.multiplayer_modes] : undefined
                      }
                    />
                  ))}
                </Group>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{loading && <LoaderScreenPresenter spinnerSize="md" />}</AnimatePresence>
      </div>
    </>
  );
}
