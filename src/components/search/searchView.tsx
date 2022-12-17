import { ChangeEvent } from "react";
import { ScrollArea, SimpleGrid, TextInput } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

import { Game } from "~/utils/types";

import LoaderScreenPresenter from "../loaderScreen/loaderScreenPresenter";
import SearchCardPresenter from "../searchCard/searchCardPresenter";

interface SearchViewProps {
  games?: Game[];
  loading?: boolean;
  players: {
    [key: number]: number;
  };
  searchGame: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchView({ games, loading, players, searchGame }: SearchViewProps) {
  // console.log(players);
  // console.log(games);
  return (
    <>
      <TextInput placeholder="Search" size="xs" mb="sm" onChange={searchGame} />
      <div style={{ minHeight: 200, width: "100%", position: "relative" }}>
        <AnimatePresence>
          {games && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScrollArea style={{ height: 500 }}>
                <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
                  {games.map(game => (
                    <SearchCardPresenter
                      game={game}
                      key={game.id}
                      players={game ? players[parseInt(game.multiplayer_modes)] : undefined}
                    />
                  ))}
                </SimpleGrid>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{loading && <LoaderScreenPresenter spinnerSize="md" />}</AnimatePresence>
      </div>
    </>
  );
}
