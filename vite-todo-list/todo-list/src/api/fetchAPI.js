import { useState, useEffect } from 'react'

export default function fetchAPI(url) {
  const [ output, setOutput ] = useState({})
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`${url}`);
      const result = await response.json();
      setOutput(result)
    };
    fetchData();
    }, [])

    return output
}