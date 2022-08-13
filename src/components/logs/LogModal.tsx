import React, { Fragment, useState, useEffect } from 'react';
import TechSelectOptions from '../techs/TechSelectOptions';
import { connect } from 'react-redux';
import { addLog, updateLog } from '../../actions/logActions';

import M from 'materialize-css';
import { Log, LogStatusE } from '../../models/log.model';
import { CombinedState } from 'redux';
import { AppStore } from '../../models';

const LogModal: React.FC<{ addLog: Function; current: Log | undefined; updateLog: Function }> = ({
  addLog,
  current,
  updateLog
}) => {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [tech, setTech] = useState('');

  useEffect(() => {
    if (current) {
      setMessage(current.message);
      setStatus(current.logStatus);
      setTech(current.tech);
    } else {
      setMessage('');
      setStatus('');
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
        logStatus: status,
        tech,
        date: new Date()
      };

      current ? updateLog(newLog) : addLog(newLog);

      M.toast({ html: `Log ${current ? 'updated' : 'added'} by ${tech}` });

      setMessage('');
      setTech('');
      setStatus('');
    }
  };

  const logStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => setStatus(e.target.value);

  return (
    <div id="log-modal" className="modal" style={modalStyle}>
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
              {!message ? (
                <label htmlFor="message" className="active">
                  Log Message
                </label>
              ) : null}
            </Fragment>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <select
              name="tech"
              value={tech}
              className="browser-default"
              onChange={e => setTech(e.target.value)}>
              <TechSelectOptions />
            </select>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <p>
              <label htmlFor="status">Repair State</label>
              <select
                name="status"
                value={status}
                className="browser-default"
                onChange={logStatusChange}>
                <option value="" disabled>
                  Select Repair State
                </option>
                {Object.keys(LogStatusE).map((logStatus, i) => (
                  <option key={i} value={logStatus}>
                    {LogStatusE[logStatus]}
                  </option>
                ))}
              </select>
            </p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a
          href="#!"
          onClick={onSubmit}
          className={`modal-close waves-effect ${
            LogStatusE[status] === LogStatusE.needsAttention
              ? 'red'
              : LogStatusE[status] === LogStatusE.inProgress
              ? 'orange'
              : 'green'
          } btn`}>
          Enter
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state: CombinedState<AppStore>) => ({
  current: state.log.current
});

const modalStyle = {
  width: '75%',
  height: '75%'
};

export default connect(mapStateToProps, { addLog, updateLog })(LogModal);
