import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Question from "./pages/Question";
import Footer from "./components/Footer";
import "./styles/colors.css";
import "./styles/stack.css";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<Question />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
