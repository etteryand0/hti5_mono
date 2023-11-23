/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import TRPCProvider from './providers/trpc';
import NavigationProvider from './providers/navigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';

const App = () => {
    return (
        <TRPCProvider>
            <ApplicationProvider {...eva} theme={eva.light}>
                <NavigationProvider />
            </ApplicationProvider>
        </TRPCProvider>
    )
}

export default App;
