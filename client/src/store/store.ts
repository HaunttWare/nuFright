import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger'; 


import { userReducer } from './user/user.reducer';
import { booksReducer } from './books/books.reducer';
import { moviesReducer } from './movies/movies.reducer';
import { showsReducer } from './shows/shows.reducer';
import { ratingsReducer } from './ratings/ratings.reducer';
import { badgesReducer } from './badges/badges.reducer';
import { chatReducer } from './chat/chat.reducer';

export const store = configureStore({ // <-- this function creates the store 
    reducer: {
        user: userReducer,
        chat: chatReducer,
        books: booksReducer, 
        movies: moviesReducer,
        shows: showsReducer,
        ratings: ratingsReducer,
        badges: badgesReducer,
    },
    // middleware: (process.env.NODE_ENV === 'development' ? [logger] : []) // <-- this adds the logger middleware only in development mode
});


