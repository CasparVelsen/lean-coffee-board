import styled from 'styled-components';

export default function EntryForm() {
  return (
    <Form onSubmit={handleSubmit}>
      <label>Enter your name:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="enter your name here..."
        required
      ></input>
      <button type="submit">submit</button>
    </Form>
  );

  function handleSubmit(event) {
    event.preventDefault();
  }
}

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 0px 16px;
`;
