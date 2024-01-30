"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSolidTrash } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface TodoListProps {
  title: string;
  _id: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<TodoListProps[]>([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    const headers = {
      "Content-Type": "application/json",
    };

    axios
      .get("http://localhost:8000/api/todo", {
        headers,
        withCredentials: true,
      })
      .then((res) => {
        setTodos(res.data);
      });
  }, []);

  const handleCheckboxChange = async (id: string) => {
    try {
      const updatedTodos = todos.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      );

      setTodos(updatedTodos);

      const headers = {
        "Content-Type": "application/json",
      };

      // Güncellenmiş todo'yu backend'e gönderme
      await axios.patch(
        `http://localhost:8000/api/todo/${id}/checked`,
        {
          completed: updatedTodos.find((todo) => todo._id === id)?.completed,
        },
        {
          headers,
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error during Axios request:", error);
    }
  };

  const handleKeyPress = async (event: { key: string }) => {
    if (event.key === "Enter") {
      try {
        if (newTodo.length < 5) {
          toast.error("En az 5 karakter girmelisiniz", {
            position: "bottom-right",
          });
          return;
        }

        const headers = {
          "Content-Type": "application/json",
        };

        const response = await axios.post(
          "http://localhost:8000/api/todo",
          {
            title: newTodo,
          },
          {
            headers,
            withCredentials: true,
          }
        );

        setTodos((prevTodos) => [...prevTodos, response.data]);

        setNewTodo("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const headers = {
        "Content-Type": "application/json",
      };

      // Backend'e delete isteği gönderme
      await axios.delete(`http://localhost:8000/api/todo/${id}`, {
        headers,
        withCredentials: true,
      });

      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error during Axios request:", error);
    }
  };

  return (
    <div className="container flex flex-col">
      <div className="flex justify-center">
        <h1 className="mt-16 text-2xl font-bold text-orange-600">
          💪 My TODOS
        </h1>
      </div>

      <div className="mt-10 w-6/12 mx-auto">
        <div className="flex flex-col">
          <ul>
            {todos.map((todo) => (
              <li id={todo._id} className="flex items-center justify-start">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={todo.completed}
                  onChange={() => handleCheckboxChange(todo._id)}
                />
                <span
                  className={
                    todo.completed ? "text-lg line-through" : "text-lg"
                  }
                >
                  {todo.title}
                </span>
                <BiSolidTrash onClick={() => handleDeleteTodo(todo._id)} />
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <input
              className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md py-2 px-2 shadow-sm focus:outline-none focus:border-slate-300 sm:text-sm"
              placeholder="Todo ekleyin..."
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
