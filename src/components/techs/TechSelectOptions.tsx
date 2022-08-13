import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { getTechs } from '../../actions/techActions';
import { AppStore, TechState } from '../../models';
import { CombinedState } from 'redux';

const TechSelectOptions: React.FC<{ getTechs: Function; tech: TechState }> = ({
  getTechs,
  tech: { techs, loading }
}) => {
  useEffect(() => {
    getTechs();
  }, [getTechs]);

  return (
    <Fragment>
      <option value="" disabled>
        Select Technician
      </option>
      {!loading &&
        !!techs &&
        techs.map(tech => (
          <option key={tech.id} value={`${tech.firstName} ${tech.lastName}`}>
            {' '}
            {tech.firstName} {tech.lastName}{' '}
          </option>
        ))}
    </Fragment>
  );
};

const mapStateToProps = (state: CombinedState<AppStore>) => ({
  tech: state.tech
});

export default connect(mapStateToProps, { getTechs })(TechSelectOptions);
