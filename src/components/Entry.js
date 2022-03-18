import styled from 'styled-components';

export default function Entry({ text, author }) {
  return (
    <Card>
      <Title>{text}</Title>
      <Author>{author}</Author>
    </Card>
  );
}

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  width: 350px;
  height: fit-content;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1em;
`;

const Author = styled.span`
  color: grey;
  font-size: 0.7em;
`;
