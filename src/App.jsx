import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import GitRepos from "./pages/gitRepos"
import Gitprofiles from "./pages/Gitprofiles"

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GitRepos />} />
          <Route path="/:id" element={<Gitprofiles />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
