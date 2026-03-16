import React from 'react'

const AddTask = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

            <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center"> Add New Task </h1>

                <form className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1">  Title </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter task title"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="text-sm font-medium text-gray-700 mb-1"> Description </label>
                        <textarea
                            name="description"
                            placeholder="Enter task description"
                            rows="4"
                            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 rounded-md font-medium hover:bg-blue-600 transition duration-200"
                    >
                        Add New Task
                    </button>

                </form>
            </div>

        </div>
    )
}

export default AddTask