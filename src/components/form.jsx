import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faRotateLeft,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const Form = () => {
  let myLocalStorage = "todo list";

  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    const list = JSON.parse(localStorage.getItem(myLocalStorage));
    if (list) setTodoList((prevTodos) => [...prevTodos, ...list]);
  }, [myLocalStorage]);

  useEffect(() => {
    localStorage.setItem(myLocalStorage, JSON.stringify(todoList));
  }, [todoList, myLocalStorage]);

  function toggle(id) {
    const newTodos = [...todoList];
    const data = newTodos.find((todo) => todo.id === +id.target.id);
    data.isComplete = !data.isComplete;
    if (!data.isComplete) {
      newTodos.sort((a, b) => b.id - a.id);
    }
    newTodos.sort((a, b) => a.isComplete - b.isComplete);
    setTodoList(newTodos);
  }

  function deleteTodo(id) {
    const newTodos = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodos);
  }

  const formSubmit = (e) => {
    e.preventDefault();
    if (todo.length === 0) {
      return;
    }
    setTodoList([
      { id: Date.now(), task: todo, isComplete: false },
      ...todoList,
    ]);
    e.target.reset();
  };

  const formHandler = (e) => {
    setTodo(e.target.value);
  };

  return (
    <>
      <div className="form-group">
        <form onSubmit={formSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Enter item"
            onChange={formHandler}
          />
          <button type="submit" className="toDoButton">
            Add
          </button>
        </form>
      </div>
      <div>
        {todoList.map((todoItem) => {
          return (
            <ul className="list-container" key={todoItem.id}>
              <li>
                {!todoItem.isComplete ? (
                  <h2>{todoItem.task}</h2>
                ) : (
                  <h2 className="todo-list-done">{todoItem.task}</h2>
                )}
              </li>
              <li>
                <FontAwesomeIcon
                  type="button"
                  id={todoItem.id}
                  onClick={toggle}
                  className="font-awesome__icon"
                  icon={!todoItem.isComplete ? faCheck : faRotateLeft}
                />
                {todoItem.isComplete && (
                  <FontAwesomeIcon
                    id={todoItem.id}
                    onClick={() => deleteTodo(todoItem.id)}
                    className="font-awesome__icon"
                    icon={faTrash}
                  />
                )}
              </li>
            </ul>
          );
        })}
      </div>
    </>
  );
};

export default Form;
