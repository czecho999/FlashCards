import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {value: {id: "1", login:"dev"}}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        login: (state, action) =>{
            state.value = action.payload;
        },

        logout: (state) =>{
            state.value = 1;
        }
    }
})

const teamSlice = createSlice({
    name: "team",
    initialState: {value:{team:{id: 0, name: "Wybierz Zespół"}}},
    reducers: {
        setCurrentTeam: (state, action) =>{
            state.value = action.payload;
        },
    }
})

const chaptersSlice = createSlice({
    name: "chapters",
    initialState: {value:[{
        id: 0,
        name: "Wybierz Zespół",
        flashCards: []
    },]},
    reducers: {
        setCurrentChapters: (state, action) =>{
            state.value = action.payload;
        },
    }
})


export const {setCurrentTeam} = teamSlice.actions;
export const {setCurrentChapters} = chaptersSlice.actions;
export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        team: teamSlice.reducer,
        chapters: chaptersSlice.reducer
    }
})