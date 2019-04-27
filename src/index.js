import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// class Square extends React.Component {
//
//     render() {
//         return (

//         );
//     }
// }

const Square = (props) => {
    return <button
        className="square"
        onClick={() => props.onClick()}>
        {props.value}
    </button>
}

class Board extends React.Component {
    constructor(props){
        super(props);
        this.playerMoves =  ['X','O'];
        this.state = {
            moves: Array(9).fill(null),
            currentPlayerIndex: 0,
            gameStatus: 'CurrentPlayer: X'
        }
    }

    renderSquare(i) {
        return <Square
            value={this.state.moves[i-1]}
            onClick={() => {this.handleClick(i)}}
        />;
    }

    isMoveAlreadyPlayed(i) {
        return this.state.moves[i] != null;
    }

    updateGameStatus(){
        return `CurrentPlayer: ${this.playerMoves[this.state.currentPlayerIndex]}`
    }

    handleClick(i) {
        if (this.isMoveAlreadyPlayed(i-1)) {
            alert(`Move ${i} is already been played please select other move`);
            return;
        }
        const moves = this.state.moves.slice();
        moves[i-1] = this.playerMoves[this.state.currentPlayerIndex];
        this.setState({
                moves: moves,
                currentPlayerIndex: 1-this.state.currentPlayerIndex
            }
            )
    }

    render() {
        const status = this.state.gameStatus;

        return (
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                    {this.renderSquare(3)}
                </div>
                <div className="board-row">
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                    {this.renderSquare(6)}

                </div>
                <div className="board-row">
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                    {this.renderSquare(9)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board/>
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

ReactDOM.render(
    <Game/>,
    document.getElementById('root')
);
