import axios from "axios";

import React, { useEffect, useState } from "react";





const useAxios = (url) => {
  const [data, updateData] = useState()

  const url2 = `/api/${user}/${repo}`;

  const fetchQuery = async (url) => {
    const resp = await axios.get(url)

    const data = resp.data
    updateData(json)
  }
  useEffect(() => {
    fetchQuery(url)
  }, [])

  return data
}

const RepoDetail = (props)=> {

    return (
        <section> ? </section>
    );

}

export default RepoDetail