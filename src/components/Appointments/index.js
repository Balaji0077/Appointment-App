// Write your code here
import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItems from '../AppointmentItem'

import './index.css'

const task = []

class Appointments extends Component {
  state = {
    displayTask: task,
    title: '',
    date: '',
    actualdate: '',
    style: 'stared-btn',
    temporary: [],
  }

  stop = event => event.preventDefault()

  titleText = event => {
    return this.setState({title: event.target.value})
  }

  dateText = event => {
    const dateInput = event.target.value
    const formatDate = format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
    return this.setState({date: formatDate, actualdate: dateInput})
  }

  addTask = () => {
    const {date, title} = this.state
    const newTask = {
      id: uuidv4(),
      title,
      date,
      isStar: false,
    }
    return this.setState(prev => {
      return {
        displayTask: [...prev.displayTask, newTask],
        title: '',
        actualdate: '',
      }
    })
  }

  starManipulate = id => {
    return this.setState(prevState => {
      return {
        displayTask: prevState.displayTask.map(each => {
          if (each.id === id) {
            return {...each, isStar: !each.isStar}
          }
          return {...each}
        }),
      }
    })
  }

  filterStar = () => {
    const {style, displayTask, temporary} = this.state
    if (style === 'stared-btn') {
      return this.setState(prevState => {
        return {
          temporary: prevState.displayTask.filter(each => {
            if (each.isStar === true) {
              return {...each}
            }
          }),
          style: 'filteredStar',
        }
      })
    } else {
      return this.setState({displayTask, style: 'stared-btn'})
    }
  }

  render() {
    const {displayTask, title, actualdate, style, temporary} = this.state
    const temp = () => {
      if (style === 'filteredStar') {
        return temporary.map(each => (
          <AppointmentItems
            item={each}
            key={each.id}
            starChange={this.starManipulate}
          />
        ))
      } else {
        return displayTask.map(each => (
          <AppointmentItems
            item={each}
            key={each.id}
            starChange={this.starManipulate}
          />
        ))
      }
    }
    return (
      <div className="home-container">
        <div className="form-container">
          <div className="medium-card">
            <div className="medium-appointment">
              <h1 className="heading">Add Appointment</h1>
              <form className="form-list" onSubmit={this.stop}>
                <div className="title-card">
                  <div className="text-container">
                    <label htmlFor="text-data" className="title">
                      TITLE
                    </label>
                  </div>
                  <div>
                    <input
                      placeholder="Title"
                      type="text"
                      value={title}
                      id="text-data"
                      className="text-box"
                      onChange={this.titleText}
                    />
                  </div>
                </div>
                <div className="title-card">
                  <div className="text-container">
                    <label htmlFor="date" className="title">
                      DATE
                    </label>
                  </div>
                  <div>
                    <input
                      placeholder="dd/mm/yy"
                      type="date"
                      value={actualdate}
                      id="date"
                      className="text-box"
                      onChange={this.dateText}
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="button-add"
                  onClick={this.addTask}
                >
                  Add
                </button>
              </form>
            </div>
            <div className="medium-device-image">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="medium-image"
              />
            </div>
          </div>
          <div className="list-container">
            <h1 className="heading-bottom">Appointments</h1>
            <button className={style} onClick={this.filterStar}>
              Starred
            </button>
          </div>
          <ul className="items">{temp()}</ul>
        </div>
      </div>
    )
  }
}

export default Appointments
