import { Box, Flex, SegmentedControl, Text, TextField } from '@/components/ui';

export const DraftSettings = ({ draftName, teamCount, pickTimerLength, handleDraftNameChange, handleTeamCountChange, handlePickTimerLengthChange }) => (
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
        <SegmentedControl.Root
          type='single'
          value={teamCount}
          onValueChange={handleTeamCountChange}
        >
          <SegmentedControl.Item value="8">8 Teams</SegmentedControl.Item>
          <SegmentedControl.Item value="10">10 Teams</SegmentedControl.Item>
          <SegmentedControl.Item value="12">12 Teams</SegmentedControl.Item>
          <SegmentedControl.Item value="14">14 Teams</SegmentedControl.Item>
          <SegmentedControl.Item value="16">16 Teams</SegmentedControl.Item>
        </SegmentedControl.Root>
      </label>
      <label>
        <Text as="div" size="2" mb="1" weight="bold">
          Time per pick
        </Text>
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
);