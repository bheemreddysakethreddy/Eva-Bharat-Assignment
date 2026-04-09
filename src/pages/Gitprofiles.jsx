import React, { useState } from 'react'
import useFetch from '../components/useFetch'
const api = "https://api.github.com/search/users"
function Gitprofiles() {
    const [query, setQuery] = useState("")
    const {data, loading, error} = useFetch({api:`${api}?q=${query}`, delay:800, query:query})

  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <input type="text" className='border py-1 pl-1 outline-0 rounded' value={query} onChange={(e)=>setQuery(e.target.value)} />
        {loading && <h1>Loading...</h1>}
        {error!==null && <h1>{error}</h1>}
        {!loading && !data.length && error==null && <h1>No User Found</h1>}
        {!loading && <div className='w-[80%]'>
            {data.map((ele)=>(
                <div key={ele.id} className='flex gap-4 mt-2 p-3 shadow rounded-xl hover:shadow-lg hover:rounded-xl shadow-gray-300 cursor-pointer'>
                    <img className='h-20 w-20' src={ele.avatar_url} alt="profile Image" />
                    <div>
                        <p className='break-all'>name:- {ele.login}</p>
                        <p>id:- {ele.id}</p>
                        <p><a href={ele.html_url} target='_blank' className='text-blue-600'>GitHub</a></p>
                    </div>
                </div>
            ))}
            </div>}
    </div>
  )
}

export default Gitprofiles
