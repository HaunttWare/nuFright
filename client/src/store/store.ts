import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; 

import { userReducer } from './user/user.reducer';

export const store = configureStore({ // <-- this function creates the store 
    reducer: {
        user: userReducer, // <-- this sets the user reducer in the store
    },
    middleware: (process.env.NODE_ENV === 'development' ? [logger] : []) // <-- this adds the logger middleware only in development mode
});


