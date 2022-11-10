import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthReducer from '../reducers/authReducer';
import OtpReducer from '../reducers/sendOtpReducer';
import ProfileReducer from '../reducers/profileReducer';
import ClosetReducer from '../reducers/closetReducer';

const persistConfig = {
  key: 'root',
  // Storage Method (React Native)
  storage: AsyncStorage,
  // Whitelist (Save Specific Reducers)
  whitelist: ['AuthReducer', 'ProfileReducer', 'ClosetReducer'],
};

const rootReducer = combineReducers({
  AuthReducer,
  OtpReducer,
  ProfileReducer,
  ClosetReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

let store = createStore(persistedReducer, applyMiddleware(thunk));

let persistor = persistStore(store);

export {store, persistor};
