
const eplData = require("./handlers/Leagues/eplData")
const signUp = require("./handlers/signup");
const login = require("./handlers/login");
const LaLigaData = require("./handlers/Leagues/LaLigaData")
const bundesligaData = require("./handlers/Leagues/bundeligaData")
const serieAData = require("./handlers/Leagues/serieAData")
const ligue1Data = require("./handlers/Leagues/ligue1Data")
const championsLeagueData = require("./handlers/Leagues/championsLeagueData")
const europaLeagueData = require("./handlers/Leagues/europaLeagueData")



module.exports = {
    eplData,
    LaLigaData,
    bundesligaData,
    championsLeagueData,
    europaLeagueData,
    ligue1Data,
    serieAData,
    signUp,
    login
}