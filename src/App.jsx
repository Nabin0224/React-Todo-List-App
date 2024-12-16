import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import "./App.css"



import Navbar from "./components/Navbar";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true )

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let parsedtodo = JSON.parse(localStorage.getItem("todos"))
    setTodos(parsedtodo); 
    }
  }, [])
  

  const handleToggle = (e)=>{
     setshowFinished(!showFinished)
  }

  const saveToLs = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
   
  };

  const handleCheck = (e) => {
    let id = e.target.name;
    let newTodos = todos.map((item) => {
      return item.id === id ? { ...item, isCompleted: !item.isCompleted } : item;
    });
    
    setTodos(newTodos);
    
    
  };
  const handleAdd = () => {
    setTodos([...todos, { todo, id: uuidv4(), isCompleted: false }]);
    saveToLs();
    setTodo("");
    
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);

    let newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
    saveToLs()
    
  };

  const handleDelete = (e) => {
    let id = e.target.name;
    let newTodos = todos.filter((item) => item.id !== id);
    setTodos([...newTodos]);
    saveToLs()
   
  };
  return (
    <>
      <Navbar />
      <div className="md: container mx-auto bg-violet-100 my-5 p-5 rounded-xl min-h-[80vh] md:w-1/2">
      <h1 className="font-bold text-center text-xl">iTask- Manage your tasks at one place</h1>
        <div className="addtodo my-8">
          <h2 className="text-lg font-bold">Add a Todo</h2>

          <input
            onChange={handleChange}
            value={todo}
            type="text"
            className="w-full rounded-lg px-3 py-1 mt-4"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length<3 }
            className="bg-violet-700 hover:bg-violet-800 text-white rounded-md p-1 px-2 mt-3 text-sm font-bold w-full"
          >
            Save
          </button>
        </div>

        <input className={"text-sm mb-4"} onChange={handleToggle} type="checkbox" checked={showFinished} /> Show Finished
        <h2 className="text-lg font-bold">Your Todos</h2>

        {todos.length === 0 && (
          <div className="mx-4 text-md font-bold">No Todos to Display</div>
        )}

        {todos.map((item) => {
          return ( ( showFinished || !item.isCompleted) &&
            <div key={item.id} className="todos my-2">
              <div className="todo flex  justify-between">
                <div className="flex gap-2">
                  <input
                    className="m-2 p-1"
                    onChange={handleCheck}
                    type="checkbox"
                    name={item.id}
                    checked ={item.isCompleted}
                  />
                  <div className={item.isCompleted ? "line-through" : "item.todo"}>
                    {item.todo}
                  </div>
                </div>
                <div className="button">
                  <button
                    onClick={(e) => handleEdit(e, item.id)}
                    name={item.id}
                    className="bg-violet-700 hover:bg-violet-800 text-white rounded-md p-1 px-1 mx-3 text-sm font-bold"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={handleDelete}
                    name={item.id}
                    className="bg-violet-700 hover:bg-violet-800 text-white rounded-md p-1 px-1  mx-3 text-sm font-bold"
                  >
                    Del
                    {/* <FaDeleteLeft /> */}

                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
