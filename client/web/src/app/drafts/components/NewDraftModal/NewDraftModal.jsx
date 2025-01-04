'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Card, Dialog, Flex, Heading, IconButton, SegmentedControl, Separator, Slider, Tabs, Text, TextField } from '@/components/ui';

import { api } from '@/utils/api';

import { DraftOrder } from './DraftOrder';

export const NewDraftModal = () => {

    // modal to collect the information needed to create a new draft


    // roster positions
    const defaultRosterSettings = {
        positions: {
        qb: 1,
        rb: 2,
        wr: 2,
        te: 1,
        flex: 1, // can only be wr, rb, or te
        k: 1,
        def: 1,
        bench: 6
        },
        totalRosterSpots: 15
    }

    const positionColors = {
        qb: 'red',
        rb: 'blue',
        wr: 'orange',
        te: 'yellow',
        flex: 'pink',
        k: 'purple',
        def: 'green',
    };

    const defaultDraftName = `Commysh is awesome demo draft`;
    const defaultNumberOfTeams = 10;
    const defaultPickTimerLength = '60';
    
    // track form state
    const [activeTab, setActiveTab] = useState('draftSettings');
    const [rosterSettings, setRosterSettings] = useState(defaultRosterSettings);
    const [draftName, setDraftName] = useState(defaultDraftName);
    const [teamCount, setTeamCount] = useState(defaultNumberOfTeams);
    const [pickTimerLength, setPickTimerLength] = useState(defaultPickTimerLength);

    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    
    const [teams, setTeams] = useState(Array.from({ length: teamCount }, (_, i) => {
        return {
            teamId: i + 1,
            teamName: `Team ${i + 1}`,
            draftPosition: i + 1
        }
    }));
    

    // handle team name change
    const handleTeamNameChange = (teamId, newName) => {
        setTeams(teams.map(team => team.teamId === teamId ? {...team, teamName: newName} : team));
    }

    const handleDraftOrderChange = (updatedTeams) => {
        setTeams(updatedTeams);
    };

    // add a position to the roster
    const incrementPosition = (position) => {
        setRosterSettings((prevSettings) => ({
            ...prevSettings,
            positions: {
                ...prevSettings.positions,
                [position]: prevSettings.positions[position] + 1
            },
            totalRosterSpots: prevSettings.totalRosterSpots + 1
        }))
    }
    // remove a position from the roster
    const decrementPosition = (position) => {
        setRosterSettings((prevSettings) => ({
            ...prevSettings,
            positions: {
                ...prevSettings.positions,
                [position]: prevSettings.positions[position] > 0 ? prevSettings.positions[position] - 1 : 0
            },
            totalRosterSpots: prevSettings.positions[position] > 0 ? prevSettings.totalRosterSpots - 1 : prevSettings.totalRosterSpots
        }))
    }
    // handle tab changes
    const handleTabChange = (tab) => {
        setActiveTab(tab);
    }
    // handle draft name changes
    const handleDraftNameChange = (e) => {
        setDraftName(e.target.value);
    }
    // handle teamCount changes
    const handleTeamCountChange = (newCount) => {
        setTeamCount(newCount);
        setTeams(Array.from({ length: newCount }, (_, i) => {
            return ({
                teamId: i + 1,
                teamName: `Team ${i + 1}`,
                draftPosition: i + 1
            });
        }));
    }
    // handle pick timer length changes
    const handlePickTimerLengthChange = (length) => {
        setPickTimerLength(length);
    }

    // handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        setIsLoading(true);
    
        const draftData = {
            draftName,
            teamCount,
            pickTimerLength: Number(pickTimerLength),
            rosterSettings,
            teams: teams.map(({ teamId, ...rest }) => rest)
        }

        console.log('draft data:', JSON.stringify(draftData));

        // Store draft data in localStorage
        // localStorage.setItem('draftData', JSON.stringify(draftData));

        try {
            const result = await api('/drafts', {
                method: 'POST',
                body: draftData,
            })

            console.log('API response: ', result);

            if (result.ok) {
                const data = await result.json;
                console.log('data in the handle submit received from the server', data)
                // router.push(`/draft/${data.draftId}`);
                // Navigate to the loading page
                router.push(`/drafts/${data.draftId}`);
                console.log('draft data result: ', data);
              } else {
                // Handle error response
                console.error('Failed to create draft', result.json);
              }
        } catch (error) {
            console.error(`Error creating draft: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <Flex direction='column'>
            <Dialog.Root>
                <Dialog.Trigger>
                            <Button>Create a Draft</Button>
                        </Dialog.Trigger>
                        <Dialog.Content>
                            <Dialog.Title> Create a new draft</Dialog.Title>
                            {/* <Dialog.Description>
                                Enter the information below to create a new draft
                            </Dialog.Description> */}
                            <Tabs.Root value={activeTab} onValueChange={(e)=> handleTabChange(e)}>
                            <Tabs.List>
                                <Tabs.Trigger value="draftSettings">Draft Settings</Tabs.Trigger>
                                <Tabs.Trigger value="rosterPositions">Roster Positions</Tabs.Trigger>
                                <Tabs.Trigger value="draftOrder">Draft Order</Tabs.Trigger>
                            </Tabs.List>
                            <Box pt="3">
                                <Tabs.Content value="draftSettings">
                                    <Flex direction='column'>
                                        <Box>
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">
                                                League Name
                                                </Text>
                                                <TextField.Root
                                                value={draftName}
                                                placeholder="Enter your league name"
                                                onChange={(e) => handleDraftNameChange(e)}
                                                />
                                            </label>
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">
                                                Number of Teams
                                                </Text>
                                                {/* <Slider className="SliderRoot" defaultValue={[10]} min={8} max={16} step={2} /> */}
                                                <SegmentedControl.Root
                                                    type='single'
                                                    // defaultValue={defaultNumberOfTeams}
                                                    value={teamCount}
                                                    onValueChange={handleTeamCountChange}
                                                >
                                                    <SegmentedControl.Item value={8}>8 Teams</SegmentedControl.Item>
                                                    <SegmentedControl.Item value={10}>10 Teams</SegmentedControl.Item>
                                                    <SegmentedControl.Item value={12}>12 Teams</SegmentedControl.Item>
                                                    <SegmentedControl.Item value={14}>14 Teams</SegmentedControl.Item>
                                                    <SegmentedControl.Item value={16}>16 Teams</SegmentedControl.Item>
                                                </SegmentedControl.Root>
                                            </label>
                                            <label>
                                                <Text as="div" size="2" mb="1" weight="bold">
                                                Time per pick
                                                </Text>
                                                {/* number of seconds per pick */}
                                                <SegmentedControl.Root 
                                                    type='single'
                                                    value={pickTimerLength}
                                                    onValueChange={handlePickTimerLengthChange}
                                                >
                                                <SegmentedControl.Item value="30">30 Seconds</SegmentedControl.Item>
                                                <SegmentedControl.Item value="45">45 Seconds</SegmentedControl.Item>
                                                <SegmentedControl.Item value="60">1 Minute</SegmentedControl.Item>
                                                <SegmentedControl.Item value="90">1.5 Minutes</SegmentedControl.Item>
                                                <SegmentedControl.Item value="120">2 Minutes</SegmentedControl.Item>
                                                </SegmentedControl.Root>                                        
                                            </label>                                      
                                        </Box>
                                    </Flex>
                                </Tabs.Content>

                                <Tabs.Content value="rosterPositions">
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
                                </Tabs.Content>

                                <Tabs.Content value="draftOrder">
                                <Text size="2">Enter team names then drag and drop to set your draft order.</Text>
                                    <DraftOrder
                                        teams={teams}
                                        onTeamNameChange={handleTeamNameChange}
                                        onDraftOrderChange={handleDraftOrderChange}
                                    />
                                </Tabs.Content>
                            </Box>
                            </Tabs.Root>

                            <Flex gap="3" mt="4" justify="end">
                                <Dialog.Close>
                                    <Button variant="soft" color="gray">
                                    Cancel
                                    </Button>
                                </Dialog.Close>
                                <Dialog.Close>
                                    <Button
                                        onClick={(e)=>handleSubmit(e)}
                                    >Save</Button>
                                </Dialog.Close>
                            </Flex>
                </Dialog.Content>
            </Dialog.Root>
        </Flex>
    )
}