import React, { useEffect, useState } from 'react'

const List = () => {

  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    getListData();
  }, []);

  const getListData = async () => {
    let list = await fetch('http://localhost:3200/tasks');
    list = await list.json();

    if (list.success) {
      setTaskData(list.result);
    }
  };

  const deleteTask = async (id) => {
    let item = await fetch('http://localhost:3200/delete/' + id, { method: 'delete' });
    item = await item.json();

    if (item.success) {
      getListData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-xl p-6">

        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Todo List
        </h1>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="p-3 w-16 border-r text-center">S.No</th>
                <th className="p-3 w-40 border-r text-left">Title</th>
                <th className="p-3 border-r text-left">Description</th>
                <th className="p-3 w-28 text-right">Action</th>
              </tr>
            </thead>

            <tbody>
              {taskData && taskData.map((item, index) => (
                <tr key={item._id} className="border-b hover:bg-gray-50">

                  <td className="p-3 border-r text-center">
                    {index + 1}
                  </td>

                  <td className="p-3 border-r font-medium">
                    {item.title}
                  </td>

                  <td className="p-3 border-r text-gray-600">
                    {item.description}
                  </td>

                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteTask(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-md text-sm transition duration-200 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>

    </div>
  )
}

export default List