// import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import useFetch from "../components/useFetch"
import { useEffect, useMemo, useState } from "react"

function GitRepos() {
  const {state} = useLocation()
  const [pagination, setPagination] = useState({pagenumber:1, pageSize:10})
  const {data, loading, error} = useFetch({api:`${state.giturl}?page=${pagination.pagenumber}&per_page=${pagination.pageSize}`, delay:800, query:state.name})
  const [sortByForks, setSortByForks] = useState("Default")
  const [sortByStars, setSortByStars] = useState("Default")
  const [FilterByLanguage, setFilterByLanguage] = useState("All")
  const dataItems = useMemo(()=>(
        data?.data ?? []
  ), [data?.data])
  console.log(data)

 

  const set = useMemo(()=>{
     const set = new Set()
    for(let ele of dataItems){
      if((ele.language || " ").trim() !== ""){
        set.add(ele.language.trim())
      }
    }
    return set
  },[dataItems])
  const[filteredValues,setFilteredValues]=useState([])
  useEffect(()=>{
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setFilteredValues([...dataItems].filter((ele)=>(FilterByLanguage=="All" || ele.language==FilterByLanguage)))
    setFilteredValues(prev=>(prev.sort((a,b)=>{
        if(sortByForks=="Inc"){
          return a.forks_count - b.forks_count
        }else if(sortByForks==="Dec"){
          return b.forks_count - a.forks_count
        }else{
          return 0
        }
      })))
    setFilteredValues(prev=>(prev.sort((a,b)=>{
        if(sortByStars=="Inc"){
          return a.stargazers_count - b.stargazers_count
        }else if(sortByStars==="Dec"){
          return b.stargazers_count - a.stargazers_count
        }else{
          return 0
        }
      })))
  }, [FilterByLanguage, sortByForks, sortByStars, dataItems])

  return (
    <div className="flex flex-col justify-center w-full items-center">
      {loading && <h1>Loading ...</h1>}
      {!loading && !dataItems.length && <h1>No Repos</h1>}
      {error!== null && !loading && <h1>{error}</h1>}
      {!loading && dataItems.length && <div className="w-[80%]">
        <div className="flex gap-2">
          <div>
            <label htmlFor="languageFilter">Filter by language</label>
            <select id="languageFilter" defaultValue={"All"} onChange={(e)=>setFilterByLanguage(e.target.value)} className=" outline-0 border rounded px-1" >
              <option value="All">All</option>
              {Array.from(set).map((lang)=>(
                <option key={lang} value={lang}>{lang}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="forks">sort by forks</label>
            <select id="forks" className=" outline-0 border rounded px-1" defaultValue={"Default"} onChange={(e)=>setSortByForks(e.target.value)}>
                <option value="Default">Default</option>
                <option value="Inc">Inc</option>
                <option value="Dec">Dec</option>
            </select>
          </div>
          <div>
            <label htmlFor="star">sort by stars</label>
            <select id="star"  className=" outline-0 border rounded px-1"  defaultValue={"Default"}  onChange={(e)=>setSortByStars(e.target.value)}>
                <option value="Default">Default</option>
                <option value="Inc">Inc</option>
                <option value="Dec">Dec</option>
            </select>
          </div>
        </div>
        {filteredValues.map((ele)=>(
          <div key={ele.id} className="shadow rounded mt-4 p-5 hover:shadow-gray-600">
            <p>{ele.name}</p>
            <p>{ele.id}</p>
            <p>{ele.forks_count}</p>
            <p>{ele.stargazers_count}</p>
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

export default GitRepos
