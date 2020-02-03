import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading } from './styles';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      issues: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match } = this.props;
    const repo_name = decodeURIComponent(match.params.repository);

    /*
      Nesse trecho de código, a url issues só será carrega
      quando a url reponse for carregada, e sempre que precisarmos
      chama - la, internamente ela irá carregar a repository antes e isso
      não é necessário.

      const repository = await api.get(`/response{repo_name}`);
      const issues = await api.get(`/response{repo_name}/issues`);
    */

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repo_name}`),
      api.get(`/repos/${repo_name}/issues`, {
        params: {
          state: 'open',
          per_page: 5,
        },
      }),
    ]);

    console.log(`${repository}\n${issues}`);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  render() {
    const { repository, issues, loading } = this.state;
    if (loading) {
      return <Loading>Carregando</Loading>;
    }
    return <h1>Repository</h1>;
  }
}

export default Repository;
