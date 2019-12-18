import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import {
  Card, Grid, Button, Label, Input, Form,
} from 'semantic-ui-react';

import TaskForm from './taskForm';

const Task = (props) => {
  const { id } = props.data;
  const { name } = props.data;
  const { desc } = props.data;
  const [status, setStatus] = useState(props.data.status || false);
  const [comments, setComments] = useState(props.data.comments || []);
  const { color } = props.data;
  const [newComment, setNewComment] = useState('');

  const [onButton, setOnButton] = useState(false);
  const [onCard, setOnCard] = useState(false);

  const [open, setOpen] = useState(false);

  const { parent } = props;
  const { updateState } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (newComment != null && newComment !== '') {
      axios.patch(`${process.env.REACT_APP_API_ENDPOINT}columns/${parent}/addcomment/${id}`, {
        text: newComment,
        user: "asd",
      }).then((resolve) => {
        setNewComment('');
        updateState(true);
      });
    }
  };

  const GetComments = () => {
    if (open) {
      const commentObjects = comments.map((c) => (
        <Card
          key={c._id}
          fluid
          color={color}
        >
          <Card.Content>
            <Card.Header>{c.user}</Card.Header>
            <Card.Meta>
              <span>{c.text}</span>
            </Card.Meta>
          </Card.Content>
          <Card.Content extra>
            {c.timestamp}
          </Card.Content>
        </Card>
      ));
      return (
        <div>
          {commentObjects}
          <Form onSubmit={handleSubmit}>
            <Form.Field required width={16}>
              <label htmlFor="comment">Comment</label>
              <Input
                id="comment"
                placeholder="Write comment here"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Field>
            <Button type="submit">Post comment</Button>
          </Form>
        </div>
      );
    }
    return '';
  };

  return (
    <Card
      fluid
      color={color}
      raised
      draggable
      onDragEnd={(e) => {
        const cc = document.getElementById('ColumnContainer');
        console.log(e.screenX, e.screenY, cc.scrollLeft);
      }}
      onMouseEnter={() => setOnCard(true)}
      onMouseLeave={() => setOnCard(false)}
      onClick={() => {
        if (!open && !onButton && onCard) {
          setOpen(true);
        }
      }}
    >
      <Card.Content>
        <Card.Header>
          <Grid container columns={3}>
            <Grid.Column width={3} floated="left" key={0}>
              <Button
                circular
                icon="checkmark"
                color={status ? 'green' : 'grey'}
                onMouseEnter={() => setOnButton(true)}
                onMouseLeave={() => setOnButton(false)}
                onClick={() => {
                  const newStatus = !status;
                  setStatus(newStatus);
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
                  trigger={(
                    <Button
                      floated="right"
                      icon="edit"
                      onMouseEnter={() => setOnButton(true)}
                      onMouseLeave={() => setOnButton(false)}
                      onClick={() => {
                        setOnCard(false);
                      }}
                    />
                  )}
                  updateState={updateState}
                  name={name}
                  color={color}
                  id={id}
                  parent={parent}
                />
                <Button
                  icon="delete"
                  onMouseEnter={() => setOnButton(true)}
                  onMouseLeave={() => setOnButton(false)}
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
        <Card.Description>
          {desc}
          <Button
            icon={open ? 'hide' : 'eye'}
            size="mini"
            floated="right"
            onClick={() => {
              setOpen(false);
            }}
          />
        </Card.Description>
        {GetComments()}
      </Card.Content>
    </Card>
  );
};

export default Task;
