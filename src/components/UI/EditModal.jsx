import React from "react";
import { createPortal } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodo } from "../../context/TodoProvider";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

function EditModal({ children, setModals, title, id }) {

  const {updateTodo} = useTodo();

  //!====>  creating schema using zod
    const schema = z.object({
        myTodo: z
            .string()
            .refine((value) => value.trim().length > 0, {
                message: "You cannot leave the input field empty!!!",
            }),
    });

    //!===> connecting zod with react-hook-form with the help of "zodResolver" .
    const {
        register,
        handleSubmit, 
        formState: { errors },
    } = useForm({
       defaultValues:{
        myTodo:title
       },
        resolver: zodResolver(schema),
    });

    //!===> Handeling form submission and updation "todo"
    const handleData = (data) => {
        updateTodo(id , data.myTodo)
        toast.info("Your todo is updated successfully");
    };
    return createPortal(
        <>
            <div
                className="modalBackdrop"
                onClick={() => {
                    setModals((preModal) => ({ ...preModal, edit: false }));
                }}
            ></div>
            <div className="modalContent">
                <div className="h-[100%] w-[100%] py-2 px-6 ">
                <RxCross1 className="ml-auto hover:cursor-pointer" onClick={()=>{setModals(prev=>({...prev,edit:false}))}} size="1.3rem" />
                    <h2 className="text-center text-2xl m-4">
                        Update Your Todo
                    </h2>
                    <form
                        action=""
                        className=" px-4 pt-4 flex flex-col gap-4"
                        onSubmit={handleSubmit(handleData)}
                    >
                        <textarea
                            id=""
                            className="border-solid border-black border-[2px] basis-[100px] outline-none text-4 p-2 rounded-xl flex-1"
                            {...register("myTodo")}
                        ></textarea>
                        {/* ===> Below code will handle error messages */}
                        {errors.myTodo && (
                            <p className="px-4 text-red-600">
                                {errors.myTodo.message}
                            </p>
                        )}
                        <button className="btn">Update</button>
                    </form>
                </div>
            </div>
        </>,
        document.getElementById("modal")
    );
}

export default EditModal;
