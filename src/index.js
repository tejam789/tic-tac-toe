import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

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


    isPlayerWon(moves) {
        const winningCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let combinationIdex = 0; combinationIdex < winningCombinations.length; combinationIdex++) {
            const [a,b,c] = winningCombinations[combinationIdex];
             if (moves[a] && moves[a] == moves[b] && moves [a] == moves[c]){
                 return true;
             }
        }
        return false;
    }

    updateGameStatus(moves) {
        if(!moves.includes(null)) return 'Game drawn';
        if(this.isPlayerWon(moves)) return `Player ${this.playerMoves[this.state.currentPlayerIndex]} won`
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

    getNextPlayerStatus(){
        return `CurrentPlayer: ${this.playerMoves[1 - this.state.currentPlayerIndex]}`
    }

    handleClick(i) {
        const moves = this.state.moves.slice();
        if (this.isMoveAlreadyPlayed(i-1) || this.isPlayerWon(moves)) {
            return;
        }

        moves[i-1] = this.playerMoves[this.state.currentPlayerIndex];
        let gameStatus = this.updateGameStatus(moves);
        if (!gameStatus) {
            gameStatus = this.getNextPlayerStatus()
        }
        this.setState({
                moves: moves,
                currentPlayerIndex: 1-this.state.currentPlayerIndex,
                gameStatus: gameStatus,
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
