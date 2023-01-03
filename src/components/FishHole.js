import React, { Component } from 'react';

class FishHole extends Component {

  render(){
    return (
      <div className="game__hole" style={{ display: this.props.context.display }}>
        <div className="game__click">
          <div className={ this.props.context.selectedPicture} onClick={ this.props.onClick }
          onContextMenu={ this.props.onContextMenu }
            style={{WebkitTransform: this.props.context[this.props.holeNumber]}}>
          </div>
          <div className="game__mound"></div>
        </div>
      </div>
    )
  };
}

export default FishHole;
