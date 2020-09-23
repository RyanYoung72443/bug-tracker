import React from 'react';
import TechItem from './TechItem';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const TechListModal: React.FC<{ tech }> = ({ tech: { techs, loading } }) => {

  return (
    <div id="tech-list-modal" className='modal'>
      <div className="modal-content">
        <h4 className="center">Technician List</h4>
        <ul className="collection">
          {!loading && !!techs && techs.map(tech => <TechItem tech={tech} key={tech.id} />)}
        </ul>
      </div>
    </div>
  )
}

TechListModal.propTypes = {
  tech: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  tech: state.tech,
})

export default connect(mapStateToProps)(TechListModal);
