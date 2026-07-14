import { useState, useEffect } from "react";

const useFetch = (url: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${url}`);
        const data = await res.json();

        // console.log(data);
        setData(data);
      } catch (error) {
        console.log(error?.message);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
