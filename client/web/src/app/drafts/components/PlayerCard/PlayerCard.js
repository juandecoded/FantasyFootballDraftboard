// create a card component that will display the player's name, position, and team like a sticker
// first name small on top, large last name on bottom, POS - TEAM on top to the right corner
import { Card, Heading, Text } from '@/components/ui';
import PropTypes from 'prop-types';

export const PlayerCard = ({ player }) => {
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
          backgroundColor: cardColor,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
      }}
    >
        <Text size='2'>{firstName}</Text>
        <Heading size='7'
          style={{
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          {lastName}
        </Heading>
        <Text size='2'>{`${position} - ${proTeam.toUpperCase()}`}</Text>
    </Card>
  );
}

PlayerCard.propTypes = {
  player: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired,
    proTeam: PropTypes.string.isRequired,
  }).isRequired,
};