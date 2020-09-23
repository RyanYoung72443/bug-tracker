import React, { useRef } from 'react';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import { searchLogs } from '../../actions/logActions'

const SearchBar: React.FC<{ searchLogs: Function }> = ({ searchLogs }) => {
  const text = useRef<HTMLInputElement>(null);

  const onChange = () => {
    if (text && text.current) {
      searchLogs(text.current.value);
    }
  }

  return (
    <nav style={{ marginBottom: '30px' }} className='blue'>
      <div className="nav-wrapper">
        <form>
          <div className='input-field'>
            <input
              type="search"
              id="search"
              placeholder='Search Logs..'
              ref={text}
              onChange={onChange}
            />
            <label htmlFor="search" className="label-icon">
              <i className="material-icons">search</i>
            </label>
            <i className="material-icons">close</i>
          </div>
        </form>
      </div>
    </nav>
  );
};

// SearchBar.propTypes = {
//   searchLogs: PropTypes.func,
// }

export default connect(null, { searchLogs })(SearchBar);
