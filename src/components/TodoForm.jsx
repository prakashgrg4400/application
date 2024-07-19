import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTodo } from "../context/TodoProvider";
import { RxCross1 } from "react-icons/rx";
import { toast } from "react-toastify";

function TodoForm({ setShowInputModal }) {
    const { addNewTodo, dispatch } = useTodo();

    //!==>  Creating schema and handeling form validation using refine
    const schema = z.object({
        newTodo: z.string().refine((data) => data.trim().length > 0, {
            message: "Input field is Empty !! Please fill above input field",
        }),
    });

    //!==>  Using "react-hook-form" to handle form data, and connecting with "zod" using "resolver" .
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm({
        resolver: zodResolver(schema),
    });

    //!==>  Adding our new todo .
    const handleData = (data) => {
        const newTodo = {
            id: crypto.randomUUID(),
            title: data.newTodo,
            completed: false,
        };
        addNewTodo(newTodo);
        toast.info("Your new todo is added successfully!")
    };

    //!==>  Resetting the form after submission is successful
    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({ newTodo: "" });
        }
    }, [formState]);

    return (
        <div className="h-[100%] w-[100%] py-8 px-6 ">
            <RxCross1
                className="ml-auto hover:cursor-pointer"
                onClick={() => {
                    setShowInputModal(false);
                }}
                size="1.5rem"
            />
            <h1 className="text-center text-2xl m-4 mt-10">Add New Todo</h1>
            <form
                action=""
                onSubmit={handleSubmit(handleData)}
                className=" px-4 pt-4 flex md:flex-row flex-col gap-4"
            >
                <input
                    placeholder="Your new todo here"
                    type="text"
                    {...register("newTodo")}
                    className="border-solid border-black border-[2px] outline-none text-4 p-2 rounded-xl flex-1"
                    autoComplete="off"
                />
                <button type="submit" className="btn mx-2">
                    Add
                </button>
            </form>
            {/* ======> Handeling error messages below */}
            {errors.newTodo && (
                <p className="px-4 text-red-600">{errors.newTodo.message}</p>
            )}
        </div>
    );
}

export default TodoForm;
