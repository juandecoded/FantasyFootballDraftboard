import { Avatar, Box, Card, Flex, Grid, Heading, Text } from '@/components/ui';
import { PlayerCard } from '@/app/drafts/components/PlayerCard'

export const DraftBoardGrid = ({draftData}) => {

    const { results, teamCount, rosterSettings, teamsArr } = draftData;
    return (
        // create a grid that will hold the player cards for each team and each draft pick

        <Grid
            gap="1"
            display="grid"
            pt='2'
            style={{
                gridTemplateColumns: `repeat(${teamCount || 0}, 1fr)`,
                gridTemplateRows: `repeat(${rosterSettings.totalRosterSpots}, 1fr)`,
            }}
        >
            {Array.from({ length: rosterSettings.totalRosterSpots }).map((_, roundIndex) => { 
                // isOdd indexed to 1
                // that way on round 1 the snake order is properly implemented
                const roundNumber = parseInt(roundIndex) + 1;
                const isEven = roundNumber % 2 === 0;

                return teamsArr.map((team, teamIndex) => {

                    // const pickNumber = isOdd ? teamIndex + 1 : draft.teamCount - teamIndex;
                    // const draftPick = draft?.results?.rounds?.[roundNumber]?.[pickNumber];
                    // const player = draftPick ? draftPick : null;
                    const adjustedTeamIndex = isEven
                        ? teamsArr.length - 1 - teamIndex
                        : teamIndex;
                    const pickNumber = adjustedTeamIndex + 1;

                    const draftPick = results.rounds?.[roundNumber]?.[pickNumber];
                    const player = draftPick ? draftPick : null;
    
                    return (
                        <Box
                            key={`${roundIndex}-${team.teamId}`}
                            // player={player}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: isEven ? 'darkgray' : 'gray',
                                borderRadius: '10px',
                                height: '50px',
                                width: '100%',
                            }}
                        >
                            {player ? <PlayerCard player={player} /> : null }
                        </Box>
                    );
                });
            })}
        </Grid>
    );
}