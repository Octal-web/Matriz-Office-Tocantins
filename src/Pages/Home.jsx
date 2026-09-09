import React from 'react';

import { HeroBanner } from '@/Components/HeroBanner';
import { MoreAbout } from '@/Components/MoreAbout';
import { GridGallery } from '@/Components/GridGallery';
import { Solutions } from '@/Components/Solutions';
import { Showrooms } from '@/Components/Showrooms';
import { DoubtsList } from '@/Components/DoubtsList';

import DefaultLayout from '@/Layouts/DefaultLayout';

const Page = () => {
    return (
        <DefaultLayout>
            <HeroBanner />
            <MoreAbout />
            <GridGallery />
            <Solutions />
            <Showrooms />
            <DoubtsList />
        </DefaultLayout>
    );
};

export default Page;