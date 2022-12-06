import { ScrollArea, SimpleGrid, TextInput } from "@mantine/core";

import SearchCard from "./searchCard";
import searchGame from "./searchFunction";
import searchProps from "./searchPropsStandIn"; // Stand-in for search results list

interface SearchViewProps {
  searchProps: Array<string>;
}

export default function SearchView() {
  const cards = searchProps.map(card => (
    <SearchCard
      image={card.image}
      title={card.title}
      description={card.description}
      key={card.title}
      genres={card.genres}
      price={card.price}
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
