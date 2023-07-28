import React from 'react';
import Modal from 'react-modal';
import loadingSpinner from './images/loadingbar.gif';

const LoadingPopup = ({ isOpen }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {}}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          border: 'none',
        //   background: 'transparent',
          padding: '20px',
          maxWidth: '300px',
          textAlign: 'center',
        },
      }}
    >
      <p style={{ fontSize: '25px', margin: '0' }}>Loading predictive model...</p>
      <img src={loadingSpinner} alt="Loading..." />
    </Modal>
  );
};

export default LoadingPopup;
