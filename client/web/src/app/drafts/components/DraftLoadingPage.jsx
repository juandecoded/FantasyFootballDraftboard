'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { Flex, Heading } from '@/components/ui';
import { api } from '@/utils/api';

export const DraftLoadingPage = () => {
    const params = useParams();
    const draftId = searchParams.get('draftId');
    const router = useRouter();
    const [draftData, setDraftData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        // load draft assets

        const loadDraftData = async () => {
            // const draftData = JSON.parse(localStorage.getItem('draftData'));

            if (!draftId) {
                router.push('/');
                return;
            }
            
            try {
                const result = await api(`drafts/${draftId}`);

                if (result.ok) { 
                    const data = await result.json;
                    setDraftData(data);
                    setIsLoading(false);
                    // router.push(`/draft/${data.draftId}`);
                    setTimeout(() => {
                        router.push(`/drafts/${draftId}`);
                    }, 3000);
                } else {
                    console.error('Failed to create draft, from the draftloading page');
                    route.push('/');
                }
            } catch (error) {
                console.error('Failed to create draft');
                router.push('/');
            }         
        }

        loadDraftData();
    }, [draftId, router]);

    if (isLoading) {
        return (
            <Flex>
                <Heading>
                    Loading Draft...
                </Heading>
            </Flex>
        );
    }

    return (
        <Flex>
            <Heading>
                {/* Loading Draft {draftData.draftName}... */}
                loading draft
            </Heading>
        </Flex>
    );
};