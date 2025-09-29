// Container.jsx
import React, { useState } from 'react';
import Modal, { ConfirmModal, AlertModal } from './components/Modal';
import Button from './components/Button';

const Container = () => {
  const [modalType, setModalType] = useState(null);

  const closeModal = () => setModalType(null);

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Container Screen</h1>
      <p>This screen can trigger different modals.</p>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button onClick={() => setModalType('basic')}>Open Basic Modal</Button>
        <Button onClick={() => setModalType('confirm')}>Open Confirm Modal</Button>
        <Button onClick={() => setModalType('alert')}>Open Alert Modal</Button>
      </div>

      {/* Basic Modal */}
      <Button onClick={() => setModalType('basic')}>Open Basic Modal</Button>
      <Modal
        isOpen={modalType === 'basic'}
        onClose={closeModal}
        title="Basic Modal"
        showFooter
      >
        <p>This is a basic modal integrated inside a container.</p>
        <p>You can reuse this pattern in any screen.</p>
      </Modal>

      {/* Confirm Modal */}
      <ConfirmModal
        isOpen={modalType === 'confirm'}
        onClose={closeModal}
        onConfirm={() => {
          alert('Confirmed!');
          closeModal();
        }}
        title="Delete Confirmation"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this item?</p>
      </ConfirmModal>

      {/* Alert Modal */}
      <AlertModal
        isOpen={modalType === 'alert'}
        onClose={closeModal}
        type="success"
        title="Success!"
        icon="✅"
      >
        <p>Your action was completed successfully.</p>
      </AlertModal>
    </div>
  );
};

export default Container;
