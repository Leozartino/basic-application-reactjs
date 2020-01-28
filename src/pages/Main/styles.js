import styled from 'styled-components';

export const Title = styled.h1`
  font-family: Arial, Helvetica, sans-serif;
  color: ${props => (props.error ? 'red' : '#00ced1')};
  font-size: 24px;
  text-align: center;
`;
