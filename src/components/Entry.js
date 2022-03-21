import styled from 'styled-components';
import dayjs from 'dayjs';
import { AiOutlineDelete } from 'react-icons/ai';

export default function Entry({ text, author, color, createdAt, onDelete }) {
  return (
    <Card color={color}>
      <Time>{dayjs(createdAt).format('DD.MM.YYYY HH:mm')}</Time>
      <Title>{text}</Title>
      <Author>{author}</Author>
      <Delete onClick={onDelete} />
    </Card>
  );
}

const Card = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px;
  width: 350px;
  height: fit-content;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border: 3px solid ${({ color }) => color};
  position: relative;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1em;
`;

const Author = styled.span`
  color: grey;
  font-size: 0.7em;
`;

const Time = styled.small`
  position: absolute;
  right: 10px;
  top: 10px;
`;

const Delete = styled(AiOutlineDelete)`
  position: absolute;
  right: 10px;
  bottom: 10px;

  :hover {
    transform: scale(1.2);
  }
`;
