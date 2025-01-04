import PropTypes from 'prop-types';

import { Box, Button, Flex, Heading } from '@/components/ui';

export const Header = ({draftData, draftStatus, setDraftStatus}) => {

    const { draftName } = draftData;

    const handleDraftStatus = () => {
        switch (draftStatus) {
            case 'preDraft':
                setDraftStatus('inProgress')
                break;
            case 'inProgress':
                setDraftStatus('paused')
                break;
            case 'paused':
                setDraftStatus('inProgress')
                break;
            default:
                break;
        }
    }

    const buttonText = () => {
        switch (draftStatus) {
            case 'preDraft':
                return 'Start Draft';
            case 'inProgress':
                return 'Pause Draft';
            case 'paused':
                return 'Resume Draft';
            default:
                return '';
        }
    }

    return (
        <Flex
            direction="row"
            gap="2"
            justify="between"
        >
            <Box>
                <Heading>
                    {` ${draftName} Draft`}
                </Heading>
            </Box>
            <Box>
                <Button onClick={handleDraftStatus}>
                    {buttonText()}
                </Button>
            </Box>
        </Flex>
    )
}

Header.propTypes = {
    draftData: PropTypes.shape({
        draftName: PropTypes.string.isRequired,
        season: PropTypes.string.isRequired,
    }).isRequired,
    draftStatus: PropTypes.oneOf(['preDraft', 'inProgress', 'paused']).isRequired,
    setDraftStatus: PropTypes.func.isRequired,
};