import React from 'react';
import axios from 'axios';

import {
  Card, Button, Container, Grid,
} from 'semantic-ui-react';

import ColumnForm from './columnForm';


const Column = (props) => {
  const { id } = props;
  const { title } = props;
  const { color } = props;
  const { updateState } = props;
  return (
    <Card color={props.color}>
      <Card.Content>
        <Card.Header>
          <Grid container columns={2}>
            <Grid.Column key={0}>
              {props.title}
            </Grid.Column>
            <Grid.Column key={1}>
              <Container textAlign="right">
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
                    axios.delete(`${process.env.REACT_APP_API_ENDPOINT}columns/${id}`).then(resolve => {
                      updateState();
                    });
                  }}
                />
              </Container>
            </Grid.Column>
          </Grid>
        </Card.Header>
      </Card.Content>
      <Card.Content>
        <Card.Meta>TASKS COME HERE</Card.Meta>
      </Card.Content>
    </Card>
  );
};

export default Column;
