import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';


class GameOver extends Component {

  fun() {
    this.props.history.push("/");
  }
  render(){
    return (
      <div  style={{ display: this.props.context.state.gameOver }}>
        <h1 className="game__game-over-header" >Zaidimo pabaiga</h1>
        <p className="game__you-scored">Jusu taskai { this.props.context.state.score }</p>
        <button onClick={this.fun.bind(this)} 
        className="game__start-button"
        >Zaisti is naujo</button>
      </div>
    )
  };
}

export default withRouter (GameOver);
