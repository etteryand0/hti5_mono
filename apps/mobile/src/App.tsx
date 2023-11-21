import React from 'react';
import TRPCProvider from './providers/trpc';
import NavigationProvider from './providers/navigation';

const App = () => {
    return (
        <TRPCProvider>
            <NavigationProvider />
        </TRPCProvider>
    )
}

export default App;
