import { ChangeEvent } from "react";
import { Group, ScrollArea, TextInput } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";

import { Game } from "~/utils/types";

import LoaderScreenPresenter from "../loaderScreen/loaderScreenPresenter";
import SearchCardPresenter from "../searchCard/searchCardPresenter";

interface SearchViewProps {
  games?: Game[] | null;
  loading?: boolean;
  onSearchTextChanged: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchView({ games, loading, onSearchTextChanged }: SearchViewProps) {
  return (
    <>
      <TextInput placeholder="Search" size="xs" mb="sm" onChange={onSearchTextChanged} />
      <div style={{ minHeight: 200, width: "100%", position: "relative" }}>
        <AnimatePresence>
          {games && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ScrollArea style={{ height: "70vh", minHeight: "300px" }}>
                <div style={{ width: "100%", display: "flex", flexWrap: "wrap", gap: 16 }}>
                  {games.map(game => (
                    <SearchCardPresenter game={game} key={game.id} />
                  ))}
                </div>
              </ScrollArea>
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>{loading && <LoaderScreenPresenter spinnerSize="md" />}</AnimatePresence>
      </div>
    </>
  );
}
