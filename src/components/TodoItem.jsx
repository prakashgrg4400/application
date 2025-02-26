import React, { useState } from "react";
import EditModal from "./UI/EditModal";
import DeleteModal from "./UI/DeleteModal";
import { MdOutlineDone } from "react-icons/md";
import { useTodo } from "../context/TodoProvider";


function TodoItem({ id, title, completed }) {
  const {toggleTodo} = useTodo();

    const [modals, setModals] = useState({
        edit: false,
        delete: false,
    });

    const handleEditModal = ()=>{
         setModals(prevModal=>{
          return {...prevModal , edit:true }
         })
    }
    const handleDeleteModal = ()=>{
         setModals(prevModal=>{
          return {...prevModal , delete:true}
         })
    }
    const handleToggle = ()=>{
        toggleTodo(id);
    }

    return (
      <>
        <div className="border-gray md:w-[45%] lg:w-[23%] border-2 border-solid h-[45%] shadow-md p-1 flex justify-around items-center flex-col flex-wrap hover:scale-[1.03] transition-all duration-150 ease-linear flex-grow">
            <p className={`text-center text-lg font-bold ${completed?"line-through opacity-30":""}`}>{title}</p>
            <div className="flex flex-wrap gap-1 ">
                <button className="btn text-xs  bg-gray-600" onClick={handleEditModal}>Edit</button>
                <button className="btn text-xs  bg-red-500 hover:bg-red-600" onClick={handleDeleteModal}>Delete</button>
                <button className="btn text-xs bg-green-700 hover:bg-green-800" onClick={handleToggle}><MdOutlineDone size="15px" /></button>
            </div>
        </div>

        {modals.edit && (
          <EditModal id={id} setModals={setModals} title={title}>
          </EditModal>
        ) }
        {modals.delete && (
          <DeleteModal setModals={setModals} id={id} title={title}>
          </DeleteModal>
        ) }
      </>
    );
}
// #2c3e50

export default TodoItem;
