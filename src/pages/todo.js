import React, { useState } from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, completeTodo, fetchTodo } from "../actions";

const Input = styled.input`
  height: 60px;
  font-size: 15px;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;
  background: #f7f1f1;
  border: none;
`;
const Container = styled.div`
  margin: 20px auto;
  min-height: 300px;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  padding: 50px;
  background: #ff6666;
  -webkit-box-shadow: 10px 10px 0px 0px rgba(247, 241, 241, 1);
  -moz-box-shadow: 10px 10px 0px 0px rgba(247, 241, 241, 1);
  box-shadow: 10px 10px 0px 0px rgba(247, 241, 241, 1);
`;
const Heading = styled.h1`
  font-size: 50px;
  margin: 0;
  padding: 0;
  color: #f7f1f1;
`;
const Button = styled.button`
  background: transparent;
  color: #f7f1f1;
  height: 60px;
  width: 150px;
  border: 1px solid #f7f1f1;
  cursor: pointer;
`;
const DelButton = styled(Button)`
  width: 35px;
  height: 35px;
  font-size: 22px;
  transition: all 0.2s ease;
  &:hover {
    border: 1px solid black;
    color: black;
  }
`;
const Form = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;
const List = styled.ul`
  margin: 50px;
  padding: 0;
  margin: 0;
  list-style: none;
`;
const Item = styled.li`
  padding: 20px 10px;
  background: #ff7676;
  border-bottom: 1px solid #f7f1f1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Par = styled.p`
  font-size: 18px;
  margin: 0;
  padding: 0;
  color: #f7f1f1;
`;
const Checkbox = styled.input`
  height: 30px;
  width: 30px;
  background: red;
  cursor: pointer;
  margin-right: 10px;
`;
const Wrap = styled.span`
  display: flex;
  align-items: center;
`;
const Complete = styled.s`
  color: gray;
`;
const Alert = styled.h4`
  color: #f7f1f1;
`;
function Todo() {
  const [singleTodo, setSingleTodo] = useState("");
  const todos = useSelector((state) => state);
  const dispatch = useDispatch();

  React.useEffect(() =>{
    dispatch(fetchTodo())
  },[dispatch])

 
  const handleChange = (e) => {
    setSingleTodo(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todos.length < 10) {
      const objTodo = {
        id: todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        title: singleTodo,
        completed: false,
      };
      dispatch(addTodo(objTodo));
      setSingleTodo("");
    }
  };
  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };
  const handleComplete = (todoObj) => {
    dispatch(completeTodo(todoObj));
  };

  return (
    <Container>
      <Heading>Todo List</Heading>
      <Par>Get things done max 10 tasks</Par>
      <Form onSubmit={handleSubmit}>
        <Input
          placeholder="Enter todos"
          value={singleTodo}
          onChange={handleChange}
        />
        <Button type="submit">Add item</Button>
      </Form>
      {todos.length >= 10 ? <Alert>You reached max tasks!</Alert> : ""}
      <List>
        {todos.length ? (
          todos.map((todo) => {
            return (
              <Item key={todo.id}>
                <Wrap>
                  <Checkbox
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onClick={() => handleComplete(todo)}
                  />
                  {todo.completed ? (
                    <Complete>{todo.title}</Complete>
                  ) : (
                    <Par>{todo.title}</Par>
                  )}
                </Wrap>
                {todo.completed ? (
                  <DelButton
                    onClick={() => {
                      handleDelete(todo.id);
                    }}
                  >
                    X
                  </DelButton>
                ) : (
                  ""
                )}
              </Item>
            );
          })
        ) : (
          <Alert>All task done!!</Alert>
        )}
      </List>
    </Container>
  );
}
export default Todo;
