import { useState, useEffect } from 'react'

export default function getUsers(url) {
    const [ output, setOutput ] = useState([])
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${url}`);
            const result = await response.json();
            setOutput(result.results)
    };
    fetchData();
    }, [])

    return output
}