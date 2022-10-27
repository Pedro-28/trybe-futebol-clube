export const homeQuery = `SELECT t.team_name AS name,
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1
ELSE 0 END) AS totalPoints,
COUNT(m.home_team) AS totalGames,
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(m.home_team_goals) AS goalsFavor,
SUM(m.away_team_goals) AS goalsOwn,
SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
ROUND((SUM(CASE
WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1
ELSE 0 END) / (COUNT(m.home_team) * 3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t 
ON m.home_team = t.id WHERE m.in_progress = 0 GROUP BY name
ORDER BY totalPoints DESC, totalVictories DESC, 
goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export const awayQuery = `SELECT t.team_name AS name,
SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
WHEN m.away_team_goals = m.home_team_goals THEN 1
ELSE 0 END) AS totalPoints,
COUNT(m.away_team) AS totalGames,
SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.away_team_goals < m.home_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(m.away_team_goals) AS goalsFavor,
SUM(m.home_team_goals) AS goalsOwn,
SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
ROUND((SUM(CASE
WHEN m.away_team_goals > m.home_team_goals THEN 3
WHEN m.away_team_goals = m.home_team_goals THEN 1
ELSE 0 END) / (COUNT(m.away_team) * 3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t 
ON m.away_team = t.id WHERE m.in_progress = 0 GROUP BY name
ORDER BY totalPoints DESC, totalVictories DESC, 
goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;

export const leaderboardQuery = `SELECT home.name AS name,
home.totalPoints + away.totalPoints AS totalPoints,
home.totalGames + away.totalGames AS totalGames,
home.totalVictories + away.totalVictories AS totalVictories,
home.totalDraws + away.totalDraws AS totalDraws,
home.totalLosses + away.totalLosses AS totalLosses,
home.goalsFavor + away.goalsFavor AS goalsFavor,
home.goalsOwn + away.goalsOwn AS goalsOwn,
home.goalsBalance + away.goalsBalance AS goalsBalance,
ROUND(((home.totalPoints + away.totalPoints) / 
((home.totalGames + away.totalGames) * 3)) * 100, 2) AS efficiency
FROM (SELECT t.team_name AS name,
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1
ELSE 0 END) AS totalPoints,
COUNT(m.home_team) AS totalGames,
SUM(CASE WHEN m.home_team_goals > m.away_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.home_team_goals = m.away_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.home_team_goals < m.away_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(m.home_team_goals) AS goalsFavor,
SUM(m.away_team_goals) AS goalsOwn,
SUM(m.home_team_goals) - SUM(m.away_team_goals) AS goalsBalance,
ROUND((SUM(CASE
WHEN m.home_team_goals > m.away_team_goals THEN 3
WHEN m.home_team_goals = m.away_team_goals THEN 1
ELSE 0 END) / (COUNT(m.home_team) * 3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t 
ON m.home_team = t.id WHERE m.in_progress = 0 GROUP BY name) AS home
INNER JOIN (SELECT t.team_name AS name,
SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 3
WHEN m.away_team_goals = m.home_team_goals THEN 1
ELSE 0 END) AS totalPoints,
COUNT(m.away_team) AS totalGames,
SUM(CASE WHEN m.away_team_goals > m.home_team_goals THEN 1 ELSE 0 END) AS totalVictories,
SUM(CASE WHEN m.away_team_goals = m.home_team_goals THEN 1 ELSE 0 END) AS totalDraws,
SUM(CASE WHEN m.away_team_goals < m.home_team_goals THEN 1 ELSE 0 END) AS totalLosses,
SUM(m.away_team_goals) AS goalsFavor,
SUM(m.home_team_goals) AS goalsOwn,
SUM(m.away_team_goals) - SUM(m.home_team_goals) AS goalsBalance,
ROUND((SUM(CASE
WHEN m.away_team_goals > m.home_team_goals THEN 3
WHEN m.away_team_goals = m.home_team_goals THEN 1
ELSE 0 END) / (COUNT(m.away_team) * 3)) * 100, 2) AS efficiency
FROM TRYBE_FUTEBOL_CLUBE.matches AS m
INNER JOIN TRYBE_FUTEBOL_CLUBE.teams AS t 
ON m.away_team = t.id WHERE m.in_progress = 0 GROUP BY name) AS away
ON home.name = away.name ORDER BY totalPoints DESC, totalVictories DESC, 
goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;
