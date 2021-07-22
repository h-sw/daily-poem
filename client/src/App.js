import './App.css';
import React from 'react';
import MainPage from './pages/MainPage';
import NoticePage from './pages/NoticePage';
import HofPage from './pages/HofPage';
import HofDataPage from './pages/HofDataPage';
import {BrowserRouter,Switch,Route} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage}/>
        <Route exact path="/NoticePage" component={NoticePage}/>
        <Route exact path="/HofPage" component={HofPage}/>
        <Route exact path="/HofDataPage" component={HofDataPage}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
