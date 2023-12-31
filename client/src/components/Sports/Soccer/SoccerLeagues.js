import { useState, useEffect } from "react";
import { useMyGames } from "../../MyGamesContext";
import { useParams } from "react-router-dom";

const SoccerLeagues = () => {
	const [data, setData] = useState(null);
	const { myGames, addGame, removeGame } = useMyGames();
	const { leagueName } = useParams();
	const apiUrl = `http://localhost:3000/api/${leagueName}`;
	const currentDateTime = new Date();
	const [searchTerm, setSearchTerm] = useState("");
	const [visibleGames, setVisibleGames] = useState(15);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiUrl);
				const result = await response.json();
				result.sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));
				setData(result);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};
		fetchData();
	}, [apiUrl]);

	const upcomingGames = data
		?.filter(
			(fixture) =>
				new Date(fixture.DateUtc) > currentDateTime &&
				(fixture.HomeTeam.toLowerCase().includes(searchTerm.toLowerCase()) ||
					fixture.AwayTeam.toLowerCase().includes(searchTerm.toLowerCase()))
		)
		.sort((a, b) => new Date(a.DateUtc) - new Date(b.DateUtc));

	const loadMoreGames = () => {
		setVisibleGames((prevVisibleGames) => prevVisibleGames + 15);
	};

	return (
		<div className="container">
			<h2>{leagueName}</h2>
			<input
				type="text"
				placeholder="Search by team name"
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				className="searchBar"
			/>
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
										<tr key={`${leagueName}${fixture.MatchNumber}`}>
											<td>{dateTimeUtc.toLocaleDateString()}</td>
											<td>{formattedTime}</td>
											<td>{fixture.HomeTeam}</td>
											<td>{fixture.AwayTeam}</td>
											<td>{fixture.Location}</td>
											<td>
												<input
													type="checkbox"
													checked={myGames.some(
														(game) =>
															game.id === `${leagueName}${fixture.MatchNumber}`
													)}
													onChange={() => {
														const game = {
															...fixture,
															MatchNumber: `${leagueName}${fixture.MatchNumber}`,
															id: `${leagueName}${fixture.MatchNumber}`,
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

export default SoccerLeagues;
