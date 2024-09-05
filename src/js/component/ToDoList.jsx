import React, { useEffect, useState } from "react";

const ToDoListApp = () => {
    const [todoList, setTodoList] = useState([])

    const deletetask = (index) => {
        fetch(`https://playground.4geeks.com/todo/todos/${todoList[index].id}`, {
            method: "DELETE",
        })
            .then(resp => {
                updateTodoList()
                console.log(resp.ok);
                console.log(resp);
            })
    }

    const updateTodoList = () => {
        fetch('https://playground.4geeks.com/todo/users/fgamester')
            .then((response) => {
                return response.json()
            })
            .then((newresponse) => {
                setTodoList(newresponse.todos)
            })

    }

    const addTask = (target) => {
        const newTask = {
            label: target.value,
            is_done: false
        }
        target.value = ""

        fetch('https://playground.4geeks.com/todo/todos/fgamester', {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(resp => {
                return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
            })
            .then(() => {
                updateTodoList()
            })
            .catch(error => {
                console.log(error);
            })

    }

    const itemsHtml = todoList.length > 0 ? todoList.map((item, index) => (
        <li key={index} className="list-group-item d-flex justify-content-between align-items-center bg-light customOpacity-2 onpointer">
            {item.label} <i className="fa-regular fa-trash-can" onClick={() => deletetask(index)}></i>
        </li>
    )) : (
        <li className="list-group-item text-center bg-light customOpacity-2">
            <i className="fa-solid fa-arrow-up me-2"></i>
            There is no tasks in the list, try to add one...
            <i className="fa-solid fa-arrow-up ms-2"></i>
        </li>
    );

    useEffect(() => {
        updateTodoList();
    }, []);

    return (
        <div>
            <div className="d-flex justify-content-center mt-5 opacity-75">
                <h1 className="text-muted display-1 bg-light col-11 col-sm-8 col-md-6 col-lg-5 col-xxl-4 rounded-4">
                    <i className="fa-solid fa-list display-3" />t<i className="fa-regular fa-circle-check display-5" />d<i className="fa-regular fa-circle-check display-5" />
                </h1>
            </div>
            <div className="listDiv d-flex justify-content-center">
                <ul className="list-group col-11 col-sm-8 col-md-6 col-lg-5 col-xxl-4 mb-3">
                    <li className="list-group-item customOpacity-1">
                        <input onKeyUp={(e) => (e.target.value !== "" && e.key == "Enter") && addTask(e.target)}
                            className="todoInput" type="text" placeholder="What needs to be done?" />
                    </li>
                    {itemsHtml}
                </ul>
            </div>
        </div>
    );
}

export default ToDoListApp;