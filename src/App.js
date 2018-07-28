import React, { Component } from 'react';
import logo from './img/logo.svg'
import './css/App.css'
class App extends Component {
  render() {
    return (
      <div>
        <div class="sidenav">
          <img class="logo" src={logo}></img>
          <a href="#about" class="active">DASHBOARD</a>
          <a href="#services">HISTORY</a>
          <a href="#clients">BLOG</a>
          <a href="#contact">CONTACT</a>
        </div>
        <div class="main">
          <div class="topnav">
            <a href="#home">Home</a>
          </div>
          <div class="main-item">
            <div class="card">
              <div class="card-item-large">1</div>
              <div class="card-item-small">1</div>
            </div>
          </div>
          <div class="main-item">
            <div class="card">
              <div class="card-item-large">2</div>
              <div class="card-item-small">2</div>
            </div>
          </div>
          <div class="main-item">
            <div class="card">
              <div class="card-item-large">3</div>
              <div class="card-item-small">3</div>
            </div>
          </div>
          <div class="main-item">
            <div class="card">
              <div class="card-item-large">4</div>
              <div class="card-item-small">4</div>
            </div>
          </div>
          <div class="main-item">
            <div class="card">
              <div class="card-item-large">5</div>
              <div class="card-item-small">5</div>
            </div>
          </div>
          <div class="main-item">
            <div class="card">
              <div class="card-item-large">6</div>
              <div class="card-item-small">6</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
