'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Loading from './loading';
import { api } from '@/utils/api';

const DraftBoard = dynamic(() => import('@/app/drafts/components/DraftBoard').then(mod => mod.DraftBoard), {
    suspense: true,
    loading: () => <Loading />,
});

export const DraftPage = () => {
    const params = useParams();
    const draftId = params.draftId;
    const [draftData, setDraftData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchDraftData = async () => {
            try {
                const result = await api(`/drafts/${draftId}`);
                console.log(result)
                if (result.ok) {
                    const data = await result.json;
                    setDraftData(data);
                    setIsLoading(false);
                } else {
                    console.error('Failed to fetch draft data');
                }
            } catch (error) {
                console.error('Error fetching draft data:', error);
            }
        };

        if (draftId) {
            fetchDraftData();
        }
    }, [draftId]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Suspense fallback={<Loading />}>
            <DraftBoard draftData={draftData}/>
        </Suspense>
    );
}

export default DraftPage;