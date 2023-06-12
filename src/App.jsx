/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import "./App.css"
import { Card } from "./components/Card"

const srcArr = [
  { src: "black-1.jpg", matched: false },
  { src: "black-2.jpg", matched: false },
  { src: "black-3.jpg", matched: false },
  { src: "yellow-1.jpg", matched: false },
  { src: "yellow-2.jpg", matched: false },
  { src: "yellow-3.jpg", matched: false }
]

function App() {
  const [cards, setCards] = useState([])
  const [firstChoice, setFirstChoice] = useState(null)
  const [secondChoice, setSecondChoice] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const newSet = [...srcArr, ...srcArr]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
    setCards(newSet)
  }

  const handleClick = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card)
  }
  const resetTurn = () => {
    setFirstChoice(null)
    setSecondChoice(null)
    setDisabled(false)
  }
  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true)
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true }
            }
            return card
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [firstChoice, secondChoice])

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="container">
      {cards.map((card) => (
        <Card
          card={card}
          key={card.id}
          handleClick={handleClick}
          flipped={
            card === firstChoice || card === secondChoice || card.matched
          }
          disabled={disabled}
        />
      ))}
    </div>
  )
}

export default App
