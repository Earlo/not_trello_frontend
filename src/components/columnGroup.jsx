import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Card } from 'semantic-ui-react';
import Column from './column';


const ColumnGroup = () => {
  const [columns, setColumns] = useState([]);

  async function fetchData() {
    const res = await axios.get(`${process.env.REACT_APP_API_ENDPOINT}columns`);
    setColumns(res.data);
  }
  useEffect(() => {
    fetchData();
  });

  return (
    <Card.Group>
      { columns.map((col) => <Column title={col.title} color={col.color} id={col._id} key={col._id} />)}
    </Card.Group>
  );
};

export default ColumnGroup;
