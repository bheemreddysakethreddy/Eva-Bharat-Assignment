import "./App.css"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import GitRepos from "./pages/gitRepos"
import Gitprofiles from "./pages/Gitprofiles"

function App() {
  return (
    <div className="mt-10">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Gitprofiles />} />
          <Route path="/:id" element={<GitRepos />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
