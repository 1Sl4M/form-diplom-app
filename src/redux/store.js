import { applyMiddleware } from 'redux';
import { configureStore, Tuple } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Подключаем redux-thunk для работы с асинхронными действиями
import rootReducer from './rootReducer'; // Подставьте свой корневой редюсер
import logger from 'redux-logger';

// Создаем Redux store с применением middleware redux-thunk
const store = configureStore({
	reducer: rootReducer,
	middleware: () => new Tuple(thunk, logger),
});

export default store;
