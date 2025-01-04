'use client';

import { dragAndDrop, useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useEffect, useState } from 'react';

import { Box, Button, Card, Dialog, Flex, Heading, IconButton, SegmentedControl, Separator, Slider, Tabs, Text, TextField } from '@/components/ui';

 
export const DraftOrder = ({ teams, onTeamNameChange, onDraftOrderChange }) => {
    // const teamCount = typeof teamTotal === 'number' && !isNaN(teamTotal) ? teamTotal : 12;
   
    const updateDraftPositions = () => {
        const updatedTeams = draggedTeams.map((team, i) => ({
            ...team,
            draftPosition: i + 1,
        }));
        // setDraggedTeams(updatedTeams);
        onDraftOrderChange(updatedTeams);
    }

    const [parent, draggedTeams, setDraggedTeams] = useDragAndDrop(teams, { 
        handleEnd: updateDraftPositions, 
    });

    // useEffect(() => {
    //     setDraggedTeams(teams);
    // }, [teams]);

    return (
        <div>
            <div ref={parent}>
                {draggedTeams.map((team) => (
                    <Card data-label={team.teamId} key={team.teamId}>
                        <TextField.Root 
                            defaultValue={team.teamName}
                            onChange={(e) => onTeamNameChange(team.teamId, e.target.value)}
                        />
                    </Card>
                ))}
            </div>
       </div>
    )
}