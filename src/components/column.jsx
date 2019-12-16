import React from 'react';
import axios from 'axios';

import {
  Card, Button, Grid,
} from 'semantic-ui-react';

import { scryRenderedComponentsWithType } from 'react-dom/test-utils';
import TaskForm from './taskForm';
import Task from './task';
import ColumnForm from './columnForm';


const Column = (props) => {
  const { id } = props;
  const { title } = props;
  const { color } = props;
  const { tasks } = props;
  const { updateState } = props;

  console.log("is uperdae", updateState);
  return (
    <Card className="Column" color={props.color}>
      <Card.Content className="ColumnHeader">
        <Card.Header>
          <Grid container columns={2}>
            <Grid.Column key={0}>
              {props.title}
            </Grid.Column>
            <Grid.Column key={1}>
              <Button.Group icon>
                <TaskForm
                  trigger={<Button icon="add" />}
                  updateState={updateState}
                  parent={id}
                />
                <ColumnForm
                  trigger={<Button icon="edit" />}
                  updateState={updateState}
                  title={title}
                  color={color}
                  id={id}
                />
                <Button
                  icon="delete"
                  onClick={() => {
                    axios.delete(`${process.env.REACT_APP_API_ENDPOINT}columns/${id}`).then((resolve) => {
                      updateState();
                    });
                  }}
                />
              </Button.Group>
            </Grid.Column>
          </Grid>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        { tasks.map((task) => (
          <Task
            data={{
              id: task._id,
              name: task.name,
              desc: task.desc,
              done: task.done,
              color,
            }}
            parent={id}
            key={task._id}
            updateState={updateState}
          />
        ))}
      </Card.Content>
    </Card>
  );
};

export default Column;
