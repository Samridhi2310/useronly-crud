"use client";
import axios from "axios";
import { useEffect, useState } from "react";

function Createform() {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState([]);

  
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/getallusers");
      setUsers(res.data.user); 
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

 
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
       
        const res = await axios.put(
          `http://localhost:5000/api/updateuser/${editId}`,
          data
        );
        if (res.status === 200) {
          setMessage("User updated successfully");
        } else {
          setError("Failed to update user");
        }
      } else {
      
        const res = await axios.post(
          "http://localhost:5000/api/createuser",
          data
        );
        if (res.status === 200) {
          setMessage("User created successfully");
        } else {
          setError("Failed to create user");
        }
      }

      fetchUsers();
      setData({ name: "", email: "", password: "" });
      setEditId(null);
      setError("");
    } catch (err) {
      console.log("Submit error:", err);
      setError("Server error");
    }
  };

  
  const handleEdit = (user) => {
    setData({
      name: user.name,
      email: user.email,
      password: user.password,
    });
    setEditId(user._id);
    setMessage("");
    setError("");
  };


  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/deleteuser/${id}`
      );
        setMessage("User deleted successfully");
        setError("");
        fetchUsers();
    } catch (err) {
      console.log("Delete error:", err);
      setError("Server error");
    }
  };

  return (
    <div className="h-auto min-h-screen bg-blue-950 p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-300 w-full md:w-1/2 mx-auto space-y-4 p-6 rounded"
      >
        <h1 className="text-xl font-bold text-center">aapka form</h1>
        <input
          placeholder="Name"
          className="p-2 block w-full border border-gray-500 rounded"
          name="name"
          value={data.name}
          onChange={handleChange}
        />
        <input
          placeholder="Email"
          className="p-2 block w-full border border-gray-500 rounded"
          name="email"
          value={data.email}
          onChange={handleChange}
        />
        <input
          placeholder="Password"
          className="p-2 block w-full border border-gray-500 rounded"
          name="password"
          value={data.password}
          onChange={handleChange}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editId ? "Update User" : "Create User"}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
      </form>

      <h2 className="text-white text-center mt-8 text-2xl">Users List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        {users.map((user) => (
          <div

            key={user._id}
            className="border border-white p-4 rounded text-white bg-gray-800"
          >
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Password:</strong> {user.password}</p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-green-500 px-2 py-1 rounded hover:bg-green-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user._id)}
                className="bg-red-500 px-2 py-1 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Createform;
