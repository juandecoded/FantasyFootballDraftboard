import { Avatar, Box, Flex, Heading, Text } from '@/components/ui';
import { PickTimer } from './PickTimer';
import { LastPlayerPickedCard } from './LastPlayerPickedCard';
import PropTypes from 'prop-types';

const DraftingInfo = ({ currentlyDrafting, currentTeam, draftStatus }) => {
    if (!currentlyDrafting || !currentTeam) {
        return null;
    }

    if (draftStatus === 'preDraft') {
        return (
            <Flex direction='column'>
                <Heading size='2' style={{ color: 'orange' }}>The draft has not started</Heading>
                <Text> Click start draft to begin</Text>
            </Flex>
        );
    } else if (draftStatus === 'paused') {
        return <Heading size='2' style={{ color: 'orange' }}>Draft is paused</Heading>;
    } else {
        return (
            <Flex direction='column' align='center' style={{ width: '250px' }}>
                {currentlyDrafting.lastPlayerPicked ? (
                    <>
                        <Heading size='2' style={{ color: 'orange' }}>
                            With the {currentlyDrafting.overallPickNumber} pick, {currentTeam ? currentTeam.teamName : 'Unknown Team'} selects:
                        </Heading>
                        <LastPlayerPickedCard playerId={currentlyDrafting.lastPlayerPicked} />
                    </>
                ) : null}
            </Flex>
        );
    }
};

const DraftStatus = ({ currentlyDrafting }) => (
    <Flex direction='column' gap='2' align='center'>
        <Heading>Currently drafting:</Heading>
        <Flex gap='4'>
            <Flex direction='column' align='center'>
                <Heading>Round:</Heading>
                <Heading>{currentlyDrafting.round}</Heading>
            </Flex>
            <Flex direction='column' align='center'>
                <Heading>Pick:</Heading>
                <Heading>{currentlyDrafting.pick}</Heading>
            </Flex>
        </Flex>
    </Flex>
);

const DraftQueue = ({ draftQueue }) => (
    <Flex direction='column' gap='1'>
        <Flex gap='4'>
            <Avatar />
            <Heading size='7'>{draftQueue.currentTeamName}</Heading>
        </Flex>
        <Flex gap='3'>
            <Flex gap='4'>
                <Heading size='4'>Up next:</Heading>
                <Text>{draftQueue.upNext}</Text>
            </Flex>
            <Flex gap='4'>
                <Heading size='4'>On deck:</Heading>
                <Text>{draftQueue.onDeck}</Text>
            </Flex>
            <Flex gap='4'>
                <Heading size='4'>In the hole:</Heading>
                <Text>{draftQueue.after}</Text>
            </Flex>
        </Flex>
    </Flex>
);

export const DraftHeader = ({ currentlyDrafting, draftQueue, draftStatus, teams }) => {
    const currentTeam = teams[currentlyDrafting.teamId];

    if (!currentlyDrafting || !currentTeam || !draftQueue) {
        return null;
    }

    return (
        <Flex
            gap="2"
            style={{
                height: '115px',
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                border: '1px solid black',
                padding: '.5rem',
            }}
        >
            <DraftingInfo
                currentlyDrafting={currentlyDrafting}
                currentTeam={currentTeam}
                draftStatus={draftStatus}
            />
            <Flex gap='4'>
                <Box>
                    <DraftStatus currentlyDrafting={currentlyDrafting} />
                </Box>
                <DraftQueue draftQueue={draftQueue} />
            </Flex>
            <Flex>
                <Box>
                    <PickTimer draftStatus={draftStatus} currentlyDrafting={currentlyDrafting} />
                </Box>
            </Flex>
        </Flex>
    );
};

DraftingInfo.propTypes = {
    currentlyDrafting: PropTypes.shape({
        overallPickNumber: PropTypes.number.isRequired,
        lastPlayerPicked: PropTypes.string.isRequired,
    }).isRequired,
    currentTeam: PropTypes.shape({
        teamName: PropTypes.string,
    }),
    draftStatus: PropTypes.oneOf(['preDraft', 'inProgress', 'paused']).isRequired,
};

DraftHeader.propTypes = {
    currentlyDrafting: PropTypes.object.isRequired,
    draftQueue: PropTypes.object.isRequired,
    draftStatus: PropTypes.string.isRequired,
    teams: PropTypes.object.isRequired,
};

DraftQueue.propTypes = {
    draftQueue: PropTypes.shape({
        currentTeamName: PropTypes.string.isRequired,
        upNext: PropTypes.string.isRequired,
        onDeck: PropTypes.string.isRequired,
        after: PropTypes.string.isRequired,
    }).isRequired,
};