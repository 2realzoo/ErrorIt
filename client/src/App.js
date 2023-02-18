import "./styles/colors.css";
import "./styles/stack.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Question from "./pages/Question";
import Footer from "./components/Footer";

import SignUp from "./pages/SignUp";
import CheckUser from "./pages/CheckUser";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/question" element={<Question />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/check-user" element={<CheckUser />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
