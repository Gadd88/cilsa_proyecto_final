import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeView } from "./views/home/home-view";
import { BooksView, OrdersView, TasksView } from "./views";
import { Footer, Navbar } from "./components";
import { BookProvider } from "./context/books-context";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path="/tareas" element={<TasksView />} />
            <Route path="/pedidos" element={<OrdersView />} />
            <Route path="/libros" element={
              <BookProvider><BooksView /></BookProvider>} />
            {/* <Route path="/perfil" element={<ProfileView/>} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
