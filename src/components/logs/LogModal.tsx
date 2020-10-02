import React, { Fragment, useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import { addLog, updateLog } from '../../actions/logActions';

import M from 'materialize-css';
import { Log } from '../../models/log.model';
import { CombinedState } from 'redux';
import { AppStore } from '../../models';

const LogModal: React.FC<{ addLog: Function, current: Log | undefined, updateLog: Function }> = ({ addLog, current, updateLog }) => {
  const [message, setMessage] = useState('');
  const [attention, setAttention] = useState(false);
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setAttention(current.attention);
      setTech(current.tech);
    } else {
      setMessage('');
      setAttention(false);
      setTech('');
    }
  }, [current]);

  const onSubmit = () => {
    if (!message || !tech) {
      M.toast({ html: 'Please enter a message and tech' });
    } else {
      const newLog = {
        id: current ? current.id : null,
        message,
        attention,
        tech,
        date: new Date()
      }

      current ? updateLog(newLog) : addLog(newLog);

      M.toast({ html: `Log ${current ? 'updated' : 'added'} by ${tech}` })

      setMessage('');
      setTech('');
      setAttention(false);
    }
  }

  const attentionClick = () => setAttention(!attention)

  return (
    <div id='log-modal' className='modal' style={modalStyle}>
      <div className="modal-content">
        <h4>Enter System Log</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="message"
              value={message}
              onChange={e => setMessage(e.target.value)}
            />
            <Fragment>
              {!message ? (<label htmlFor="message" className='active'>
                Log Message
              </label>) : null}
            </Fragment>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className='browser-default'
              onChange={e => setTech(e.target.value)}>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label>
                <input
                  type="checkbox"
                  className='filled-in'
                  checked={attention}
                  onChange={attentionClick}
                />
                <span>Needs Attention</span>
              </label>
            </p>
          </div>
        </div>

        {/* <div className="row">
          <div className="input-field">
            <p>
              <label>
                <select
                  name="tech"
                  value={tech}
                  className='browser-default'
                  onChange={e => setTech(e.target.value)}>
                  <option value="" disabled>Select Repair State</option>
                  <option value="Complete" >Complete</option>
                  <option value="In Progress" >In Progress</option>
                  <option value="Crucial" >Crucial</option>
                </select>
              </label>
            </p>
          </div>
        </div> */}
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className={`modal-close waves-effect ${attention ? 'red' : 'green'} btn`}
        >
          Enter
        </a>
      </div>
    </div>
  )
}

const mapStateToProps = (state: CombinedState<AppStore>) => ({
  current: state.log.current,
})

const modalStyle = {
  width: '75%',
  height: '75%'
}

export default connect(mapStateToProps, { addLog, updateLog })(LogModal)
