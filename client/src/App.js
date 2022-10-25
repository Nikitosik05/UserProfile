import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./redux/action/userActions";


function App() {
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const request = async () => dispatch(checkAuth(token))
      request().then(() => {
        setIsLoading(false)
      })
    } else {
      setIsLoading(false)
    }

  }, [])

  if (isLoading) {
    return 'Loading...'
  }

  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </div>
    </BrowserRouter>

  );
}

export default App;
