import { createStore } from 'zustand';

type AppStartedState = boolean;

export const useAppStarted = createStore<AppStartedState>()(() => false);
