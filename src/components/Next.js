import React, { Component } from "react";
import "../App.css";
import Score from "./Score.js";
import GameOver from "./GameOver.js";
import StartButton from "./StartButton.js";
import FishHole from "./FishHole.js";

window.timer = null;
let picture = ["game__fish", "game__fish2", "submarine"];

class Next extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            1: "translate(0, 110%)",
            2: "translate(0, 110%)",
            3: "translate(0, 110%)",
            4: "translate(0, 110%)",
            5: "translate(0, 110%)",
            6: "translate(0, 110%)",
            7: "translate(0, 110%)",
            8: "translate(0, 110%)",
            9: "translate(0, 110%)",
            10: "translate(0, 110%)",
            11: "translate(0, 110%)",
            12: "translate(0, 110%)",

            gameHasStarted: false,
            fishHasBeenClicked: false,
            submarineClicked: false,
            score: 0,
            selectedPicture: "",
            lastFish: "",
            display: "none",
            buttonMessage: "Pradeti",
            gameOver: "none",
            buttonDisplay: "inline-block"
        };
    }

    /*Timeout function*/
    timeOut(num) {
        if (this.state.gameHasStarted) {
            return;
        }
        this.setState({
            buttonDisplay: "none",
            display: "block",
            gameOver: "none"
        });
        window.setTimeout(() => {
            this.startGame();
        }, num);
    }

    /*Game start*/
    startGame() {
        if (this.state.gameHasStarted) {
            return;
        }
        this.setState({
            gameHasStarted: true,
            timer: 30,
            score: 0
        });
        const intervalID = setInterval(() => {
            this.displayFishes();
            this.randomFish();
            setTimeout(window.timer);
            if (this.state.timer <= 1) {
                window.clearInterval(intervalID);
                this.clearFishes();
                this.setState({ gameHasStarted: false });
                window.setTimeout(() => {
                    this.setState({
                        display: "none",
                        gameOver: "block"
                    });
                }, 850);
            }
        }, 750);
    }

    /*Timer in game timer=*/
    timer() {
        this.setState({
            timer: this.state.timer - 1
        });
        if (this.state.timer <= 1) {
            clearInterval(this.intervalId);
        }
    }
    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
    }
    componentWillUnmount() {
        clearInterval(this.intervalId);
    }

    /*Stop displaying fish in same position after click */
    clearFishes() {
        for (let value in this.state) {
            if (!isNaN(value)) {
                this.setState({
                    [value]: "translate(0, 110%)"
                });
            }
        }
    }

    /*Display fish in random position  */
    displayFishes() {
        let activeFish = Math.ceil(Math.random() * 12);
        if (this.state.lastFish[0] === activeFish) {
            this.displayFishes();
            return;
        }
        this.clearFishes();
        this.setState({
            [activeFish]: "translate(0, 15%)",
            lastFish: [activeFish]
        });
    }

    randomFish() {
        let randomIndex = Math.floor(Math.random() * picture.length);
        if (this.state.selectedPicture[0] === picture[randomIndex]) {
            this.randomFish();
            return;
        }
        this.setState({
            selectedPicture: picture[randomIndex]
        });
    }

    /*Fish click */
    lockOutClick() {
        window.setTimeout(() => {
            this.setState({ fishHasBeenClicked: false });
        }, 350);
    }

    /*Add to score */
    addToScore() {
        let selectedPicture = this.state.selectedPicture;
        if (selectedPicture === "game__fish2") {
            this.setState({
                score: this.state.score - 2,
                fishHasBeenClicked: false,
                background: "75px"
            });
        } else if (selectedPicture === "game__fish") {
            this.setState({
                score: this.state.score + 1,
                fishHasBeenClicked: false,
                background: "75px"
            });
        }
    }

    addToScoreSubmarine() {
        let selectedPicture = this.state.selectedPicture;
        if (selectedPicture === "submarine") {
            this.setState({
                score: this.state.score + 5,
                fishHasBeenClicked: false,
                background: "75px"
            });
        }
    }
    /*Generate grid and number every grid to display fish */
    createFishHoles() {
        var holes = [];
        for (let i = 1; i <= 12; i++) {
            holes.push(
                <FishHole
                    key={i}
                    context={this.state}
                    onClick={this.addToScore.bind(this)}
                    onContextMenu={this.addToScoreSubmarine.bind(this)}
                    holeNumber={i}
                />
            );
        }
        return <div className="board">{holes}</div>;
    }

    render() {
        const preventDefault = e => {
            e.preventDefault();
        };
        return (
            <div className="main-container">
                <div className="game" onContextMenu={preventDefault}>
                    <h1 className="game__title">Antras lygis</h1>
                    <GameOver context={this} />
                    <div ref={"gameOver"} className="game__button-container">
                        <StartButton
                            context={this.state}
                            onClick={this.timeOut.bind(this)}
                        />
                    </div>
                    {this.createFishHoles()}
                    <Score context={this.state} />
                </div>
            </div>
        );
    }
}

export default Next;
