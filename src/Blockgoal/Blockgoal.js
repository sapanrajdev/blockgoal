import React from 'react';
import './assets/css/style.css';

export class Blockgoal extends React.Component {

  constructor(props) {
    super(props);
    const state = JSON.parse(localStorage.getItem('state'));
    this.state = {
      margin: state ? state.margin : { 'left': 0, 'right': 0, 'top': 0, 'bottom': 0, },
      goal: state ? state.goal : { 'top': 400, 'left': 1000 },
    };
  }
  componentDidMount() {
    window.addEventListener('keydown', this.movePlayer);
  }

  componentDidUpdate() {
    localStorage.setItem('state', JSON.stringify(this.state));
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.movePlayer);
  }

  movePlayer = e => {
    const self = this;
    const { margin } = self.state;
    switch (e.key) {
      case 'ArrowLeft':
        margin['left'] = margin['left'] - 5;
        break;
      case 'ArrowUp':
        margin['top'] = margin['top'] - 5;
        break;
      case 'ArrowDown':
        margin['top'] = margin['top'] + 5;
        break;
      case 'ArrowRight':
        margin['left'] = margin['left'] + 5;
        break;
      default:
    }
    const goal = document.getElementById("goal");
    const player = document.getElementById("player");
    self.setState({ margin }, () => {
      setTimeout(() => {
        if (player.getBoundingClientRect().x === goal.getBoundingClientRect().x && player.getBoundingClientRect().y === goal.getBoundingClientRect().y) {
          self.setFlag(player.getBoundingClientRect().x, player.getBoundingClientRect().y);
          self.generateRandomsForGoal();
        }
      }, 150)
    });
  }

  generateRandomsForGoal = () => {
    const random1 = Math.floor(Math.random() * 240) + 1;
    const random2 = Math.floor(Math.random() * 80) + 1;
    const { goal } = this.state;
    goal['left'] = random1 * 5;
    goal['top'] = random2 * 5;
    this.setState({
      goal
    });
  }

  setFlag = (x, y) => {
    const div = document.createElement('div');
    const main = document.getElementById('main');
    div.style.margin = `${y}px 0px 0px ${x + 50}px`;
    div.className = 'flag';
    main.appendChild(div);
  }
  render() {
    return (
      <div id="main">
        <h2 className="header">MOVE GAME</h2>
        <hr />
        <div
          id="player"
          style={{ margin: `${this.state.margin['top']}px 0px 0px ${this.state.margin['left']}px` }}>
          <h4 className="center">PLAYER</h4>
        </div>
        <div
          id="goal"
          style={{ margin: `${this.state.goal['top']}px 0px 0px ${this.state.goal['left']}px` }}>
          <h4 className="center">GOAL</h4>
        </div>
      </div>
    );
  }
}