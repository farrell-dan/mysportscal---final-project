import React, { useState, useEffect } from "react";
import "../../Soccer/Soccer.css";
import { useMyGames } from "../../../MyGamesContext";

const EnglishPremierLeague = () => {
	const [data, setData] = useState(null);
	const { myGames, addGame, removeGame } = useMyGames();
	const [visibleGames, setVisibleGames] = useState(15);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/epl-data");
				const result = await response.json();
				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, []);

	const currentDateTime = new Date();
	const upcomingGames = data
		?.filter((fixture) => new Date(fixture.DateUtc) > currentDateTime)
		.sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));

		const loadMoreGames = () => {
			setVisibleGames((prevVisibleGames) => prevVisibleGames + 15);
		};

	return (
		<div className="container">
			<h2>English Premier League</h2>
			<div>
				{upcomingGames ? (
					<>
					<table className="fixture-table">
						<thead>
							<tr>
								<th>Date</th>
								<th>Time</th>
								<th>Home Team</th>
								<th>Away Team</th>
								<th>Location</th>
								<th>Favorite</th>
							</tr>
						</thead>
						<tbody>
							{upcomingGames.slice(0, visibleGames).map((fixture, index) => {
								const dateTimeUtc = new Date(fixture.DateUtc);
								const timeOptions = {
									hour: "numeric",
									minute: "numeric",
									hour12: false,
								};
								const formattedTime = dateTimeUtc.toLocaleTimeString(
									undefined,
									timeOptions
								);

								return (
									<tr key={"EPL" + fixture.MatchNumber}>
										<td>{dateTimeUtc.toLocaleDateString()}</td>
										<td>{formattedTime}</td>
										<td>{fixture.HomeTeam}</td>
										<td>{fixture.AwayTeam}</td>
										<td>{fixture.Location}</td>
										<td>
											<input
												type="checkbox"
												checked={myGames.some(
													(game) => game.id === `EPL${fixture.MatchNumber}`
												)}
												onChange={() => {
													const game = {
														...fixture,
														MatchNumber: "EPL" + fixture.MatchNumber,
														id: `EPL${fixture.MatchNumber}`,
													};
													if (myGames.some((g) => g.id === game.id)) {
														removeGame(game.id);
													} else {
														addGame(game);
													}
												}}
											/>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>

					{visibleGames < upcomingGames.length && (
							<button onClick={loadMoreGames}>Load More</button>
						)}
					</>
				) : (
					<p>Loading Games...</p>
				)}
			</div>
		</div>
	);
};

export default EnglishPremierLeague;