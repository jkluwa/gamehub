import React, { useEffect, useState } from "react";
import LeaderboardForm from "./leaderboardForm";

const Leaderboard = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState();
  const [selectedSort, setSelectedSort] = useState();
  const [leaderboard, setLeaderboard] = useState();
  let leaderboardJsx = "";
  const handleCredentialResponse = (response) => {
    console.log(response.credential);
  };
  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "238118534743-6otm74l2gsvums0ptapl9dufm752fp1b.apps.googleusercontent.com",
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(document.getElementById("googleButton"), {
      theme: "outline",
      size: "large",
    });
    fetch("https://gamehub-api-dev.enterosoft.com/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
    if (selectedGame != null) {
      fetch(
        "https://gamehub-api-dev.enterosoft.com/search?game_id=" +
          selectedGame.id +
          "&order_by=" +
          selectedSort
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("SOMETHING WENT WRONG");
          }
          return response.json();
        })
        .then((data) => {
          setLeaderboard(data);
        })
        .catch((error) => {
          setLeaderboard(error);
        });
    }
  }, [selectedGame, selectedSort]);

  const setFormData = (game, sort) => {
    setSelectedGame(
      games[
        Object.keys(games).find((key) => games[key].name === game.current.value)
      ]
    );
    setSelectedSort(sort.current.selectedOptions[0].id);
  };
  if (leaderboard) {
    if (leaderboard instanceof Error) {
      leaderboardJsx = <p>{leaderboard.message}</p>;
    } else {
      leaderboardJsx = (
        <>
          <table>
            <thead>
              <tr>
                <th>id</th>
                <th>username</th>
                <th>avatar</th>
                <th>finish time</th>
                <th>level id</th>
              </tr>
            </thead>
            {Object.keys(leaderboard).map((key, index) => {
              return (
                <tbody key={index}>
                  <tr>
                    <td>{leaderboard[key].user.id}</td>
                    <td>{leaderboard[key].user.nickname}</td>
                    <td>
                      <img
                        alt='user avatar'
                        height='25'
                        src={leaderboard[key].user.profile_pic}
                      />
                    </td>
                    <td>{leaderboard[key].finish_time}</td>
                    <td>{leaderboard[key].level_id}</td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </>
      );
    }
  }
  return (
    <>
      <LeaderboardForm setFormData={setFormData} games={games} />
      {leaderboardJsx}
      <div id='googleButton'></div>
    </>
  );
};

export default Leaderboard;
