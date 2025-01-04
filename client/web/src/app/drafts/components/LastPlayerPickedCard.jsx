import { Avatar, Box, Card, Flex, Heading, Text } from '@/components/ui';
import PropTypes from 'prop-types';

import { players } from '@/app/drafts/players'; 


export const LastPlayerPickedCard = ({ playerId }) => {
  const player = players[playerId];

  if (!player) {
    return <Text>Player not found</Text>;
  }

  const { firstName, lastName, position, proTeam } = player;

  // logic to determine the background color of the card and variables to hold the color
  const positionColors = {
    QB: 'red',
    RB: 'blue',
    WR: 'orange',
    TE: 'yellow',
    K: 'purple',
    DEF: 'green',
  };
  // Determine card color based on player's position
  const cardColor = positionColors[position] || 'gray'; 

  return (   
    <Card
      style={{
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Add shadow for sticker effect
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        width: '250px',
        height: '100%',
        boxSizing: 'border-box',
        padding: '0px',
        paddingRight: '.5rem',
      }}
    >
        {/* <Flex 
            style={{
                width: '100%',
                // justifyContent: 'space-around',
                alignContent: 'center',
                flexGrow: 1,
            }}
        > */}
            <Avatar
                src="https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?&w=256&h=256&q=70&crop=focalpoint&fp-x=0.5&fp-y=0.3&fp-z=1&fit=crop"
                // fallback={draftOrder[team].teamPic}
                radius='none'
                size='6'
                // height='100%'
            />
            <Flex style={{display: 'flex', flexDirection: 'column', alignItems: 'center', paddingLeft: '2.5rem'}}>
                <Text size='2'>{firstName}</Text>
                <Heading size='7'
                    style={{
                        textOverflow: 'ellipsis',
                        // overflow:'',
                        whiteSpace: 'wrap'
                    }}
                >
                {lastName}
                </Heading>
                <Text size='2'>
                    {`${position} - ${proTeam.toUpperCase()}`}</Text>
            </Flex>
        {/* </Flex> */}
            
    </Card>
  );
}

LastPlayerPickedCard.propTypes = {
  player: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    proTeam: PropTypes.string.isRequired,
  }).isRequired,
};

// tdl:
// remove image background from all player profile images.