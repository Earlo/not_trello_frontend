import React, { useState } from 'react';
import {
  Button, Form, Select, Modal,
} from 'semantic-ui-react';
import axios from 'axios';

const ColumnForm = (props) => {
  const colors = [{
    key: 'red',
    text: 'red',
    value: 'red',
  }, {
    key: 'blue',
    text: 'blue',
    value: 'blue',
  }, {
    key: 'green',
    text: 'green',
    value: 'green',
  }, {
    key: 'yellow',
    text: 'yellow',
    value: 'yellow',
  }, {
    key: 'pink',
    text: 'pink',
    value: 'pink',
  }, {
    key: 'black',
    text: 'black',
    value: 'black',
  }];
  const [title, setTitle] = useState(props.title || 'New list');
  const [color, setColor] = useState(props.color || 'red');
  const { updateState } = props;
  const { trigger } = props;
  const { id } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    console.log(id);
    if (id) {
      axios.put(`${process.env.REACT_APP_API_ENDPOINT}columns/update/${id}`, {
        title,
        color,
      }).then((resolve) => {
        updateState(true);
      });
    } else {
      axios.post(`${process.env.REACT_APP_API_ENDPOINT}columns/add`, {
        title,
        color,
      }).then((resolve) => {
        updateState();
      });
    }
  };
  return (
    <Modal trigger={trigger} closeIcon>
      <Modal.Header>Edit list</Modal.Header>
      <Modal.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field required width={4}>
            <label>Title</label>
            <input
              placeholder="Title"
              defaultValue={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Field>
          <Form.Field required width={2}>
            <label>Color </label>
            <Select
              placeholder="red"
              search
              selection
              defaultValue={color}
              options={colors}
              onChange={(e) => setColor(e.target.innerText)}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </Modal.Content>
    </Modal>
  );
};


export default ColumnForm;
