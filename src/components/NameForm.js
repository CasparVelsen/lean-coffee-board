import styled from 'styled-components';

export default function NameForm({ onSubmit }) {
  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Label htmlFor="name">Enter your name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="your name..."
          required
        />
        <Label htmlFor="color">Pick a color</Label>
        <ColorInput id="color" name="color" type="color" />
        <Button>Remember me</Button>
      </Form>
    </Container>
  );

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const inputElement = form.elements.name;
    const inputElementColor = form.elements.color;
    console.log(inputElementColor.value);
    onSubmit(inputElement.value, inputElementColor.value);
    form.reset();
  }
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  width: 350px;
  height: fit-content;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  border: 3px solid #527679;
`;

const Label = styled.label`
  color: #527679;
`;

const Input = styled.input`
  color: #527679;
  border: 1px solid #527679;
  padding: 5px;
`;

const ColorInput = styled.input`
  border: 1px solid #527679;
  height: 40px;
  width: 80px;
  background-color: white;
  padding: 5px 5px;
`;

const Button = styled.button`
  background-color: #d06b6d;
  border: none;
  padding: 5px;
  color: white;
`;
