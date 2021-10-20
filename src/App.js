import "./App.css";
import React, { Component } from "react";
import News from "./components/News";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";

export class App extends Component {
  categories = ["business", "entertainment", "health", "science", "sports", "technology"];
  apiKey = process.env.REACT_APP_NEWS_API
  state = { progress: 0 };
  setProgress = (value) => {
    this.setState({ progress: value });
  };
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar color="#f11946" progress={this.state.progress} height={3} />
          <Switch>
            <Route exact path="/">
              <News key="general" setProgress={this.setProgress} pageSize={10} country="in" category="general" apiKey={this.apiKey}/>
            </Route>
            {this.categories.map((element) => {
              return (
                // Adding key in Route to supress warning & key in unique for component to remount every time
                <Route exact path={"/" + element} key={element}>
                  <News key={element} setProgress={this.setProgress} pageSize={10} country="in" category={element} apiKey={this.apiKey}/>
                </Route>
              );
            })}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
