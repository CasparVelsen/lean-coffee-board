import styled from 'styled-components';
import ScreenReaderOnly from './ScreenReaderOnly.js';

export default function EntryForm({ onSubmit }) {
  return (
    <Form onSubmit={handleSubmit} aria-labelledby="entry-form-name">
      <label htmlFor="text">
        <ScreenReaderOnly>Entry text</ScreenReaderOnly>
      </label>
      <input
        name="text"
        id="text"
        placeholder="Just some text ..."
        type="text"
      />
      <PlusButton id="entry-form-name">
        <ScreenReaderOnly>Create new entry</ScreenReaderOnly>
        <div aria-hidden="true">+</div>
      </PlusButton>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputElement = form.elements.text;
    onSubmit(inputElement.value);
  }
}

const Form = styled.form`
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  padding: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
  input {
    width: 100%;
    margin-right: 20px;
  }
`;

const PlusButton = styled.button`
  border-radius: 50%;
  line-height: 0;
  width: 28px;
  height: 28px;
  border: none;
  div {
    margin-top: -1px;
  }
`;
