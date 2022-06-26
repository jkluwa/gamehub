import React, { useRef } from "react";

const LeaderboardForm = (props) => {
  const selectedGame = useRef();
  const selectedSort = useRef();

  const submitHandler = (e) => {
    e.preventDefault();
    props.setFormData(selectedGame, selectedSort);
  };

  return (
    <form onSubmit={submitHandler}>
      <label htmlFor='game'>game: </label>
      <select id='game' ref={selectedGame}>
        {Object.values(props.games).map((key, index) => (
          <option key={index}>{key.name}</option>
        ))}
      </select>
      <br />
      <label htmlFor='sort'>sort by: </label>
      <select id='sort' ref={selectedSort}>
        <option id='score_primary'>score primary</option>
        <option id='score_premium'>score_premium</option>
        <option id='finish_time'>finish time</option>
      </select>
      <br />
      <input type='submit' value='search' />
    </form>
  );
};

export default LeaderboardForm;
