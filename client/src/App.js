import './App.css';
import React from 'react';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Hof from './pages/Hof';
import AllPoemViewer from './pages/AllPoemViewer';
import Rank from './pages/Rank';
import Keyword from './pages/Keyword';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import NavigationBar from './components/atoms/NavigationBar';

function App() {
  return (
    <div>
      <NavigationBar/>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/notice" component={Notice} />
          <Route exact path="/hof" component={Hof} />
          <Route exact path="/all/:keyword" component={AllPoemViewer} />
          <Route exact path="/rank" component={Rank}/>
          <Route exact path="/keyword" component={Keyword}/>
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
