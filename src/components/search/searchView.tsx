import { ScrollArea, SimpleGrid, Text, TextInput } from "@mantine/core";

import SearchCard from "./searchCard";
// import searchGame from "./searchFunction";
// import searchProps from "./searchPropsStandIn"; // Stand-in for search results list

interface GameCollectionViewProps {
  games: Game[];
  searchFunction: Function;
}

// interface SearchViewProps {
//   searchProps: Array<string>;
// }

export default function SearchView({ games, searchFunction }: GameCollectionViewProps) {
  console.log(games);
  const cards = games ? (
    games.map(game => (
      <SearchCard
        image={
          //Sometimes games lack image urls
          game.cover
            ? game.cover.url
              ? game.cover.url
              : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
            : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000"
        }
        title={game.name}
        description={game.summary}
        key={game.id}
        // These don't exist in the Game type at the moment
        genres={["Multiplayer", "Fun"]}
        price={"$0.00"}
        // genres={game.genres}
        // price={game.price}
      />
    ))
  ) : (
    <Text>Sorry, no results!</Text>
  );

  return (
    <>
      <TextInput
        placeholder="Search"
        size="xs"
        mb="sm"
        onChange={event => searchFunction(event.currentTarget.value.trim())}
      />
      <ScrollArea style={{ height: 500 }}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </ScrollArea>
    </>
  );
}
