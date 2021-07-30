import './App.css';
import React from 'react';
import Main from './pages/Main';
import Notice from './pages/Notice';
import Hof from './pages/Hof';
import HofDataContainer from './pages/HofDataContainer';
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
          <Route exact path="/" component={Main} />
          <Route exact path="/notice" component={Notice} />
          <Route exact path="/hof" component={Hof} />
          <Route exact path="/ranking/:keyword" component={HofDataContainer} />
          <Route exact path="/rank" component={Rank}/>
          <Route exact path="/all" component={All}/>
        </Switch>
      </BrowserRouter>
    </div>
    
  );
}

export default App;
