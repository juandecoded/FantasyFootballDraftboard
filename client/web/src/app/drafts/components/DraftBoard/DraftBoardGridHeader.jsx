// put the team names, team avatars aligned with the corresponding draft position
import { Avatar, Box, Heading, Grid, Text, Flex } from '@/components/ui';

export const DraftBoardGridHeader = ({ draftData }) => {
    // the tema names, team avatars aligned with the corresponding draft position
    // 

    // create a draft order object, match the draft position to team name/ id
    const { draftOrder, teamsArr } = draftData

    if (!draftOrder) {
        return (
            <Flex>
                <Heading>
                    Draft order data is missing
                </Heading>
            </Flex>
        );
    }
    const teamCount = Object.keys(draftOrder).length;
    
    return (
        <Grid
            rows="1"
            // columns={`${teamCount}`}
            gap="1"
            display="grid"
            // style={{ backgroundColor: 'lightgray' }}
            style={{
                gridTemplateColumns: `repeat(${teamCount}, 1fr)`,
                // marginTop: '1rem',
            }}
        >
            {Object.keys(draftOrder).map((teamKey) => {
                 const teamId = draftOrder[teamKey];
                 const team = teamsArr.find(t => t.teamId === teamId);

                 return (

                <Flex
                    key={teamId}
                    // style={{ border: '1px solid red' }}
                    align="center"
                    justify="around"
                    // width="100%"
                >
                    <Heading
                        size="5"
                        style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            textAlign: 'center',
                            width: '100%'
                        }}
                    >
                        {team.teamName}
                    </Heading>
                </Flex>
                 )
            })}
            
        </Grid>
    );
}