import React, {useEffect, useState} from "react";

const Leaderboard = () => {
    const [games, setGames] = useState([])
    const [leaderboard, setLeaderboard] = useState()
    let leaderboardJsx = ""
    useEffect(() => {
        

        fetch("https://gamehub-api-dev.enterosoft.com/games")
        .then(response => response.json())
        .then(data => {
            setGames(data)
            
        })
    }, [])
    const gameChangeHandler = (e) => {
        const key = Object.keys(games).find(key => games[key].name === e.target.value)
        fetch("https://gamehub-api-dev.enterosoft.com/search?game_id="+games[key].id+"&order_by=finish_time")
        .then(response => 
            {
                if(!response.ok) {
                    throw new Error("SOMETHING WENT WRONG")
                }
                return response.json()
            })
        .then(data => {
            setLeaderboard(data)
        })
        .catch(error => {
            setLeaderboard(error)
        })
    }
    
    if(leaderboard) {
        if(leaderboard instanceof Error) {
            leaderboardJsx=<p>{leaderboard.message}</p>
        } else {
        leaderboardJsx = (<>
            <table>
            
            {Object.keys(leaderboard).map((key, index)=> {
                return (
                    <tbody key={index}>
                    <tr>
                    <th>
                        username
                    </th>
                    <th>
                        finish time
                    </th>
                    <th>
                        level id
                    </th>
                    </tr>
                    <tr>
                    <td>
                        {leaderboard[key].user.nickname}
                    </td>
                    <td>
                        {leaderboard[key].finish_time}
                    </td>
                    <td>
                        {leaderboard[key].level_id}
                    </td>
                    </tr>
                    </tbody>
                    )
                    
            })}
            
            </table>
        </>)}
    }
    return (
        <>
        <h1>Select game:</h1>
        <form>
            <select onChange={gameChangeHandler}>
                {Object.values(games).map((key, index) => (
                <option  key={index}>
                    {key.name}
                </option>
                ))}
            </select>
        </form>
        {leaderboardJsx}
        </>
    );

    
    
}

export default Leaderboard;