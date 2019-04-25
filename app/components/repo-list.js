import React, { useState, useEffect, useReducer } from "react";
import useAxios from '../hooks/use-axios';
import RepositoryList from './repository-list';


const Loader = (props) => <div className="loader" style={{ color: '#222222', display: 'block', height: '40px', margin: '50px' }}><div className="loader-inner ball-scale-multiple"><div></div><div></div><div></div></div></div>;

const RepoList = ({ user }) => {

  const url = `/api/${user}`;

  const { data, error, loading } = useAxios(url)


  if (loading) {
    return <Loader />
  }
  if (error) {
    return <div>Error</div>
  }
  return <RepositoryList repos={data} />
}

export default RepoList