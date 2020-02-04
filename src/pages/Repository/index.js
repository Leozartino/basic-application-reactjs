import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, Issues } from './styles';
import { Container } from '../../components/Container';

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
    return (
      <Container>
        <Owner>
          <Link to="/">Home</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <Issues>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </Issues>
      </Container>
    );
  }
}

export default Repository;
