import React from 'react';

import { FaGithubAlt, FaPlus } from 'react-icons/fa';

import { Container, Form, SubmitButton } from './styles';

function Main() {
  return (
    <Container> 
      <h1>
        <FaGithubAlt />
        Repositórios
      </h1>
      <Form onSubmit={() => alert('Works!!')}>
        <input type="text" placeholder="Adcionar repositório"></input>
        
        <SubmitButton>
          <FaPlus color="#FFF" size={14}/>
        </SubmitButton>
     </Form>  
    </Container>
  )
}

export default Main;
