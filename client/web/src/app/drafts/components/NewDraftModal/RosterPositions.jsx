import { Flex, Text, Card, IconButton } from '@/components/ui';
import { positionColors } from '../../utils/newDraftUtils';

export const RosterPositions = ({ rosterSettings, incrementPosition, decrementPosition }) => (
  <Flex direction='column'>
    <Text size="2">Enter your roster settings. </Text>
    <Text> Total roster count: {rosterSettings.totalRosterSpots} </Text>
    {
      Object.keys(rosterSettings.positions).map((position) => (
        position !== 'totalRosterSpots' && (
          <Flex key={position} gap='2' align='end'>
            <Card
              style={{
                width: '5rem',
                backgroundColor: positionColors[position]
              }}
            >
              {position.toUpperCase()}
            </Card>
            <Card>{rosterSettings.positions[position]}</Card>
            <IconButton
              size='1'
              variant='soft'
              onClick={() => incrementPosition(position)}
            >+</IconButton>
            <IconButton
              size='1'
              variant='soft'
              onClick={() => decrementPosition(position)}
            >-</IconButton>
          </Flex>
        )
      ))
    }
  </Flex>
);