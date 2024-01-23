
import axios from "axios";
import { useEffect, useState } from "react"

const useFetch = (endpoints) => {
    const baseUrl = process.env.REACT_APP_SERVER_API;
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            await axios.get(`${baseUrl}${endpoints}`, {
                withCredentials: true
            })
                .then(res => {
                    setData(res.data);
                    setLoading(false);
                })
                .catch(e => {
                    setError(e)
                    setLoading(false)
                    // console.log('e: ', e);
                })

        }
        fetchData()
    }, [])

    const reFetch = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${baseUrl}${endpoints}`, {
                withCredentials: true
            });
            setData(res.data)
        } catch (error) {
            setError(error)
        }
        setLoading(false)
    }

    return { data, loading, error, reFetch }
};

export default useFetch;