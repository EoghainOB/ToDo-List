import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faRotateLeft, faTrash} from "@fortawesome/free-solid-svg-icons";

const Form = () => {

    let myLocalStorage = 'todos'

    const [todo, setTodo] = useState('')
    const [todoList, setTodoList] = useState([])
    
    const allTodos = todoList

    useEffect(() => {
        const list = JSON.parse(localStorage.getItem(myLocalStorage))
        if (list) setTodoList(prevTodos => [...prevTodos, ...list])
        }, [myLocalStorage])

    useEffect (() => {
        localStorage.setItem(myLocalStorage, JSON.stringify(todoList))
        }, [todoList, myLocalStorage])

    function toggle (id) {
        const newTodos = [...todoList]
        const data = newTodos.find(todo => todo.id == id.target.id)
        data.isComplete = !data.isComplete
        if (!data.isComplete) {
            newTodos.sort((a, b) => Number(b.id) - Number(a.id))
        } 
        newTodos.sort((a, b) => Number(a.isComplete) - Number(b.isComplete))
        setTodoList(newTodos)
    }
    
    function deleteTodo (id) {
        const newTodos = todoList.filter(todo => todo.id != id.target.id)
        setTodoList(newTodos)
    }

    const formSubmit = (e) => {
        e.preventDefault()
        if(todo.length === 0) {
            return
        }
        setTodoList([{id: Date.now(), task: todo, isComplete: false}, ...todoList])
        e.target.reset();
    }

    const formHandler = (e) => {
        setTodo(e.target.value)
    }

    return (
        <>
        <div className="form-group">
            <form onSubmit={formSubmit}>
                    <input type="text" className="input-field" placeholder="Enter to do item" onChange={formHandler} />
                    <button type="submit" className="toDoButton" >Add</button>
            </form>
        </div>
        <div>
            {allTodos.map((todoItem) => {
                return (
                <>
                <ul className="list-container" key={todoItem.id}>
                    <ul>
                        <li>{!todoItem.isComplete ? <h2>{todoItem.task}</h2> : <h2 className="todo-list-done">{todoItem.task}</h2>} </li> 
                    </ul>
                    <li>{!todoItem.isComplete ? <FontAwesomeIcon type="button" id={todoItem.id} onClick={toggle} className="font-awesome__icon" icon={faCheck} /> : <FontAwesomeIcon type="button" id={todoItem.id} onClick={toggle} className="font-awesome__icon" icon={faRotateLeft} /> }
                    {todoItem.isComplete ? <FontAwesomeIcon id={todoItem.id} onClick={deleteTodo} className="font-awesome__icon" icon={faTrash} /> : ''} </li>    
                </ul>
                </>
                )
            })}
        </div>
        </>
    )
}

export default Form
