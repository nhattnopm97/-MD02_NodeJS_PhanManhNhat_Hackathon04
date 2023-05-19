function addGame() {
  let player1 = document.getElementById("player1").value;
  let player2 = document.getElementById("player2").value;
  let player3 = document.getElementById("player3").value;
  let player4 = document.getElementById("player4").value;
  if (!player1 || !player2 || !player3 || !player4) {
    document.getElementById("notify").innerHTML = "Please input player name.";
    return;
  }
  let allPlayerName = {
    player1,
    player2,
    player3,
    player4,
  };
  fetch(`http://localhost:9999/api/v1/round`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ allPlayerName }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      window.location.href = `/game/${response.id}`;
    })
    .catch((err) => {
      console.log(err);
    });
}
