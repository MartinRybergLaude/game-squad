import { ScrollArea, SimpleGrid, Text, TextInput } from "@mantine/core";

import { Game } from "~/types";

import SearchCard from "./searchCard";
import SearchCardPresenter from "./searchCardPresenter";

interface SearchViewProps {
  games?: Game[];
  searchGame: (value: string) => void;
}

// TODO: clean up this function
export default function SearchView({ games, searchGame }: SearchViewProps) {
  // console.log(games.length);
  if (!games) {
    return (
      <>
        <TextInput
          placeholder="Search"
          size="xs"
          mb="sm"
          onChange={event => searchGame(event.currentTarget.value.trim())}
        />
        <Text>Loading...</Text>;
      </>
    );
  }
  console.log(games);
  const cards =
    games.length != 0 ? (
      games.map(game => <SearchCardPresenter game={game} key={game.id} />)
    ) : (
      <Text>Sorry, no results!</Text>
    );

  return (
    <>
      <TextInput
        placeholder="Search"
        size="xs"
        mb="sm"
        onChange={event => searchGame(event.currentTarget.value.trim())}
      />
      <ScrollArea style={{ height: 500 }}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </ScrollArea>
    </>
  );
}
