import React, { Component } from 'react';
import Basket from './Basket.js';

class Score extends Component {

  render(){
    return (
      <div className="game__score" style={{ display: this.props.context.display }}>
        <h1>Taskai: {this.props.context.score}</h1>
        <h2>Liko laiko {this.props.context.timer}</h2>
        <Basket/>
      </div>
    )
  };
}

export default Score;
