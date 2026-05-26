import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const getToken = () => localStorage.getItem('authToken')

const AddTask = () => {

    const [taskData, setTaskData] = useState();
    const navigate = useNavigate();

    const HanddleAddTask = async () => {
        try {
            let result = await fetch(import.meta.env.VITE_API_URL + '/add-task', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + getToken()
                },
                credentials: 'include',
                body: JSON.stringify(taskData)
            })
            result = await result.json()
            if (result.success) {
                navigate('/')
            } else {
                alert(result.msg || result.message || 'Try after Sometime')
            }
        } catch (error) {
            console.error("Add task error:", error);
            alert("Could not connect to server");
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 md:p-6">

            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6 md:p-8">
                <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 text-center">
                    Add New Task
                </h1>

                <section className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            onChange={(event) => setTaskData({ ...taskData, title: event.target.value })}
                            type="text"
                            name="title"
                            placeholder="Enter task title"
                            className="border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            onChange={(event) => setTaskData({ ...taskData, description: event.target.value })}
                            name="description"
                            placeholder="Enter task description"
                            rows="4"
                            className="border border-gray-300 rounded-md px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base resize-none"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        onClick={HanddleAddTask}
                        className="bg-blue-500 cursor-pointer text-white py-2.5 rounded-md font-medium hover:bg-blue-600 transition duration-200 text-sm md:text-base"
                    >
                        Add New Task
                    </button>

                </section>
            </div>

        </div>
    )
}

export default AddTask