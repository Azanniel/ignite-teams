import { getPlayersByGroup } from './get-players-by-group'

export async function getPlayersByGroupAndTeam(groupId: string, team: string) {
  const players = await getPlayersByGroup(groupId)
  const playersByTeam = players.filter((player) => player.team === team)

  return playersByTeam
}
