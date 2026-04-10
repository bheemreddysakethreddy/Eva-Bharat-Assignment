import React from 'react'

function Navbar({theme, setTheme}) {
    function handleChangeTheme(){
        setTheme(prev=>prev=="Dark"?"Light":"Dark")
    }
  return (
    <div className='h-20 flex justify-center items-center'>
        <button onClick={handleChangeTheme} className='border rounded-lg cursor-pointer px-6 py-1'>{theme==="Dark"?"Light":'Dark'}</button>
    </div>
  )
}

export default Navbar
