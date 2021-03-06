/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import {
  Button, Form, Modal, Input,
} from 'semantic-ui-react';
import axios from 'axios';

const TaskForm = (props) => {
  const [name, setName] = useState(props.name || 'Task');
  const [desc, setDesc] = useState(props.desc || 'Lorem');
  const [status, setStatus] = useState(props.status || false);
  const [priority, setPriority] = useState(props.priority || 0);
  const { updateState } = props;
  const { trigger } = props;
  const { id } = props;
  const { parent } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (id) {
      axios.put(`${process.env.REACT_APP_API_ENDPOINT}columns/${parent}/edittask`, {
        id,
        parent,
        name,
        desc,
        status,
        priority,
      }).then((resolve) => {
        updateState(true);
      });
    } else {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}columns/${parent}/addtask`, {
        parent,
        name,
        desc,
        status,
        priority,
      }).then((resolve) => {
        updateState(true);
      });
    }
  };
  return (
    <Modal trigger={trigger} closeIcon>
      <Modal.Header>Edit Task</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field required width={4}>
            <label htmlFor="Name">Name</label>
            <Input
              id="Name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>
          <Form.Field required width={10}>
            <label htmlFor="Desc">Description </label>
            <Input
              id="Desc"
              placeholder="Desc"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};


export default TaskForm;
