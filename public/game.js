//name
let namePlayer1 = document.getElementById("namePlayer1");
let namePlayer2 = document.getElementById("namePlayer2");
let namePlayer3 = document.getElementById("namePlayer3");
let namePlayer4 = document.getElementById("namePlayer4");
//score
let scorePlayer1 = document.getElementById("scorePlayer1");
let scorePlayer2 = document.getElementById("scorePlayer2");
let scorePlayer3 = document.getElementById("scorePlayer3");
let scorePlayer4 = document.getElementById("scorePlayer4");
//total score
// let totalScorePlayer1 = document.getElementById("totalScorePlayer1");
// let totalScorePlayer2 = document.getElementById("totalScorePlayer2");
// let totalScorePlayer3 = document.getElementById("totalScorePlayer3");
// let totalScorePlayer4 = document.getElementById("totalScorePlayer4");
let id = window.location.href.split("/")[4];

function loadPage() {
  let header = document.getElementById("header");
  let nav = document.getElementById("nav");
  let roundElement = document.getElementById("roundElement");
  let totalScorePlayer1 = 0;
  let totalScorePlayer2 = 0;
  let totalScorePlayer3 = 0;
  let totalScorePlayer4 = 0;

  fetch(`/api/v1/round/${id}`)
    .then((response) => response.json())
    .then((response) => {
      header.innerHTML = `
        <div class="xxx">#</div>
        <div id="namePlayer1" class="player1">${response.player[0].name}</div>
        <div id="namePlayer2" class="player2">${response.player[1].name}</div>
        <div id="namePlayer3" class="player3">${response.player[2].name}</div>
        <div id="namePlayer4" class="player4">${response.player[3].name}</div>
      `;
      let resultRound = "";
      for (let i = 0; i < response.player[0].score.length; i++) {
        totalScorePlayer1 += +response.player[0].score[i];
        totalScorePlayer2 += +response.player[1].score[i];
        totalScorePlayer3 += +response.player[2].score[i];
        totalScorePlayer4 += +response.player[3].score[i];
        resultRound += `
        <div id="round" class="round">
          <div class="xxx">Round ${i + 1}</div>
          <input id="scorePlayer_1_${i}" class="player1" type="number" value=${
          response.player[0].score[i]
        } onchange=handleInputChange(${i},event) />
          <input id="scorePlayer_2_${i}" class="player2" type="number" value=${
          response.player[1].score[i]
        } onchange=handleInputChange(${i}) />
          <input id="scorePlayer_3_${i}" class="player3" type="number" value=${
          response.player[2].score[i]
        } onchange=handleInputChange(${i}) />
          <input id="scorePlayer_4_${i}" class="player4" type="number" value=${
          response.player[3].score[i]
        } onchange=handleInputChange(${i}) />
        </div>
        <hr />
        `;
        roundElement.innerHTML = resultRound;
        nav.innerHTML = `
          <div id="totalScore" class="xxx">Sum of score</div>
          <div id="totalScorePlayer1" class="player1">${totalScorePlayer1}</div>
          <div id="totalScorePlayer2" class="player2">${totalScorePlayer2}</div>
          <div id="totalScorePlayer3" class="player3">${totalScorePlayer3}</div>
          <div id="totalScorePlayer4" class="player4">${totalScorePlayer4}</div>
        `;
      }
    });
}
loadPage();

function addRound() {
  fetch(`/api/v1/round/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: "addRound" }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      if (response.message === "maximunround is not allowed pass 5 round!") {
        alert(response.message);
      }
      loadPage();
    })
    .catch((err) => console.log(err));
}

function handleInputChange(index) {
  console.log("handleInputChange0", index);
  let scorePlayer_1 = document.getElementById(`scorePlayer_1_${index}`).value;
  let scorePlayer_2 = document.getElementById(`scorePlayer_2_${index}`).value;
  let scorePlayer_3 = document.getElementById(`scorePlayer_3_${index}`).value;
  let scorePlayer_4 = document.getElementById(`scorePlayer_4_${index}`).value;
  fetch(`/api/v1/round/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      scorePlayer_1,
      scorePlayer_2,
      scorePlayer_3,
      scorePlayer_4,
      index,
      message: "changeScore",
    }),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      loadPage();
    })
    .catch((err) => {
      console.log(err);
    });
}
