import React from "react";
import "./index.css";

const bankOne = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Heater-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Heater-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Heater-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Heater-4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Kick-n'-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
  }
];

const bankTwo = [
  {
    keyCode: 81,
    keyTrigger: "Q",
    id: "Chord-1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
  },
  {
    keyCode: 87,
    keyTrigger: "W",
    id: "Chord-2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
  },
  {
    keyCode: 69,
    keyTrigger: "E",
    id: "Chord-3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
  },
  {
    keyCode: 65,
    keyTrigger: "A",
    id: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
  },
  {
    keyCode: 83,
    keyTrigger: "S",
    id: "Open-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
  },
  {
    keyCode: 68,
    keyTrigger: "D",
    id: "Closed-HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
  },
  {
    keyCode: 90,
    keyTrigger: "Z",
    id: "Punchy-Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
  },
  {
    keyCode: 88,
    keyTrigger: "X",
    id: "Side-Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
  },
  {
    keyCode: 67,
    keyTrigger: "C",
    id: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
  }
];

var styles = {
  drumPad: {
    background: "red",
    color: "white",
    textAlign: "center",
    height: "100px",
    width: "100px",
    borderRadius: "25%",
    boxShadow: "10px 10px 5px black"
  },
  drumHit: {
    color: "white",
    textAlign: "center",
    height: "100px",
    width: "100px",
    borderRadius: "25%",
    background: "darkred",
    boxShadow: "5px 5px 0px black"
  }
};

class DrumPad extends React.Component {
  state = {
    pad_state: "drumPad"
  };
  componentDidMount() {
    document.addEventListener("keydown", this.handleKeydown);
    document.addEventListener("keyup", this.handleKeyup);
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeydown);
    document.removeEventListener("keyup", this.handleKeyup);
  }
  handleKeydown = e => {
    if (this.props.power === "ON") {
      if (e.keyCode === this.props.keyCode) {
        this.audio.play();
        this.audio.currentTime = 0;
        this.props.handleDisplay(this.props.id);
        this.setState({
          pad_state: "drumHit"
        });
      }
    }
  };
  handleKeyup = e => {
    if (this.props.power === "ON") {
      this.setState({
        pad_state: "drumPad"
      });
    }
  };
  handleClick = () => {
    if (this.props.power === "ON") {
      this.audio.play();
      this.audio.currentTime = 0;
      this.props.handleDisplay(this.props.id);
    }
  };

  render() {
    return (
      <div
        style={{ ...styles[this.state.pad_state] }}
        className="drum-pad"
        id={this.props.url}
        onClick={this.handleClick}
      >
        <h1>{this.props.keyTrigger}</h1>
        <audio
          className="clip"
          id={this.props.keyTrigger}
          src={this.props.url}
          ref={ref => (this.audio = ref)}
        />
      </div>
    );
  }
}
class Board extends React.Component {
  state = {
    power: "ON",
    bank: bankOne,
    display: ""
  };
  powerSwitch = () => {
    this.state.power === "ON"
      ? this.setState({ power: "OFF" })
      : this.setState({ power: "ON" });
  };
  bankSwitch = () => {
    this.state.bank === bankOne
      ? this.setState({ bank: bankTwo })
      : this.setState({ bank: bankOne });
  };

  handleDisplay = display => this.setState({ display: display });

  render() {
    return (
      <div id="drum-machine">
        <div id="power" onClick={this.powerSwitch}>
          {this.state.power}
        </div>
        <div id="display">{this.state.display}</div>
        <div id="bank" onClick={this.bankSwitch}>
          {this.state.bank === bankOne ? "Hip-Hop" : "Piano"}
        </div>

        {this.state.bank.map(sound => (
          <DrumPad
            power={this.state.power}
            id={sound.id}
            keyCode={sound.keyCode}
            keyTrigger={sound.keyTrigger}
            url={sound.url}
            handleDisplay={this.handleDisplay}
          />
        ))}
      </div>
    );
  }
}

export default Board;
