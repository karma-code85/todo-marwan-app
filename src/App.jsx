import { useState } from "react"



export default function App(){
  const [input,setInput]=useState("")
  const [todos, setTodos]=useState([])
  const [filter ,setFilter]=useState('all')

  function handleAdd(){
    if(!input.trim()) return

    const newTodos={
      id:Date.now(),
      text:input,
      completed:false
    }

    setTodos([...todos,newTodos ])
    setInput("")

  }
  function handleDelete(id){
    setTodos(todos.filter(todo=>todo.id !==id))
  }
  // function handleUpdate(id){
  //   setTodos(todos.filter(todo=>todo.id===newTodos))
  // }
  function toggled(id){
    setTodos(
      todos.map(todo=>
        todo.id===id
        ?{...todo, completed:!todo.completed}: todo
      )
    )
  }
  const filterTodos=todos.filter(todo=>{
    if(filter==="active") return !todo.completed
    if(filter==="completed") return todo.completed
    return true
  }


  )

  return(
    <div className="bg-gray-200 min-h-screen ">
      <div className="relative ">
        <img src="/images/bg-mobile-dark.jpg" alt=""  className="w-full md:hidden"/>
        <img src="/images/bg-desktop-light.jpg" alt="" className="hidden md:flex w-full"/>
      </div>
      <div className="p-4 space-y-6 md:w-1/2  ">
      <div className="absolute top-20 justify-between  p-6 items-center flex w-full md:w-1/2">
        <h1 className="text-xl font-extrabold text-white">Todo App</h1>
        <div><img src="/images/icon-moon.svg" alt="" /></div>
      </div>

      <div className="bg-white p-4 shadow-lg rounded-lg  flex  justify-between items-center ">
        <div className="flex gap-4">
        <input type="radio"   className="p-2"/>
        <input type="text"
        placeholder="create a new todo..."
        value={input}
        className="w-full"
        onChange={(e)=>setInput(e.target.value)}
        />
        </div>
        <button className="bg-sky-400 rounded-lg p-2 text-white" onClick={handleAdd}>Add</button>
      </div>
      <div className="space-y-4 bg-white rounded-lg p-4 shadow-xl ">
        {
          todos.length===0?(
            <p className="text-center text-gray-400 ">Not dotos add yets</p>
          ):(
            filterTodos.map((todo)=>(
              <div key={todo.id} className="flex w-full justify-between items-center border-b border-gray-300 space-y-4 ">
                <div className="flex gap-4 ">
          <img src="/images/icon-check.svg" alt="" className={todo.completed?"shadow-xl bg-purple-500 rounded-full p-2" :"bg-sky-500 rounded-full p-2"} onClick={()=>toggled(todo.id)} />
            <p className={todo.completed?"line-through text-gray-400":"" }>{todo.text}</p>
        </div>
        <div><img
  src="/images/icon-cross.svg"
  alt=""
  className="cursor-pointer"
  onClick={() => handleDelete(todo.id)}

/>
</div>

              </div>

            ))
          )
        }

      </div>
      <div className="bg-white p-4 rounded-lg justify-center items-center  gap-4 w-full flex shadow">
        <button onClick={()=>setFilter("all")}  className="hover:text-sky-500 focus:text-sky-500 transition "  >All</button>
        <button onClick={()=>setFilter("active")}  className="hover:text-sky-500 focus:text-sky-500 transition ">Active</button>
        <button onClick={()=>setFilter("completed")}  className="hover:text-sky-500 focus:text-sky-500 transition "> Completed</button>
      </div>
      <h1 className="text-center text-gray-400">drag and drop to reorder list</h1>
      </div>



    </div>
  )
}