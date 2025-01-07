import { useDraft } from '@/app/drafts/hooks/useDraft';
import { DraftBoardGrid } from '../DraftBoardGrid';
import { Button, Flex } from '@/components/ui';
import { DraftBoardGridHeader } from './DraftBoardGridHeader';
import { Header } from './Header';
import { DraftHeader } from '../../components/DraftHeader'; 
import { Players } from '../../components/Players';

export const DraftBoard = ({ draftData }) => {
  const {
    draftStatus,
    setDraftStatus,
    currentlyDrafting,
    draftQueue,
    showPlayersPanel,
    playersData,
    teams,
    draftResults,
    prevTeam,
    togglePlayersPanel,
    handleDraftPlayer,
  } = useDraft(draftData);

  if (!draftData) {
    return (
      <Flex>
        <Heading>problem loading draft data</Heading>
      </Flex>
    );
  }

  return (
    <Flex direction="column" gap="1" style={{ position: 'relative', width: '100%' }}>
      <Header draftData={draftData} draftStatus={draftStatus} setDraftStatus={setDraftStatus} />
      <DraftHeader
        draftStatus={draftStatus}
        currentlyDrafting={currentlyDrafting}
        draftQueue={draftQueue}
        teams={teams}
        prevTeam={prevTeam}
      />
      <Flex direction="column" gap="1">
        <DraftBoardGridHeader draftData={draftData} />
        <DraftBoardGrid draftData={{ ...draftData, results: draftResults }} />
      </Flex>
      <Button
        onClick={togglePlayersPanel}
        style={{
          position: 'fixed',
          bottom: showPlayersPanel ? '350px' : '0',
          right: '10px',
          zIndex: 1001,
        }}
      >
        {showPlayersPanel ? 'Hide players' : 'Show players'}
      </Button>
      {showPlayersPanel && (
        <Players draftStatus={draftStatus} onDraftPlayer={handleDraftPlayer} players={playersData} />
      )}
    </Flex>
  );
};