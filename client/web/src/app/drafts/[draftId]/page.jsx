'use client';

import React, { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useParams } from 'next/navigation';
import Loading from './loading';
import { api } from '@/utils/api';
import { DraftProvider } from '@/app/drafts/context/DraftContext';

const DraftBoard = dynamic(() => import('@/app/drafts/components/DraftBoard').then(mod => mod.DraftBoard), {
    suspense: true,
    loading: () => <Loading />,
});

const DraftPage = () => {
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

    const initialState = {
        draftData,
        draftStatus: draftData.draftStatus,
        currentlyDrafting: draftData.currentlyDrafting,
        draftQueue: draftData.draftQueue,
        playersData: [],
        teams: draftData.teams,
        draftResults: draftData.results,
        prevTeam: null,
        lastPlayerPicked: null,
        isDrafting: false,
        showPlayersPanel: true,
        teamsArr: draftData.teamsArr,
        rosterSettings: draftData.rosterSettings,
    };

    return (
        <DraftProvider initialState={initialState}>
            <Suspense fallback={<Loading />}>
                <DraftBoard draftData={draftData}/>
            </Suspense>
        </DraftProvider>
    );
}

export default DraftPage;