import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'
import './App.css'
import HallOfFame, { FAKE_HOF } from './HallOfFame'
import Card from './Card'
import GuessCount from './GuessCount'

const SIDE = 6
const SYMBOLS = '😀🎉💖🎩🐶🐱🦄🐬🌍🌛🌞💫🍎🍌🍓🍐🍟🍿'
const VISUAL_PAUSE_MSECS = 750

class App extends Component {
    state = {
        cards: this.generateCards(),
        currentPair: [],
        guesses: 0,
        matchedCardIndices: [],
    }

    generateCards() {
        const result = []
        const size = SIDE * SIDE
        const candidates = shuffle(SYMBOLS)
        while (result.length < size) {
            const card = candidates.pop()
            result.push(card, card)
        }
        return shuffle(result)
    }

    // Arrow fx for binding
    handleCardClick = index => {
        const { currentPair } = this.state

        if (currentPair.length === 2) {
            return
        }

        if (currentPair.length === 0) {
            this.setState({ currentPair: [index] })
            return
        }

        this.handleNewPairClosedBy(index)
    }

    //returns the state of a card
    getFeedbackForCard(index){
        const {currentPair, matchedCardIndices} = this.state
        //if a card has been matched
        const indexMatched = matchedCardIndices.includes(index)

        //if 0 or 1 card is selected
        if(currentPair.length < 2) {
            //if the card has already been found or has been selected first
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
        }

        //in the case of the second card having just been selected
        return indexMatched ? 'justMatched' : 'justMismatched'
    }

    handleNewPairClosedBy(index) {
        const { cards, currentPair, guesses, matchedCardIndices } = this.state

        const newPair = [currentPair[0], index]
        const newGuesses = guesses + 1
        const matched = cards[newPair[0]] === cards[newPair[1]]
        this.setState({ currentPair: newPair, guesses: newGuesses })
        if (matched) {
            this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair] })
        }
        setTimeout(() => this.setState({ currentPair: [] }), VISUAL_PAUSE_MSECS)
    }


    render() {
        const {cards, guesses, matchedCardIndices } = this.state
        const won = matchedCardIndices.length === cards.length
        return (
            <div className="memory">
                <GuessCount guesses={guesses} />
                {cards.map((card, index) => (
                        <Card
                            card={card}
                            feedback={this.getFeedbackForCard(index)}
                            index={index}
                            key={index}
                            onClick={this.handleCardClick}
                        />
                 ))}
                {won && <HallOfFame entries={FAKE_HOF}/>}
            </div>
        )
    }
}

export default App