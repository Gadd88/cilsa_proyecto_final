import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { HomeView } from './views/home/home-view'
import { BooksView, OrdersView, TasksView, ProfileView } from './views'
import { Footer, Navbar } from './components'


function App() {
  
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeView/>} />
        <Route path="/tareas" element={<TasksView/>} />
        <Route path="/pedidos" element={<OrdersView/>} />
        <Route path="/libros" element={<BooksView/>} />
        <Route path="/perfil" element={<ProfileView/>} />
      </Routes>
      {/* <Footer /> */}
    </BrowserRouter>
  )
}

export default App
