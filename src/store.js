import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import userReducer from './features/user/userSlice';
import donationReducer from './features/donation/donationSlice';
import notificationReducer from './features/notification/notificationSlice';
import searchReducer from './features/search/searchSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    donation: donationReducer,
    notification: notificationReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

// If you need persistence (optional)
// import { persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// const persistConfig = {
//   key: 'root',
//   storage,
//   whitelist: ['auth'] // only auth will be persisted
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);
// export const persistor = persistStore(store);