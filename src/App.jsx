import './App.scss';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { Home, MealDetails, Error, Category } from "./pages/index";
import Contact from './pages/Contact';
import SingIn from './pages/Auth/SingIn';
import SingUp from './pages/Auth/SingUp';
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal/:id" element={<MealDetails />} />
        <Route path="/meal/category/:name" element={<Category />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/singin" element={<SingIn />} />
        <Route path="/singup" element={<SingUp />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
