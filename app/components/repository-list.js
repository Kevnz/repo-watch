import React from 'react';
const _ = require('lodash');

const RepoItem = (props) => <div key={props.key}><a href={props.html_url}>{props.name}</a>: <span>{props.description || 'No description'}</span></div>;

export default class RepositoryList extends React.Component {
  static propTypes = {
    repos: React.PropTypes.array.isRequired,
  }
  constructor(props) {
    super(props);
    this.state = { searchTerm : '',searchLanguage: '' };
  }
  static displayName = "RepositoryList"
  handleChange(e) {
    if(e.target.value.length > 2) {
      this.setState({searchTerm: e.target.value});
    }
  }
  render() {
    const { repos } = this.props;

    const filteredList = repos.filter((item) => {
      if (this.state.searchLanguage.length !== 0) {
        return item.language === this.state.searchLanguage;
      }
      if (this.state.searchTerm.length === 0) return true;
      if (item.full_name && item.full_name.toLowerCase().indexOf(this.state.searchTerm) > -1) return true;
      if (item.description && item.description.toLowerCase().indexOf(this.state.searchTerm) > -1) return true;
      if (item.language && item.language.toLowerCase().indexOf(this.state.searchTerm) > -1) return true;
      if (item.language && item.language.toLowerCase().indexOf(this.state.searchTerm) > -1) return true;
      return false;
    });
    const languages = filteredList.map(item => item.language);
    const langed = _.uniq(languages);
    console.log('uniq languages', langed);
    const langButtons = langed.map(language => <button key={language} onClick={()=>::this.setState({searchTerm:this.state.searchTerm, searchLanguage: language })}>{language || 'No Language'}</button>)
    const repoList = filteredList.map((repo, index) => <RepoItem {...repo}  key={'repo-item' + index}/>);
    return (<section>
      <div>
        <input
            placeholder='Search'
            onChange={::this.handleChange} />
        <button onClick={()=>::this.setState({searchTerm : '',searchLanguage: ''})}>Clear</button>
        </div>
      <div>
        {langButtons}
      </div>
      <div>
        <h3>Results Total: {filteredList.length}</h3>
        {repoList}
      </div>
    </section>);

  }

}
