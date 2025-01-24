import { Flex, Dialog, Button, Tabs, Box } from '@/components/ui';
import { useNewDraft } from '@/app/drafts/hooks/useNewDraft';
import { DraftSettings } from './DraftSettings';
import { RosterPositions } from './RosterPositions';
import { DraftOrder } from './DraftOrder';

export const NewDraftModal = () => {
  const {
    activeTab,
    rosterSettings,
    draftName,
    teamCount,
    pickTimerLength,
    isLoading,
    teams,
    handleTeamNameChange,
    handleDraftOrderChange,
    incrementPosition,
    decrementPosition,
    handleTabChange,
    handleDraftNameChange,
    handleTeamCountChange,
    handlePickTimerLengthChange,
    handleSubmit,
  } = useNewDraft();

  return (
    <Flex direction='column'>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Create a Draft</Button>
        </Dialog.Trigger>
        <Dialog.Content>
          <Dialog.Title> Create a new draft</Dialog.Title>
          <Tabs.Root value={activeTab} onValueChange={handleTabChange}>
            <Tabs.List>
              <Tabs.Trigger value="draftSettings">Draft Settings</Tabs.Trigger>
              <Tabs.Trigger value="rosterPositions">Roster Positions</Tabs.Trigger>
              <Tabs.Trigger value="draftOrder">Draft Order</Tabs.Trigger>
            </Tabs.List>
            <Box pt="3">
              <Tabs.Content value="draftSettings">
                <DraftSettings
                  draftName={draftName}
                  teamCount={teamCount}
                  pickTimerLength={pickTimerLength}
                  handleDraftNameChange={handleDraftNameChange}
                  handleTeamCountChange={handleTeamCountChange}
                  handlePickTimerLengthChange={handlePickTimerLengthChange}
                />
              </Tabs.Content>
              <Tabs.Content value="rosterPositions">
                <RosterPositions
                  rosterSettings={rosterSettings}
                  incrementPosition={incrementPosition}
                  decrementPosition={decrementPosition}
                />
              </Tabs.Content>
              <Tabs.Content value="draftOrder">
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
              <Button onClick={handleSubmit} disabled={isLoading}>
                Save
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </Flex>
  );
};