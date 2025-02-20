import Home from './pages/Home'
import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <div>
      <BrowserRouter basename={import.meta.env.DEV ? "/" : "reaction-button-app"}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
