import React from 'react';
import { Button, Modal } from 'semantic-ui-react';
import ColumnForm from './columnForm';

function Sidebar() {
  return (
    <Modal trigger={<Button>Create</Button>} closeIcon>
      <Modal.Header>Edit list</Modal.Header>
      <Modal.Content>
        <ColumnForm />
      </Modal.Content>
    </Modal>
  );
}

export default Sidebar;
