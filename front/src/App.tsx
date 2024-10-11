import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomeView } from "./views/home/home-view";
import { AuthView, BooksView, OrdersView, TasksView } from "./views";
import { Footer, Navbar, PrivateRoute } from "./components";

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex-grow overflow-auto">
          <Routes>
            <Route path="/" element={<HomeView />} />
            <Route path='/auth' element={<AuthView/>}></Route>
            <Route path="/tareas" element={<PrivateRoute><TasksView /></PrivateRoute>} />
            <Route path="/pedidos" element={<PrivateRoute><OrdersView /></PrivateRoute>} />
            <Route path="/libros" element={<BooksView/>} />
            {/* <Route path="/perfil" element={<ProfileView/>} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
