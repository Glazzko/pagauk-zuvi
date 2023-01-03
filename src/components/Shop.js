import React, { Component } from "react";
import rod from "../../public/assets/fishingrod.png";
import spear from "../../public/assets/spear.png";
import net from "../../public/assets/fishing-net.svg";

class Shop extends Component {
    render() {
        return (
            <div className="center">
                <h1>Parduotuve</h1>
                <div className="inline">
                    <button>
                        <img src={net} alt="net" height={150} width={150} />
                        <h3>Pirkti uz 50 tasku</h3>
                    </button>
                </div>
                <div className="inline">
                    <button>
                        <img src={rod} alt="rod" height={150} width={150} />
                        <h3>Pirkti uz 100 tasku</h3>
                    </button>
                </div>
                <div className="inline">
                    <button>
                        <img src={spear} alt="spear" height={150} width={150} />
                        <h3>Pirkti uz 200 tasku</h3>
                    </button>
                </div>
            </div>
        );
    }
}

export default Shop;
