import {create} from 'zustand'
import {devtools, persist} from "zustand/middleware";
import storage from "../services/storage";


let store = (set) => ({
    user: null,
    isAuthenticated: false,
    setUser: (user) => set(state => ({...state, user})),
    setAuthenticated: (isAuthenticated) => set(state => ({...state, isAuthenticated})),
})

let settingsStore = (set) => ({
    token: null,
    darkMode: storage.get('darkMode') || false,
    setToken: (token) => set(state => ({...state, token})),
    setDarkMode: () => set(state => ({...state, darkMode: !state.darkMode})),
})


store = devtools(store);
settingsStore = devtools(settingsStore)
settingsStore = persist(settingsStore, {name: 'settings'});

export const useStore = create(store)
export const useSettingsStore = create(settingsStore)

