import { Button, Flex, Table } from '@/components/ui';
import PropTypes from 'prop-types';

export const Players = ({ players, draftStatus, onDraftPlayer }) => {


    return (
        <Flex 
            direction='column'
            className="players-overlay"
                    style={{
                        position: 'fixed',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '350px',
                        // backgroundColor: 'white',
                        // overflow: 'auto',
                        borderTop: '1px solid #ccc',
                        zIndex: 1000,
                        overflow: 'hidden',
                    }}
        >
            <Flex style={{ overflowY: 'auto', height: '100%'}}>
                <Table.Root variant='surface' style={{width:'100%'}}>
                    <Table.Header style={{ position: 'sticky', top: 0, zIndex: 1001}}>
                        <Table.Row>
                            <Table.ColumnHeaderCell>Player</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Position</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Team</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>Bye</Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell></Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {players.map(player => (
                            <Table.Row key={player.playerId}>
                                <Table.RowHeaderCell>{player.firstName} {player.lastName}</Table.RowHeaderCell>
                                <Table.Cell>{player.position}</Table.Cell>
                                <Table.Cell>{player.proTeam}</Table.Cell>
                                <Table.Cell>{player.byeWeek}</Table.Cell>
                                <Table.Cell>
                                    <Button
                                        disabled={draftStatus !== 'inProgress'}
                                        onClick={() => onDraftPlayer(player.playerId)}
                                    >
                                        Draft
                                    </Button>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Flex>
        </Flex>
    );
}

Players.propTypes = {
    players: PropTypes.arrayOf(
        PropTypes.shape({
            playerId: PropTypes.number,
            firstName: PropTypes.string,
            lastName: PropTypes.string,
            position: PropTypes.string,
            proTeam: PropTypes.string,
            byeWeek: PropTypes.number,
        })
    ).isRequired,
    draftStatus: PropTypes.oneOf(['preDraft', 'inProgress', 'paused']).isRequired,
    onDraftPlayer: PropTypes.func.isRequired,
}