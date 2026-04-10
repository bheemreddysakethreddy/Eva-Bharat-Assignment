import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import GitRepos from "./pages/GitRepos"
import Gitprofiles from "./pages/Gitprofiles"
import Navbar from "./pages/Navbar"
import WrapperRoute from "./components/WrapperRoute"
import { useState } from "react"

function App() {
  const [theme, setTheme] = useState("Dark")
  return (
    <div className={`pt-10 ${theme=="Dark"?"bg-olive-900 text-white":"bg-white text-black"} min-h-screen `}>
      <BrowserRouter>
        <Routes>
          <Route element={<WrapperRoute setTheme={setTheme} theme={theme} />} >
            <Route path="/" element={<Gitprofiles />} />
            <Route path="/:id" element={<GitRepos />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
