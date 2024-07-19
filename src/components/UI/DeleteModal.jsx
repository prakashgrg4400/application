import React from "react";
import { createPortal } from "react-dom";
import { useTodo } from "../../context/TodoProvider";

function DeleteModal({ id, setModals , title }) {
  const {deleteTodo} = useTodo();

  //==> this will handle deleting our data as it will lead us to "TodoProvider"
  const handleDelete = ()=>{
     deleteTodo(id);
  }
    return createPortal(
        <>
            <div
                className="modalBackdrop"
                onClick={() => {
                    setModals((prevModal) => ({ ...prevModal, delete: false }));
                }}
            ></div>
            <div className="modalContent">
                <div className="h-[100%] w-[100%] py-2 px-6 flex flex-col justify-center items-center gap-8 ">
                    <h2 className="text-center text-2xl underline">
                        Are you sure? You want to delete this todo
                    </h2>
                    <p className="text-lg font-bold">"  {title}  "</p>
                    <div className="flex w-[100%]  flex-col gap-4 sm:flex-row sm:justify-center sm:gap-16 ">
                      <button className="btn bg-red-500 hover:bg-red-600" onClick={handleDelete}>Delete</button>
                      <button className="btn bg-gray-600" onClick={()=>{setModals(prev=>({...prev,delete:false}))}}>Cancel</button>
                    </div>
                </div>
            </div>
        </>,
        document.getElementById("modal")
    );
}

export default DeleteModal;
