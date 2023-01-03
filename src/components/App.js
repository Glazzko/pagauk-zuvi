import React, { Component } from "react";
import "../App.css";
import Score from "./Score.js";
import StartButton from "./StartButton.js";
import GameOver from "./GameOver.js";
import FishHole from "./FishHole.js";

window.timer = null;
let picture = ["game__fish", "game__fish2"];

class App extends Component {
    constructor(props) {
        super(props);

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
            shopClicked: false,
            nextLevel: false,
            score: 0,
            selectedPicture: "",
            lastFish: "",
            display: "none",
            buttonMessage: "Start game",
            gameOver: "none",
            buttonDisplay: "inline-block",
            timer: 30
        };
    }

    autoClickFish() {
        if (!this.state.gameHasStarted) {
            return;
        }

        this.autoClickIntervalId = setInterval(() => {
            // Tikrinti ar zuvis ekrane
            for (let value in this.state) {
                if (
                    !isNaN(value) &&
                    this.state[value] === "translate(0, 15%)"
                ) {
                    // Atnaujinti žaidimo būseną
                    this.setState(prevState => ({
                        score: prevState.score + 1,
                        [value]: "translate(0, 110%)"
                    }));
                    return;
                }
            }
        }, 750);
    }
    // Timeout function
    timeOut(num) {
        if (this.state.gameHasStarted) {
            return;
        }
        this.setState({
            buttonDisplay: "none",
            display: "block",
            gameOver: "none"
        });
        setTimeout(() => {
            this.startGame();
        }, num);
    }

    // Game start
    startGame() {
        if (this.state.gameHasStarted) {
            return;
        }
        this.setState({
            gameHasStarted: true,
            timer: 30,
            score: 0
        });
        this.autoClickFish(); // Start automatically clicking on fish
        const intervalID = setInterval(() => {
            this.displayFishes();
            this.randomFish();
            if (this.state.timer <= 1) {
                clearInterval(intervalID);
                this.clearFishes();
                this.setState({ gameHasStarted: false });
                setTimeout(() => {
                    this.setState({
                        display: "none",
                        gameOver: "block"
                    });
                }, 850);
            }
        }, 750);
    }

    // Timer in game
    timer() {
        this.setState(state => ({
            timer: state.timer - 1
        }));
        if (this.state.timer < 1) {
            clearInterval(this.intervalId);
            clearTimeout(this.intervalId);
        }
    }

    componentDidMount() {
        this.intervalId = setInterval(this.timer.bind(this), 1000);
        this.intervalId = setTimeout(this.randomFish.bind(this), 2000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalId);
        clearTimeout(this.intervalId);
        clearInterval(this.autoClickIntervalId);
    }

    clearFishes() {
        for (let value in this.state) {
            if (!isNaN(value)) {
                this.setState({
                    [value]: "translate(0, 110%)"
                });
            }
        }
    }

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
        const randomIndex = Math.floor(Math.random() * picture.length);
        if (this.state.selectedPicture[0] === picture[randomIndex]) {
            this.randomFish();
            return;
        }
        this.setState({
            selectedPicture: picture[randomIndex]
        });
        console.log(this.state.selectedPicture);
    }

    lockOutClick() {
        window.setTimeout(() => {
            this.setState({ fishHasBeenClicked: false });
        }, 350);
    }
    /*Add to score */
    addToScore() {
        const { selectedPicture } = this.state;
        if (selectedPicture === "game__fish2") {
            this.setState({
                score: this.state.score + 1,
                fishHasBeenClicked: false
            });
        } else if (selectedPicture === "game__fish") {
            this.setState({
                score: this.state.score + 1,
                fishHasBeenClicked: false
            });
        }
    }

    /*Generate grid and number every grid to display fish */
    createFishHoles() {
        const holes = [];
        for (let i = 1; i <= 12; i++) {
            holes.push(
                <FishHole
                    key={i}
                    context={this.state}
                    onClick={this.addToScore.bind(this)}
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
                    <h1 className="game__title">Pagauk zuvi</h1>
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

export default App;
