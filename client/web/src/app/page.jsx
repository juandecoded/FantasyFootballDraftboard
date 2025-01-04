'use client';

import { Box, Button } from '@/components/ui';

import { DraftBoard } from '@/app/drafts/components/DraftBoard';
import { NewDraftModal } from '@/app/drafts/components/NewDraftModal';

import { draftData } from '@/app/drafts/draftData';


export default function Home() {

  return (
    <main>
      <div>
        {/* <DraftBoard draftData={draftData} /> */}
        <Box>
         <NewDraftModal />
        </Box>
      </div>
    </main>
  );
}
