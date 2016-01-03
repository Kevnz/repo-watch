import React from "react";
import { connect, PromiseState } from 'react-refetch';
import RepositoryList from './repository-list';

const Loader = (props) => <div className="loader" style={{color: '#222222', display: 'block', height: '40px', margin: '50px'}}><div className="loader-inner ball-scale-multiple"><div></div><div></div><div></div></div></div>;

class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { reposFetch } = this.props;
    const { user } = this.props.params;

    if (reposFetch.pending) {
      return  <Loader />
    } else if (reposFetch.rejected) {
      return <h3> Bugger {reposFetch.reason}</h3>
    } else if (reposFetch.fulfilled) {
      console.log(reposFetch);
      return <RepositoryList repos={reposFetch.value}/>
    }
  }
}
export default connect((props) => ({
  reposFetch:  `/api/${props.params.user}`
}))(RepoList)
