import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


// Fonction composant case
function Square(props) {
        if(props.modifier){
            return <button className="square" onClick={props.onClick} style={{color:'blue'}}><i>{props.value}</i></button>
        } else {
            return <button className="square" onClick={props.onClick}>{props.value}</button>
        }
}

// Fonction plateau
class Board extends React.Component {
    renderSquare(i) {
            return (
                <Square
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    modifier={(this.props.modifier!=null && this.props.modifier.includes(i))}
                    /> );
    }

    render() {
        let toReturn = [];
        for(let i = 0; i < 3; i++){
            let tmp = [];
            for(let j = 0; j < 3; j++){
                tmp.push(this.renderSquare((i * 3) + j));
            }
            toReturn.push(<div className="board-row">{tmp}</div>);
        }
        return toReturn;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                lastsquare:null,
            }],
            stepNumber: 0,
            xIsNext: true,
        }
    }

    //function called by squares when clicked
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const squares = current.squares.slice();

        //if someone already won or the square are full
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            history : history.concat([{
                squares: squares,
                lastsquare: [i%3,Math.trunc(i/3)],
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext,
        });
    }

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);

        //function that maps history
        const moves = history.map((step, move) => {
            const desc = move ?
                'Go back to move n°'+move+'('+step.lastsquare+')' :
                'Go back to the beginning';
            if (move === this.state.stepNumber){
                return(
                    <li key={move}>
                        <button onClick={() => this.jumpTo(move)}><b> {desc} </b>
                        </button>
                    </li>
                );
            } else {
                return(
                    <li key={move}>
                            <button onClick={() => this.jumpTo(move)}> {desc}
                    </button>
                        </li>
                );
            }
        });

        let status;
        if (winner){
            status = current.squares[winner[0]] + ' won with squares '+winner;
        } else if (!current.squares.includes(null)){
            status = 'Draw';
        }else {
            status = 'Next player : '+(this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}
                modifier={winner}
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
            </div>
    );
    }
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
            //return squares[a];
            return [a,b,c];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
<Game />,
    document.getElementById('root')
);
