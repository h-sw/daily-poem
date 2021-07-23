import './App.css';
import React from 'react';
import MainPage from './pages/MainPage';
import NoticePage from './pages/NoticePage';
import RankingPage from './pages/RankingPage';
import RankingKeywordPage from './pages/RankingKeywordPage';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/notice" component={NoticePage} />
        <Route exact path="/HofPage" component={RankingPage} />
        <Route exact path="/ranking/:keyword" component={RankingKeywordPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
