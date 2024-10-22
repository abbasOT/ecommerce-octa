// "use client"

// import React from 'react'
// import { Provider } from 'react-redux'
// import { store } from './store'

// function Providers({ children }) {
//     return (
//         <Provider store={store}>
//             {children}
//         </Provider>
//     )
// }

// export default Providers


"use client";

import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store'; // Import the store and persistor

function Providers({ children }) {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
}

export default Providers;
