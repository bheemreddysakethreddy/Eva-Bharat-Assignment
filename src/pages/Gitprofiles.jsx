import React, { useEffect, useState } from 'react'
import useFetch from '../components/useFetch'
import { useNavigate } from 'react-router-dom'
const api = "https://api.github.com/search/users"
function Gitprofiles() {
    const [query, setQuery] = useState("")
    const [pagination, setPagination] = useState({pagenumber:1, pageSize:10})
    const {data, loading, error} = useFetch({api:`${api}?q=${query}&page=${pagination.pagenumber}&per_page=${pagination.pageSize}`, delay:800, query:query})
    const dataItems = data?.data?.items || []
    console.log(data)
    const navigate = useNavigate()

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPagination(prev=>({...prev, pagenumber:0}))
    }, [query])

  return (
    <div className='flex flex-col justify-center items-center w-full'>
        <input type="text" className='border py-1 pl-1 outline-0 rounded' value={query} onChange={(e)=>setQuery(e.target.value)} />
        {loading && <h1>Loading...</h1>}
        {error!==null && <h1>{error}</h1>}
        {!loading && !dataItems.length && error==null && <h1>No User Found</h1>}
        {!loading && dataItems.length && <div className='w-[80%]'>
            { dataItems?.map((ele)=>(
                <div key={ele.id} onClick={()=>navigate(`/${ele.id}`,{state:{giturl:ele.repos_url, name:ele.login}})} className='flex gap-4 mt-2 p-3 shadow rounded-xl hover:shadow-lg hover:rounded-xl shadow-gray-300 cursor-pointer'>
                    <img className='h-20 w-20' src={ele.avatar_url} alt="profile Image" />
                    <div>
                        <p className='break-all'>name:- {ele.login}</p>
                        <p>id:- {ele.id}</p>
                        <p><a href={ele.html_url} target='_blank' className='text-blue-600'>GitHub</a></p>
                    </div>
                </div>
            ))}
            <div className='flex gap-10'>
                <button onClick={()=>setPagination(prev=>({...prev, pagenumber:prev.pagenumber-1}))}>Prev</button>
                <p>{pagination.pagenumber}</p>
                <button onClick={()=>setPagination(prev=>({...prev, pagenumber:prev.pagenumber+1}))}>Next</button>
            </div>
            </div>}
    </div>
  )
}

export default Gitprofiles
