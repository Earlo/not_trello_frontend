/* eslint-disable no-underscore-dangle */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import {
  Card, Button, Container,
} from 'semantic-ui-react';
import Column from './column';
import ColumnForm from './columnForm';


function arraysAreEqual(ary1, ary2) {
  return (ary1.join('') === ary2.join(''));
}

const ColumnGroup = () => {
  const [columns, setColumns] = useState([]);

  async function fetchColumns(force = false) {
    const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}columns`);
    if (force || !arraysAreEqual(res.data, columns)) {
      setColumns(res.data);
    }
  }

  useEffect(() => {
    fetchColumns();
  });

  return (
    <Container className="ColumnContainer" fluid>
      <ColumnForm trigger={<Button>Create a list</Button>} updateState={fetchColumns} />
      <Card.Group>
        { columns.map((col) => (
          <Column
            title={col.title}
            color={col.color}
            id={col._id}
            priority={col.priority}
            tasks={col.tasks}
            key={col._id}
            updateState={fetchColumns}
          />
        ))}
      </Card.Group>
    </Container>
  );
};

export default ColumnGroup;
