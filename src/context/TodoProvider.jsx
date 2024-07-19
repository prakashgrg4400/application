import React, { useReducer, useState } from "react";
import { createContext } from "react";
import { useContext } from "react";

const initialItems = [
    // { id: 1, title: "Learn DSA", completed: false },
    // { id: 2, title: "Practice react", completed: false },
    // { id: 3, title: "Wake up early in the morning", completed: false },
    // { id: 4, title: "Call your friend at 7am", completed: false },

];

const TodoContext = createContext();//==> creating context


//================= reducer function =================
function reducer(state, action) {
    if(action.type==="ADD_NEW_TODO")//==>  this will deal with adding new todo
    {
        return [...state , action.payload];
    }else if(action.type==="UPDATE_TODO")//===> this will deal with updating our existing todo
    {
        return state.map(todo=>{
            if(todo.id===action.payload.id)
            {
                return {...todo , title:action.payload.updateTodo}
            }
            return todo;
        })
    }
    else if(action.type==="DELETE_TODO")//===> this will deal with deleting our todo
    {
        return state.filter((todo)=>todo.id!==action.payload)
    }
    else if(action.type==="TOGGLE_TODO")//===> this will deal with , wheteher our todo is completed or not .
    {
        return state.map(todo=>{
            if(todo.id===action.payload)
            {
                return {...todo , completed:!todo.completed}
            }
            return todo ;
        })
    }
    return state;
}

//!=============== component =========================
function TodoProvider({ children }) {
    const [todoTask, dispatch] = useReducer(reducer, initialItems);

    const addNewTodo = (newTask) => {
        dispatch({
            type:"ADD_NEW_TODO",
            payload:newTask
        })
    };

    const deleteTodo = (id) => {
        dispatch({
            type:"DELETE_TODO",
            payload:id
        })
    };

    const toggleTodo = (id) => {
        dispatch({
            type:"TOGGLE_TODO",
            payload:id
        })
    };

    const updateTodo = (id , updatedTodo) => {
        dispatch({
            type:"UPDATE_TODO",
            payload:{id:id , updateTodo:updatedTodo}
        })
    };
    return (
        <TodoContext.Provider
            value={{
                todoTask,
                dispatch,
                addNewTodo,
                deleteTodo,
                toggleTodo,
                updateTodo,
            }}
        >
            {children}
        </TodoContext.Provider>
    );
}

//==> instead of importing "usecontext" and "TodoContext" in every component, we can directly use this function.
export function useTodo() {
    return useContext(TodoContext);
}

export default TodoProvider;
