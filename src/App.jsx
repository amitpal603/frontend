import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Header/Navbar"
import GetAllTodo from "./components/GetAllTodo"
import Pending from "./components/Pending"
import CreateTodo from "./components/CreateTodo"
import Complete from "./components/Complete"
import TaskStatus from "./components/TaskStatus"
import NotFound from "./components/NotFound"

function App() {
  
  return (
    <div>
    <Navbar/>

    <Routes>
      <Route path="/" element={<GetAllTodo/>}/>
      <Route path="/pending" element={<Pending/>}/>
      <Route path="/create/:id" element={<CreateTodo/>}/>
      <Route path="/complete" element={<Complete/>}/>
      <Route path="/status" element={<TaskStatus/>}/>
      <Route path="/create" element={<CreateTodo/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
    </div>
  )
}

export default App
