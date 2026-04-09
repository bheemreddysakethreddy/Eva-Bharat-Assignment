import axios from "axios"
import { useEffect, useState } from "react"

function useFetch({api, delay, query}) {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    
    async function fetchData(api, signal){
        try {
            setError(null)
            const res = await axios.get(api, {signal})
            console.log(res.data.items, "items")
            setData(res.data.items)
        } catch (error) {
            setData([])
            if(error.message!=="canceled"){
                setError(error.message)
            }
        }finally{
            setLoading(false)
        }
    }

  useEffect(()=>{
    const controller = new AbortController()
    if(query === ""){
        setError("Start searching with name")
        setLoading(false)
        setData([])
        return
    }
    setLoading(true)
    setError(null)
    const timerId = setTimeout(() => {
        fetchData(api, controller.signal)
    }, delay);

    return ()=>(clearTimeout(timerId) ,controller.abort())
  }, [api, delay, query])

  return {data, loading, error}
}

export default useFetch
