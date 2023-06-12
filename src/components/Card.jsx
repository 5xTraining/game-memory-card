import "./Card.css"

const Card = ({ card, handleClick, flipped, disabled }) => {
  const onClick = () => {
    if (!disabled) {
      handleClick(card)
    }
  }
  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img src={card.src} alt="cat pic" width="200" className="front" />
        <img
          src="rear.svg"
          alt="card rear"
          width="200"
          height="300"
          className="rear"
          onClick={onClick}
        />
      </div>
    </div>
  )
}

export { Card }
