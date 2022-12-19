import PlayersBadgesView from "./playersBadgesView";

interface PlayersBadgesProps {
  maxPlayers: number[];
}

export default function PlayersBadgesPresenter({ maxPlayers }: PlayersBadgesProps) {
  return <PlayersBadgesView maxPlayers={maxPlayers} />;
}
