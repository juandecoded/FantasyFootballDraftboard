'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { Box, Flex, Heading } from '@/components/ui';
import PropTypes from 'prop-types';

export const PickTimer = ({ draftStatus, currentlyDrafting, pickTimerLength, onTimerEnd }) => {
    const draftSettings = useMemo(() => ({
        pickTimerLength,
    }), []);

    const [timeRemaining, setTimeRemaining] = useState(draftSettings.pickTimerLength);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const prevDrafterIdRef = useRef(currentlyDrafting.teamId);

    useEffect(() => {
        if (draftStatus === 'inProgress' && isRunning) {
            intervalRef.current = setInterval(() => {
                setTimeRemaining((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(intervalRef.current);
                        setIsRunning(false);
                        onTimerEnd();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (draftStatus === 'paused') {
            clearInterval(intervalRef.current);
        }

        return () => clearInterval(intervalRef.current);
    }, [draftStatus, isRunning, onTimerEnd]);

    useEffect(() => {
        if (currentlyDrafting.teamId !== prevDrafterIdRef.current) {
            setTimeRemaining(draftSettings.pickTimerLength);
            setIsRunning(draftStatus === 'inProgress');
            prevDrafterIdRef.current = currentlyDrafting.teamId;
        } else if (draftStatus === 'inProgress') {
            setIsRunning(true);
        } else {
            setIsRunning(false);
        }
    }, [currentlyDrafting, draftSettings.pickTimerLength, draftStatus]);

    // Helper function to format timeRemaining into MM:SS format
    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const timerColor = timeRemaining <= 5 ? 'red' : 'yellow';
    const flashStyle = timeRemaining > 0 && timeRemaining <= 5 ? { animation: 'flash 1s steps(1, end) infinite' } : {};

    return (
        <Flex direction='row' gap='2'>
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
    );
};

PickTimer.propTypes = {
    draftStatus: PropTypes.oneOf(['preDraft', 'inProgress', 'paused']).isRequired,
    currentlyDrafting: PropTypes.object.isRequired,
    onTimerEnd: PropTypes.func.isRequired,
};