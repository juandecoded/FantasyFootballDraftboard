'use client';

import { Box, Button } from '@/components/ui';
import { NewDraftModal } from '@/app/drafts/components/NewDraftModal';
import { draftData } from '@/app/drafts/draftData';

export default function Home() {

  return (
    <main>
      <div>
        <Box>
         <NewDraftModal />
        </Box>
      </div>
    </main>
  );
}