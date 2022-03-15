export default function EntryForm() {
  return (
    <form onSubmit={handleSubmit}>
      <label>Enter your name:</label>
      <input type="text" name="name" id="name" required></input>
      <label type="submit" value="Subscribe!"></label>
    </form>
  );

  function handleSubmit(event) {
    event.preventDefault();
  }
}
