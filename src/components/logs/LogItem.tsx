import React from 'react';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { deleteLog, setCurrent } from '../../actions/logActions';

import M from 'materialize-css';
import { Log } from '../../models/log.model';

const LogItem: React.FC<{ log: Log; deleteLog: Function; setCurrent: Function }> = ({
  log,
  deleteLog,
  setCurrent
}) => {
  const onDelete = () => {
    deleteLog(log.id);
    M.toast({ html: 'Log Deleted' });
  };

  return (
    <li className="collection-item">
      <div>
        <a
          href="#log-modal"
          className={`modal-trigger ${log.attention ? 'red-text' : 'green-text'}`}
          onClick={() => setCurrent(log)}>
          {log.message}
        </a>
        <br />
        <span className="grey-text">
          <span className="black-text">ID #{log.id}</span> last updated by{' '}
          <span className="black-text">{log.tech}</span> on{' '}
          <Moment format="MMMM Do YYYY, h:mm:ss a">{log.date}</Moment>
        </span>
        <a href="#!" className="secondary-content">
          <i className="material-icons grey-text" onClick={onDelete}>
            delete
          </i>
        </a>
      </div>
    </li>
  );
};

export default connect(null, { deleteLog, setCurrent })(LogItem);
