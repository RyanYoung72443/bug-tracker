import React from 'react';
import { clearCurrent } from '../../actions/logActions';
import { clearTech } from '../../actions/techActions';
import { connect } from 'react-redux';

const AddBtn: React.FC<{ clearCurrent: Function, clearTech: Function }> = ({ clearCurrent, clearTech }) => {
  return (
    <div className='fixed-action-btn'>
      <a
        href="#log-modal"
        className="btn-floating btn-large blue darken-2 modal-trigger"
        onClick={() => clearCurrent()}
      >
        <i className="large material-icons">add</i>
      </a>
      <ul>
        <li>
          <a href="#tech-list-modal" className="btn-floating green modal-trigger">
            <i className="material-icons">person</i>
          </a>
        </li>
        <li>
          <a
            href="#tech-modal"
            className="btn-floating red modal-trigger"
            onClick={() => clearTech()}>
            <i className="material-icons">person_add</i>
          </a>
        </li>
      </ul>
    </div>
  )
}

export default connect(null, { clearCurrent, clearTech })(AddBtn)
