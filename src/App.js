import React from 'react';
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Navbars from "./components/movie/Navbars"
import Discover from "./components/Discover";
import Popular from "./components/Popular";
import MyList from "./components/MyList";
import './bootstrap.min.css';
import './App.css';

class App extends React.Component {

  render() {
    return (
      <BrowserRouter>
        <Navbars />
        <div>
          <Switch>
            {/* exact={true} = exact et c'est pour eviter d'afficher tous les path dans l'url */}
            <Route path="/" exact component= {Discover}/> 
            <Route path="/popular" component= {Popular}/> 
            <Route path="/my-list" component = {MyList}/>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
