/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layouts/Preloader';
import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';

const Logs = ({ log: { logs, loading }, getLogs }) => {

  useEffect(() => {
    getLogs();
  }, [getLogs]);

  return loading || !logs ? <Preloader /> :
    (
      <ul className="collection with-header">
        <li className="collection-header">
          <h4 className="center">System Logs</h4>
        </li>
        {logs.length < 1 ? (<p className="center">No logs to show...</p>) : (
          logs.map(log => <LogItem log={log} key={log.id} />)
        )}
      </ul>
    )
};

Logs.propTypes = {
  log: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  log: state.log
})

// const mapDispatchToProps = {

// }


export default connect(mapStateToProps, { getLogs })(Logs);
