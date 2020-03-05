export function handleNewStatusClick(event) {
  let board_id = event.target.id.slice(23);
  let inputsColumnName = document.querySelectorAll("input");
  for (let input of inputsColumnName) {
    input.addEventListener('change', function (event) {
      console.log('input value', event.target.value);
      let status_title = event.target.value;
      let data = {board_id, status_title};
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      };
      fetch('http://127.0.0.1:5000/api/create-status', options);
    });
  }
}
