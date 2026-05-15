import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const getToken = () => localStorage.getItem('authToken')

const List = () => {

    const [taskData, setTaskData] = useState([]);
    const [selectedTask, setSelectedTask] = useState([])

    useEffect(() => {
        getListData();
    }, []);

    const getListData = async () => {
        let list = await fetch(import.meta.env.VITE_API_URL + '/tasks', {
            credentials: 'include',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        list = await list.json();
        if (list.success) {
            setTaskData(list.result);
        } else {
            alert("Try after sometime")
        }
    };

    const deleteTask = async (id) => {
        let item = await fetch(import.meta.env.VITE_API_URL + '/delete/' + id, {
            method: 'delete',
            credentials: 'include',
            headers: { 'Authorization': 'Bearer ' + getToken() }
        });
        item = await item.json();
        if (item.success) {
            getListData();
        } else {
            alert("Try after sometime")
        }
    };

    const selectAll = (event) => {
        if (event.target.checked) {
            let items = taskData.map((item) => item._id)
            setSelectedTask(items)
        } else {
            setSelectedTask([])
        }
    }

    const selectSingleItem = (id) => {
        if (selectedTask.includes(id)) {
            let items = selectedTask.filter((item) => item != id)
            setSelectedTask(items)
        } else {
            setSelectedTask([id, ...selectedTask])
        }
    }

    const DeleteMultiple = async () => {
        let item = await fetch(import.meta.env.VITE_API_URL + '/delete-multiple', {
            credentials: 'include',
            method: 'delete',
            body: JSON.stringify(selectedTask),
            headers: {
                'Content-Type': 'Application/Json',
                'Authorization': 'Bearer ' + getToken()
            }
        });
        item = await item.json();
        if (item.success) {
            getListData();
        } else {
            alert("Try after sometime")
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">

            <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-4 md:p-6">

                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    Todo List
                </h1>

                {/* Delete Selected Button */}
                {selectedTask.length > 0 && (
                    <button
                        onClick={DeleteMultiple}
                        className='mb-4 bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition duration-200 cursor-pointer'
                    >
                        Delete Selected ({selectedTask.length})
                    </button>
                )}

                {/* ─── Desktop Table ─── */}
                <div className="hidden md:block overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="p-3 w-16 border-r text-center">
                                    <input onChange={selectAll} type="checkbox" />
                                </th>
                                <th className="p-3 w-16 border-r text-center">S.No</th>
                                <th className="p-3 w-40 border-r text-left">Title</th>
                                <th className="p-3 border-r text-left">Description</th>
                                <th className="p-3 w-40 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taskData && taskData.map((item, index) => (
                                <tr key={item._id} className="border-b hover:bg-gray-50">
                                    <td className="p-3 border-r text-center">
                                        <input
                                            onChange={() => selectSingleItem(item._id)}
                                            checked={selectedTask.includes(item._id)}
                                            type="checkbox"
                                        />
                                    </td>
                                    <td className="p-3 border-r text-center">{index + 1}</td>
                                    <td className="p-3 border-r font-medium">{item.title}</td>
                                    <td className="p-3 border-r text-gray-600">{item.description}</td>
                                    <td className="p-3">
                                        <div className="flex justify-center gap-3">
                                            <button
                                                onClick={() => deleteTask(item._id)}
                                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition duration-200 cursor-pointer"
                                            >
                                                Delete
                                            </button>
                                            <Link to={"update/" + item._id}>
                                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1.5 rounded-md text-sm transition duration-200 cursor-pointer">
                                                    Update
                                                </button>
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* ─── Mobile Cards ─── */}
                <div className="md:hidden space-y-3">

                    {/* Select All on mobile */}
                    <div className="flex items-center gap-2 pb-2 border-b">
                        <input onChange={selectAll} type="checkbox" />
                        <span className="text-sm text-gray-600 font-medium">Select All</span>
                    </div>

                    {taskData && taskData.map((item, index) => (
                        <div
                            key={item._id}
                            className="border rounded-lg p-4 bg-gray-50 shadow-sm space-y-2"
                        >
                            {/* Top row: checkbox + serial */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <input
                                        onChange={() => selectSingleItem(item._id)}
                                        checked={selectedTask.includes(item._id)}
                                        type="checkbox"
                                    />
                                    <span className="text-xs text-gray-400">#{index + 1}</span>
                                </div>
                            </div>

                            {/* Title */}
                            <p className="font-semibold text-gray-800">{item.title}</p>

                            {/* Description */}
                            <p className="text-sm text-gray-600">{item.description}</p>

                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-1">
                                <button
                                    onClick={() => deleteTask(item._id)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-1.5 rounded-md text-sm transition duration-200"
                                >
                                    Delete
                                </button>
                                <Link to={"update/" + item._id} className="flex-1">
                                    <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-1.5 rounded-md text-sm transition duration-200">
                                        Update
                                    </button>
                                </Link>
                            </div>

                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {taskData.length === 0 && (
                    <p className="text-center text-gray-400 mt-6">No tasks found. Add one!</p>
                )}

            </div>

        </div>
    )
}

export default List