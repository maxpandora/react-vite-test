import Board from "./Board";
import React from "react";

class Game extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        history: [{
          squares: Array(9).fill(null),
          selection: null,
        }],
        stepNumber: 0,
        xIsNext: true,
        listOrderAsc: true,
      };
    }
  
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber +1);
      const current = history[history.length -1];
      const squares = current.squares.slice();
      if (calculateWinner(squares) || squares[i]) {
        return;
      }
      squares[i] = this.state.xIsNext ? 'X' : 'O';
      this.setState({
        history: history.concat([{
          squares: squares,
          selection: i,
        }]),      
        stepNumber: history.length,
        xIsNext: !this.state.xIsNext,
      });
    }
  
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      });
    }

    toggleOrder() {
      this.setState(
        {
          listOrderAsc: !this.state.listOrderAsc,
        }
      )
    }
  
    render() {
      const history = this.state.history;
      const current = history[this.state.stepNumber];
      const winner = calculateWinner(current.squares);
  
      let moves = history.map((step, move) => {
        const desc = move ?
          'Go to move #' + move + calculateCoordinates(step.selection) :
          'Go to game start';
        return (
          <li key={move}>
            <button 
              onClick={() => this.jumpTo(move)}
              className={(move==this.state.stepNumber ? 'selected-move' : '')}
            >
              {desc}
            </button>
          </li>
        );
      });

      if(this.state.listOrderAsc === false) {
        moves = moves.reverse();
      }

      const switchOrderString = this.state.listOrderAsc ? 'descending' : 'ascending';
      let toggleButton = <button onClick={() => this.toggleOrder() }> Toggle order to {switchOrderString}</button>;

      let status;
      if (winner) {
        status = 'Winner: ' + winner;
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
      }
  
      return (
        <div className="game">
          <div className="game-board">
            <Board 
              squares={current.squares}
              onClick={ (i) => this.handleClick(i) }  
            />
          </div>
          <div className="game-info">
            <div>{status}</div>
            <div>{toggleButton}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      );
    }
  }

  function calculateCoordinates(i) {
    const row = Math.floor(i/3)+1;
    const col =i%3+1;

    return ' ['+ row + ', ' + col + ']';
    
  }

  function calculateWinner(squares) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  }

  export default Game;