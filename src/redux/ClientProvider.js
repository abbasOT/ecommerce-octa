// "use client"
// import React from 'react';
// import Providers from "./Providers";

// function ClientProviders({ children }) {
//     return <Providers>{children}</Providers>;
// }


import { Provider } from 'react-redux';
import { store } from './store';

export default function ClientProviders({ children }) {
    return <Provider store={store}>{children}</Provider>;
}