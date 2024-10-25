// Write your code here
import './index.css'
const AppointmentItems = props => {
  const {item, starChange} = props
  const {title, date, isStar, id} = item
  const clickStar = () => {
    return starChange(id)
  }
  const imgUrl = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'
  return (
    <li className="lists-container">
      <div className="title-star-container">
        <p className="title-head">{title}</p>
        <button data-testid="star" className="star-btn" onClick={clickStar}>
          <img src={imgUrl} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date">Date:{date}</p>
    </li>
  )
}

export default AppointmentItems
