import { Outlet } from 'react-router-dom'
import Navbar from '../pages/Navbar'

function WrapperRoute({theme, setTheme}) {
  return (
    <div>
      <Navbar theme={theme} setTheme={setTheme}/>
      <Outlet />
    </div>
  )
}

export default WrapperRoute
