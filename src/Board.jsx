import React from "react";
import Square from './Square';

class Board extends React.Component {

  renderSquare(i) {
    return (
      <Square
        key={"sq_"+i}
        value={this.props.squares[i]}
        onClick={ () => this.props.onClick(i) }
      />
    );
  }

  render() {
    let board = []
    for(var row_i=0; row_i < 3; row_i++)
    {
      let row = []
      for(var col_i=0; col_i < 3; col_i++)
      {
        row.push(this.renderSquare(row_i*3+col_i));
      }
      board.push(<div key={'row_'+row_i} className="board-row">{row}</div>)  
    }

    return (
      <div>{board}</div>
    );
  }
}

export default Board;