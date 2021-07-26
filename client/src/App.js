import './App.css';
import React from 'react';
import MainPage from './pages/MainPage';
import NoticePage from './pages/NoticePage';
import RankingPage from './pages/RankingPage';
import RankingKeywordPage from './pages/RankingKeywordPage';
import Rank from './pages/Rank';
import All from './pages/All';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/atoms/NavigationBar';

function App() {
  return (
    <div>
      <NavigationBar/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainPage} />
          <Route exact path="/notice" component={NoticePage} />
          <Route exact path="/ranking" component={RankingPage} />
          <Route exact path="/ranking/:keyword" component={RankingKeywordPage} />
          <Route exact path="/rank" component={Rank}/>
          <Route exact path="/all" component={All}/>
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
