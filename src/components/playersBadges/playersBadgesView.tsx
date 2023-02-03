import { Badge } from "@mantine/core";

import { multiplayerData } from "~/utils/multiplayerData";

interface PlayersBadgeProps {
  maxPlayers: number[];
}

export default function PlayersBadge({ maxPlayers }: PlayersBadgeProps) {
  let coop: number | undefined = undefined;
  let online: number | undefined = undefined;

  if (maxPlayers.length > 1) {
    maxPlayers.forEach(num => {
      coop = multiplayerData[num] ? multiplayerData[num].onlinecoopmax : coop;
      online = multiplayerData[num] ? multiplayerData[num].onlinemax : online;
    });
  } else {
    coop = multiplayerData[maxPlayers[0]]
      ? multiplayerData[maxPlayers[0]].onlinecoopmax
      : undefined;
    online = multiplayerData[maxPlayers[0]] ? multiplayerData[maxPlayers[0]].onlinemax : undefined;
  }

  if (coop && !online) {
    return (
      <Badge color="green" variant="light" size="sm">
        {`${coop}p co-op`}
      </Badge>
    );
  } else if (online && !coop) {
    return (
      <Badge color="green" variant="light" size="sm">
        {`${online}p online`}
      </Badge>
    );
  } else if (online && coop) {
    if (online == coop) {
      return (
        <Badge color="green" variant="light" size="sm">
          {`${online}p online`}
        </Badge>
      );
    } else {
      return (
        <>
          <Badge color="green" variant="light" size="sm">
            {`${coop}p co-op`}
          </Badge>
          <Badge color="green" variant="light" size="sm">
            {`${online}p online`}
          </Badge>
        </>
      );
    }
  }
  return null;
}
