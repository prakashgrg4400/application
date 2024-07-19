import React, { useState } from "react";
import { useTodo } from "../context/TodoProvider";
import TodoItem from "./TodoItem";
import { memo } from "react";

function TodoList() {
    const { todoTask } = useTodo();
    const filterType = [
        { type: "All", id: 1 },
        { type: "Active", id: 2 },
        { type: "Completed", id: 3 },
    ];

    const [listBy, setListBy] = useState("All");

    const handleOptions = (e) => {
        setListBy(e.target.value);
    };

    //=======>  Filtering logic here
    const filteredTodos = todoTask.filter((todo) => {
        if (listBy === "All") return true;
        if (listBy === "Active") return !todo.completed;
        if (listBy === "Completed") return todo.completed;
    });
    //================================
    return (
        <>
            <h2 className="mt-8 text-xl font-medium text-gray-500 underline">
                My Todos List :{" "}
            </h2>
            <div className="flex justify-end gap-2">
                <span>Filter : </span>
                <select
                    className="outline-none border-2 border-gray-400 rounded-md"
                    name="filterBy"
                    id=""
                    // value={listBy}
                    onChange={handleOptions}
                >
                    {filterType.map((opt) => {
                        return (
                            <option key={opt.id} value={opt.type}>
                                {opt.type}
                            </option>
                        );
                    })}
                </select>
            </div>
            <div className="p-4 flex flex-wrap gap-6 h-[60vh] overflow-auto shadow-md">
                {filteredTodos.length === 0 ? (
                    <p className="text-2xl font-bold m-auto opacity-20">
                        Your Todos will be displayed here
                    </p>
                ) : (
                    filteredTodos.map((todo) => {
                        return <TodoItem {...todo} key={todo.id} />;
                    })
                )}
            </div>
        </>
    );
}

export default memo(TodoList);
