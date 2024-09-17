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
        <Route path="/tasks" element={<TasksView/>} />
        <Route path="/orders" element={<OrdersView/>} />
        <Route path="/books" element={<BooksView/>} />
        <Route path="/profile" element={<ProfileView/>} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
