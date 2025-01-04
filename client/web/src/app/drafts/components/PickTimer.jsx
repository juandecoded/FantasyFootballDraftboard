'use client';

import { useEffect, useMemo, useState } from 'react';
import { Box, Flex, Heading } from '@/components/ui';
import PropTypes from 'prop-types';

export const PickTimer = ({ draftStatus, currentlyDrafting}) => {

    const draftSettings = useMemo(() => ({
        pickTimerLength: 20,
        onTimerEnd: () => console.log('timer ended,'), // autodraft
    }), []);

    const [timeRemaining, setTimeRemaining] = useState(draftSettings.pickTimerLength);
    const [isRunning, setIsRunning] = useState(false);
    const [prevDrafterId, setPrevDrafterId] = useState(currentlyDrafting.teamId);

    useEffect(() => {

        let interval;

        if (draftStatus === 'inProgress' && isRunning) {
            interval = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        setIsRunning(false);
                        draftSettings.onTimerEnd();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else  if (draftStatus === 'paused') {
            clearInterval(interval);
            // setIsRunning(false);
        }

        return () => clearInterval(interval);
    }, [draftStatus, draftSettings, isRunning]);

    useEffect(() => {
        if (currentlyDrafting.teamId !== prevDrafterId) {
            setTimeRemaining(draftSettings.pickTimerLength);
            setIsRunning(draftStatus === 'inProgress');
            setPrevDrafterId(currentlyDrafting.teamId);
        }
    }, [currentlyDrafting, prevDrafterId, draftSettings.pickTimerLength, draftStatus]);

    useEffect(() => {
        if (draftStatus === 'inProgress') {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    }, [draftStatus]);

    // Helper function to format timeRemaining into MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timerColor = timeRemaining <= 5 ? 'red' : 'yellow';
    const flashStyle = timeRemaining > 0 && timeRemaining <= 5 ? { animation: 'flash 1s steps(1, end) infinite' } : {};
    // numbers blink at 10 seconds in color red, numbers flash and change at the same time

    return (
        <Flex
            direction='row'
            gap='2'
         >
            <Box
                style={{
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '5px',
                }}
            >
                <Heading size='9' color={timerColor} style={flashStyle}>
                    {formatTime(timeRemaining)}
                </Heading>
            </Box>
            <style jsx>{`
                @keyframes flash {
                    0% { opacity: 1; }
                    50% { opacity: 0; }
                    100% { opacity: 1; }
                }
            `}</style>

        </Flex>
    )

}

PickTimer.propTypes = {
    draftStatus: PropTypes.oneOf(['preDraft', 'inProgress', 'paused']).isRequired,
    currentlyDrafting: PropTypes.shape({
        teamId: PropTypes.string.isRequired,
    }).isRequired,
};