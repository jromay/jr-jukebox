import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import storage from 'redux-persist/lib/storage';
import promiseMiddleware from 'redux-promise';
import thunk from 'redux-thunk';

import reducers from './../reducers';

const initialState = {};

const persistConfig = {
  key: "root",
  storage: storage,
  blacklist: ["form", "modal"],
  stateReconciler: autoMergeLevel2
};

const persistReducers = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(promiseMiddleware, thunk))
);
export const persistor = persistStore(store);
