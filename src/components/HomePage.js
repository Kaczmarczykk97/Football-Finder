import { useState } from "react";

import classes from "./HomePage.module.css";

import FUT from "../imgs/FUT.png";
import footballClubs from "./football-clubs";

function HomePage() {
  const [playerName, setPlayerName] = useState("?");
  const [playerImg, setPlayerImg] = useState("?");
  const [clubImg, setClubImg] = useState("?");
  const [nationalityImg, setNationalityImg] = useState("?");
  const [userInput, setUserInput] = useState("");

  const userInputHandler = (e) => {
    e.preventDefault();
    const player = userInput.split(" ").join("_");
    findPlayer(player);
  };

  const findPlayer = async function (namePlayer) {
    const player = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${namePlayer}`
    );
    const info = await player.json();
    console.log(info.player[0]);
    setPlayerName(info.player[0].strPlayer);
    setPlayerImg(info.player[0].strCutout);

    const clubName = info.player[0].strTeam;
    const nationality = info.player[0].strNationality.toLowerCase();
    console.log(clubName);

    const curentClub = footballClubs.filter((footballClub) =>
      footballClub.club.includes(clubName.split(" ").join("-"))
    );

    setClubImg(curentClub[0]);

    const nation = await fetch(
      `https://restcountries.com/v3.1/name/${nationality}`
    );
    const nationData = await nation.json();
    setNationalityImg(nationData[0].flags.png);
  };

  return (
    <section className={classes.sectionHome}>
      <h1 className={classes.headingH1}>Football App</h1>
      <div className={classes.gameContainer}>
        <div className={classes.cardContainer}>
          <img src={FUT} alt="FUT card" className={classes.futImg} />
          <img src={playerImg} alt="player img" className={classes.playImg} />

          <img
            src={clubImg.src ? clubImg.src : ""}
            alt="club img"
            className={classes.clubImg}
          />

          <img
            src={nationalityImg}
            alt="nationality img"
            className={classes.nationalityImg}
          />
          <h3 className={classes.headingH3}>{playerName}</h3>
        </div>
        <div className={classes.answearsContainer}>
          <h2 className={classes.headingH2}>Ask Your Question:</h2>
          <form onSubmit={userInputHandler}>
            <label htmlFor="playerFinder">FIND YOUR PLAYER:</label>
            <input
              id="playerFinder"
              onChange={(e) => setUserInput(e.target.value)}
            ></input>
            <button type="submit">KLIK</button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default HomePage;
