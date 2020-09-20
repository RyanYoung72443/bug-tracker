import React from 'react'
import PropTypes from 'prop-types'

const LogItem = ({ tech }) => {
  return (
    <li className="collection-item">
      <div>
        <a href="#add-tech-modal" className='modal-trigger'>
          <span className='black-text'>ID: <span className='blue-text'>{tech.id}</span> <br />Name:</span> {tech.firstName} {tech.lastName}
        </a>
        <a href="#!" className="secondary-content">
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  )
}

LogItem.propTypes = {
  tech: PropTypes.object.isRequired,
}

export default LogItem
