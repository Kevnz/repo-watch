import React from 'react';
import Search from 'react-search';

const RepoItem = (props) =>  <div><a href={props.html_url}>{props.name}</a></div>;

export default class RepositoryList extends React.Component {
  static propTypes = {
    repos: React.PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
  }
  static displayName = "RepositoryList"
  handleChange() {
    console.log('handleChange');
  }
  render() {
    const { repos } = this.props;
    const repoList = repos.map((repo, index) => <RepoItem {...repo} />);
    return (<section>
      <Search
          items={repos}
          keys={['name', 'language']}
          placeholder='Search'
          onChange={::this.handleChange} />
      <div>
        {repoList}
      </div>
    </section>);

  }

}
