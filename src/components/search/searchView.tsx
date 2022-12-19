import { ChangeEvent } from "react";
import { Group, ScrollArea, SimpleGrid, Text, TextInput } from "@mantine/core";
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

export default function SearchView({ games, loading, onSearchTextChanged }: SearchViewProps) {
  function handleGames() {
    if (games == undefined) {
      // for some reason we never get here...
      return <Text>Search for games!</Text>;
    } else if (games.length == 0) {
      return <Text>Sorry, no results! Maybe you have to be more specific...</Text>;
    } else {
      return games.map(game => (
        <SearchCardPresenter game={game} key={game.id} maxPlayers={game.multiplayer_modes} />
      ));
    }
  }

  return (
    <>
      <TextInput placeholder="Search" size="xs" mb="sm" onChange={onSearchTextChanged} />
      <div style={{ minHeight: 200, width: "100%", position: "relative" }}>
        <AnimatePresence>
          {games && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScrollArea style={{ height: 500 }}>
                <Group style={{ width: "100%" }}>{handleGames()}</Group>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{loading && <LoaderScreenPresenter spinnerSize="md" />}</AnimatePresence>
      </div>
    </>
  );
}
