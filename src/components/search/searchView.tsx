import { ScrollArea, SimpleGrid, Text, TextInput } from "@mantine/core";

import { Game } from "~/types";

import SearchCard from "./searchCard";

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
  const cards =
    games.length != 0 ? (
      games.map(game => (
        <SearchCard
          image={
            //Sometimes games lack image urls
            game.cover
              ? game.cover.url
                ? game.cover.url
                : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" // This is a lack-of-image-image
              : "https://img.freepik.com/free-vector/oops-404-error-with-broken-robot-concept-illustration_114360-5529.jpg?w=2000" // We should probably replace it with something better!
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
