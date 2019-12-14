import React, { useState } from 'react';
import { Button, Form, Select } from 'semantic-ui-react';
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
  }];
  const [title, setTitle] = useState(props.title || 'New list');
  const [color, setColor] = useState(props.color || 'red');
  const handleSubmit = (evt) => {
    evt.preventDefault();
    axios.post(`${process.env.REACT_APP_API_ENDPOINT}columns/add`, {
      title,
      color,
    });
  };
  return (
    <div>
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
            defaultValue={color.key}
            options={colors}
            onChange={(e) => setColor(e.target.innerText)}
          />
        </Form.Field>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};


export default ColumnForm;
