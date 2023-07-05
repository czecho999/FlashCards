import './App.css';
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home';
import NavBar from './components/NavBar';
import { Box } from '@mui/material';
import Teams from './pages/Teams'
import AddTeam from './pages/AddTeam';
import Account from './pages/Account';
import Team from './pages/Team';
import Users from './pages/Users'
import Chapter from './pages/Chapter'
import AddChapter from './pages/AddChapter'
import { Provider } from 'react-redux';
import { store } from './store';
import { useState } from 'react';

function App() {
  
  const [drawerOpen, setDrawerOpen] = useState(false);
  const changeDrawer = () =>{setDrawerOpen(!drawerOpen)}
  return (
    <BrowserRouter>
    <Provider store={store}>
      <NavBar setDrawerOpen={changeDrawer}/>
       <Box component="main"  sx={{  paddingTop:8, marginRight:10 , ...(drawerOpen ? {marginLeft:40} : {marginLeft:10} )}}>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/teams" element={ <Teams/> }/>
            <Route path="/addTeam" element={ <AddTeam/> }/>
            <Route path="/account" element={ <Account/> }/>
            <Route path="/:team" element={ <Team/> }/>
            <Route path="/:team/users" element={ <Users/> }/>
            <Route path="/:team/:chapter" element={ <Chapter/> }/>
            <Route path="/:team/addChapter" element={ <AddChapter/> }/>
          </Routes>
      </Box>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
