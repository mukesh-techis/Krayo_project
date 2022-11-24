import "./App.css";
import Home from "./containers/Home";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import SignUp from "./containers/SignUp";
import SignIn from './containers/Signin'

function App() {
  return (
    
    <BrowserRouter >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={< SignUp />} />
        <Route path='/signin' element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
