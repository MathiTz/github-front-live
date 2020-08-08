import React from 'react';
import { Overlay } from 'react-portal-overlay';

import './styles.css';

import Map from 'pigeon-maps';
import Marker from 'pigeon-marker';

const Location = (props) => {
  const { location, isOpen, closeModal } = props;

  return (
    <Overlay
      open={isOpen}
      onClose={closeModal}
      closeOnClick
      className="modal__wrapper"
    >
      <div className="modal__wrapper--body">
        <Map center={location} zoom={12} height={400}>
          <Marker anchor={location} />
        </Map>
      </div>
    </Overlay>
  );
};

export default Location;
