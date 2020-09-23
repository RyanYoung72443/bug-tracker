import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteTech, editTech } from '../../actions/techActions';

const LogItem: React.FC<{ tech, deleteTech, editTech }> = ({ tech, deleteTech, editTech }) => {
  return (
    <li className="collection-item">
      <div>
        <a href="#tech-modal" className='modal-trigger' onClick={() => editTech(tech)}>
          <span className='black-text'>ID: <span className='blue-text'>{tech.id}</span> <br />Name:</span> {tech.firstName} {tech.lastName}
        </a>
        <a href="#!" className="secondary-content" onClick={() => deleteTech(tech.id)}>
          <i className="material-icons grey-text">delete</i>
        </a>
      </div>
    </li>
  )
}

LogItem.propTypes = {
  tech: PropTypes.object.isRequired,
  deleteTech: PropTypes.func.isRequired,
  editTech: PropTypes.func.isRequired,
}

export default connect(null, { deleteTech, editTech })(LogItem)
