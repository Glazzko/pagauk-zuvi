import React, { Component } from "react";

class ShopButton extends Component {
    render() {
        return (
            <div>
                <button
                    className="game__start-button"
                    type="button"
                    onClick={this.props.onClick}
                    style={{ display: this.props.context.buttonDisplay }}
                >
                    {this.props.context.buttonMessage1}
                </button>
            </div>
        );
    }
}

export default ShopButton;
