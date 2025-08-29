import axios from "axios";
import React, { useEffect, useState } from "react";
import Form from "./Form.jsx";

const App = () => {
  const [data, setData] = useState([]);

  const getData = () => {
    return axios.get("https://jsonplaceholder.typicode.com/users");
  };
  const deleteData = (id) => {
    return axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
  };
  // const putData = (itemId) => {
  //   return axios.put(`https://jsonplaceholder.typicode.com/users/${itemId}`);
  // };
  const handleDelete = async (id) => {
    try {
      await deleteData(id);
      const newUpdatedData = data.filter((currElement) => {
        return currElement.id !== id;
      });
      setData(newUpdatedData);
      setData(newUpdatedData);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getData();
        setData(res.data);
        console.log(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Form data={data} setData={setData} />
      <div className="min-h-screen bg-gray-900 text-gray-200 p-8 font-sans">
        <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 text-white tracking-wide">
          User Directory
        </h1>
        <button className=" md:text-2xl font-bold text-center mb-8 text-white tracking-wide hover:text-amber-300">
          AddUser{" "}
        </button>

        {data.length === 0 ? (
          <p className="text-center text-lg text-gray-500 italic">
            No users found.
          </p>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {data.map((item) => {
              const { id, name, username, email } = item;
              return (
                <li key={id}>
                  <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700 hover:border-blue-500 transition-colors duration-300 transform hover:scale-105">
                    <div className="space-y-4 text-sm sm:text-base">
                      <p>
                        <span className="font-semibold text-blue-400">ID:</span>{" "}
                        {id}
                      </p>
                      <p>
                        <span className="font-semibold text-blue-400">
                          Name:
                        </span>{" "}
                        {name}
                      </p>
                      <p>
                        <span className="font-semibold text-blue-400">
                          Username:
                        </span>{" "}
                        {username}
                      </p>
                      <p>
                        <span className="font-semibold text-blue-400">
                          Email:
                        </span>{" "}
                        {email}
                      </p>
                    </div>
                    <div className="mt-6 flex justify-end space-x-4">
                      <button className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800">
                        Edit
                      </button>
                      <button
                        className="px-5 py-2 text-sm font-medium text-white bg-red-600 rounded-full hover:bg-red-700 transition-colors duration-300 shadow-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                        onClick={() => handleDelete(id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default App;
