import { ScrollArea, SimpleGrid, TextInput } from "@mantine/core";

import SearchCard from "./searchCard";
import searchGame from "./searchFunction";
import searchProps from "./searchPropsStandIn"; // Stand-in for search results list

interface GameCollectionViewProps {
  games: Game[];
}

// interface SearchViewProps {
//   searchProps: Array<string>;
// }

export default function SearchView({ games }: GameCollectionViewProps) {
  const cards = games.map(game => (
    <SearchCard
      image={game.cover.url}
      title={game.name}
      description={game.summary}
      key={game.id}
      // These don't exist in the Game type at the moment
      genres={["Multiplayer", "Fun"]}
      price={"$0.00"}
      // genres={game.genres}
      // price={game.price}
    />
  ));

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
