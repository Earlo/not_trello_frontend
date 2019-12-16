import React, { useState } from 'react';
import axios from 'axios';

import {
  Card, Grid, Button, Container,
} from 'semantic-ui-react';

import TaskForm from './taskForm';

const Task = (props) => {
  const { id } = props.data;
  const { name } = props.data;
  const { desc } = props.data;
  const [status, setstatus] = useState(props.data.status || false);
  const { color } = props.data;

  const { parent } = props;
  const { updateState } = props;
  console.log("istssassssk", id);
  return (
    <Card fluid color={color}>
      <Card.Content>
        <Card.Header>
          <Grid container columns={3}>
            <Grid.Column width={3} floated="left" key={0}>
              <Button
                circular
                icon="checkmark"
                color={status ? 'green' : 'grey'}
                onClick={() => {
                  const newStatus = !status;
                  setstatus(newStatus);
                  console.log("now my id is", id);
                  axios.patch(`${process.env.REACT_APP_API_ENDPOINT}columns/${parent}/toggletask/${id}`, {
                    status: newStatus,
                  }).then((resolve) => {
                    updateState(true);
                  });
                }}
              />
            </Grid.Column>
            <Grid.Column width={7} key={1}>
              {name}
            </Grid.Column>
            <Grid.Column floated="right" key={2}>
              <Button.Group icon>
                <TaskForm
                  trigger={<Button floated="right" icon="edit" />}
                  updateState={updateState}
                  name={name}
                  color={color}
                  id={id}
                  parent={parent}
                />
                <Button
                  icon="delete"
                  onClick={() => {
                    axios.delete(`${process.env.REACT_APP_API_ENDPOINT}columns/${parent}/deletetask/${id}`).then((resolve) => {
                      updateState(true);
                    });
                  }}
                />
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        {desc}
      </Card.Content>
    </Card>
  );
};

export default Task;
