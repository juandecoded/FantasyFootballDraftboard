import { Card, Flex, Heading, Text } from '@/components/ui';
import PropTypes from 'prop-types';

import { players } from '@/app/drafts/players'; 

export const LastPlayerPickedCard = ({ player }) => {

  if (!player) {
    return <Text>Player not found</Text>;
  }

  const { firstName, lastName, position, proTeam } = player;

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