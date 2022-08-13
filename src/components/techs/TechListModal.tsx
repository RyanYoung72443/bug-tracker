import React from 'react';
import TechItem from './TechItem';
import { AppStore, TechState } from '../../models';
import { CombinedState } from 'redux';
import { connect } from 'react-redux';

const TechListModal: React.FC<{ tech: TechState }> = ({ tech: { techs, loading } }) => {
  return (
    <div id="tech-list-modal" className="modal">
      <div className="modal-content">
        <h4 className="center">Technician List</h4>
        <ul className="collection">
          {!loading && !!techs && techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = (state: CombinedState<AppStore>) => ({
  tech: state.tech
});

export default connect(mapStateToProps)(TechListModal);
