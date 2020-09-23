/* eslint-disable no-unused-expressions */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import LogItem from './LogItem';
import Preloader from '../layouts/Preloader';
// import PropTypes from 'prop-types';
import { getLogs } from '../../actions/logActions';
import { AppStore, Log, LogState } from '../../models';
import { CombinedState } from 'redux';

const Logs: React.FC<{ log: LogState, getLogs: Function }> = ({ log: { logs, loading, search }, getLogs }) => {

  const compareSearch = (log: Log, search: string) => {
    return (log.message.toLowerCase().includes(search.toLowerCase()) ||
      log.tech.toLowerCase().includes(search.toLowerCase()) ||
      log.id.toString().toLowerCase().includes(search.toLowerCase()));
  }

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
          logs.filter(log => search ? compareSearch(log, search) : log).map(log => <LogItem log={log} key={log.id} />)
        )}
      </ul>
    )
};

// Logs.propTypes = {
//   log: PropTypes.object.isRequired,
//   getLogs: PropTypes.func.isRequired,
// }

const mapStateToProps = (state: CombinedState<AppStore>) => ({
  log: state.log,
})

export default connect(mapStateToProps, { getLogs })(Logs);
