import { useState } from "react";
import { FaPlus, FaPencilAlt, FaTrash } from "react-icons/fa";

function App() {
  const [todos, setTodos] = useState([{ id: 1, todo: "Learn React" }]);
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(-1);
  //add button pr click krne pr it should add the todo to the array right? to do that we will make a function
  const setEdit = (index) => {
    setInput(todos[index].todo);
    setEditIndex(index);
  };

  const addTodo = async () => {
    //firebase calls ke chkkr m we have made the function asynchronous
    //so try catch will also be added
    try {
      if (input.trim() !== "") {
        setTodos([...todos, { id: new Date(), todo: input }]);
        setInput();
      } //trim so that white spaces are not added
    } catch (error) {
      console.error(error.message);
    }
  };
  const updateTodo = async () => {
    try {
      if (input.trim() !== "") {
        const updatedTodos = [...todos];
        updatedTodos[editIndex].todo = input;
        setTodos(updatedTodos);
        setEditIndex(-1);
        setInput("");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const removeTodo=async(id)=>{
let filteredTodos= todos.filter((todo)=> todo.id !== id);
setTodos(filteredTodos);
  }
  return (
    <div className="min-h-screen flex  flex-col items-center justify-center gap-4 p-4 bg-custom-background bg-center bg-cover">
      <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
        <h1 className="text-3xl font-bold text-center mb-4">Todo App</h1>
        <div className="flex">
          <input
            type="text"
            placeholder="Add a todo"
            className="py-2 px-4 border rounded w-full focus:outline-none mr-2"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            onClick={editIndex === -1 ? addTodo : updateTodo}
            className="bg-gradient-to-r from-blue-400 to to-blue-600 text-white px-4 rounded"
          >
            Add{" "}
          </button>
        </div>
      </div>

      {todos.length > 0 && (
        <div className="bg-gray-100 p-6 rounded shadow-md w-full max-w-lg lg:w-1/4">
          <ul>
            {todos.map((todo, index) => (
              <li
                key={index}
                className="flex items-center justify-between bg-white p-3 rounded shadow-md mb-4"
              >
                <span className="text-lg">{todo.todo}</span>
                <div>
                  <button
                    onClick={() => setEdit(index)}
                    className="mr-2 p-2  bg-gradient-to-r from-gray-400 to-gray-600 text-white rounded hover:from-gray-500 hover:to-gray-900"
                  >
                    <FaPencilAlt />{" "}
                  </button>
                  <button
                    onClick={() => removeTodo(todo.id)}
                    className="p-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded hover:from-red-400 hover:to-red-800"
                  >
                    <FaTrash />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
