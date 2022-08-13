import React, { useState, useEffect, Fragment } from 'react';
import M from 'materialize-css';
import { connect } from 'react-redux';
import { addTech, updateTech } from '../../actions/techActions';
import { AppStore, Tech } from '../../models';
import { CombinedState } from 'redux';

const TechModal: React.FC<{
  addTech: Function;
  current: Tech | undefined;
  updateTech: Function;
}> = ({ addTech, current, updateTech }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (current) {
      setFirstName(current.firstName);
      setLastName(current.lastName);
    } else {
      setFirstName('');
      setLastName('');
    }
  }, [current]);

  const onSubmit = () => {
    if (!firstName || !lastName) {
      M.toast({ html: 'Please enter first and last name' });
    } else {
      const newTech = {
        id: current ? current.id : null,
        firstName,
        lastName
      };
      current ? updateTech(newTech) : addTech(newTech);
      setFirstName('');
      setLastName('');
    }
  };

  return (
    <div id="tech-modal" className="modal">
      <div className="modal-content">
        <h4>New Technician</h4>
        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
            <Fragment>
              {!firstName ? (
                <label htmlFor="firstName" className="active">
                  First Name
                </label>
              ) : null}
            </Fragment>
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
            <Fragment>
              {!lastName ? (
                <label htmlFor="lastName" className="active">
                  Last Name
                </label>
              ) : null}
            </Fragment>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <a href="#!" onClick={onSubmit} className={`modal-close waves-effect 'green' btn`}>
          <i className="large material-icons">add</i>
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state: CombinedState<AppStore>) => ({
  current: state.tech.current
});

export default connect(mapStateToProps, { addTech, updateTech })(TechModal);
