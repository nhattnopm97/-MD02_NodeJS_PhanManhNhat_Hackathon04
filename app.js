const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
// Import routes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/public/createGame.html`);
});
app.get("/game", (req, res) => {
  res.sendFile(`${__dirname}/public/game.html`);
});
app.get("/game/:id", (req, res) => {
  res.sendFile(`${__dirname}/public/game.html`);
});
app.get("/api/v1/round/:id", (req, res) => {
  let id = req.params.id;
  let round = JSON.parse(fs.readFileSync("./data/round.json"));
  let findRound = round.find((round) => round.id === +id);
  if (findRound) {
    res.json(findRound);
  } else {
    res.json({ message: "Could not find round" + id });
  }
});
app.post("/api/v1/round", (req, res) => {
  console.log(req.body);
  let rounds = JSON.parse(fs.readFileSync("./data/round.json"));
  const id = Math.floor(Math.random() * 100000000000);
  const player1 = req.body.allPlayerName.player1;
  const player2 = req.body.allPlayerName.player2;
  const player3 = req.body.allPlayerName.player3;
  const player4 = req.body.allPlayerName.player4;
  const newRound = {
    id: id,
    player: [
      { name: player1, score: [0] },
      { name: player2, score: [0] },
      { name: player3, score: [0] },
      { name: player4, score: [0] },
    ],
  };
  try {
    rounds.unshift(newRound);
    fs.writeFileSync("./data/round.json", JSON.stringify(rounds));
    res.json({ message: "Add new round successfully!", id: id });
  } catch (error) {
    res.json(error);
  }
});

app.put("/api/v1/round/:id", (req, res) => {
  console.log(req.body);
  const id = req.params.id;
  let rounds = JSON.parse(fs.readFileSync("./data/round.json"));
  const message = req.body.message;
  let indexRound = rounds.findIndex((round) => round.id === +id);
  console.log("aaaaaa", rounds[indexRound].player[0].score.length);
  if (
    rounds[indexRound].player[0].score.length === 5 &&
    message === "addRound"
  ) {
    res.json({ message: "maximunround is not allowed pass 5 round!" });
    return;
  }
  if (message === "addRound" && indexRound !== -1) {
    rounds[indexRound].player[0].score.push(0);
    rounds[indexRound].player[1].score.push(0);
    rounds[indexRound].player[2].score.push(0);
    rounds[indexRound].player[3].score.push(0);
    fs.writeFileSync("./data/round.json", JSON.stringify(rounds));
    res.json({ message: "Add rounds successfully!" });
    return;
  }
  if (message === "changeScore") {
    const {
      scorePlayer_1,
      scorePlayer_2,
      scorePlayer_3,
      scorePlayer_4,
      index,
      message,
    } = req.body;
    let information = {
      scorePlayer_1,
      scorePlayer_2,
      scorePlayer_3,
      scorePlayer_4,
      index,
      message,
    };
    rounds[indexRound].player[0].score[index] = scorePlayer_1;
    rounds[indexRound].player[1].score[index] = scorePlayer_2;
    rounds[indexRound].player[2].score[index] = scorePlayer_3;
    rounds[indexRound].player[3].score[index] = scorePlayer_4;
    fs.writeFileSync("./data/round.json", JSON.stringify(rounds));
    res.json({ message: "changed scores successfully!" });
  }
  if (indexRound !== -1) {
    console.log(updateRound);
    console.log(indexRound);
    rounds[indexRound] = updateRound;
  } else {
    res.json({ message: "Not found" });
  }
});

app.listen(9999, () => {
  console.log(`server is running on http://localhost:9999`);
});
