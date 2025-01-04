'use client';

// import { DraftLoadingPage } from '@/components/DraftLoadingPage';
import { Flex, Heading } from '@/components/ui';
import { DraftLoadingPage } from '@/app/drafts/components/DraftLoadingPage';

export default function Loading() {
    // return <DraftLoadingPage />
    return (
        <Flex align='center'>
            <Heading>
                {/* Loading Draft {draftData.draftName}... */}
                loading draft
            </Heading>
        </Flex>
    );
}