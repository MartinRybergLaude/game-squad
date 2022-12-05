import { TextInput, SimpleGrid, ScrollArea } from "@mantine/core";

import SearchCard from "./searchCard";

import searchProps from "./searchPropsStandIn"; // Stand-in for search results list

interface SearchViewProps {
  searchProps: Array<string>;
}

export default function SearchView() {
  const cards = searchProps.map((card) => (
    <SearchCard props={card} key={card.title} />
  ));

  return (
    <>
      <TextInput placeholder="Search" size="xs" mb="sm" />
      <ScrollArea style={{ height: 500 }}>
        <SimpleGrid cols={3} breakpoints={[{ maxWidth: "xs", cols: 1 }]}>
          {cards}
        </SimpleGrid>
      </ScrollArea>
    </>
  );
}
