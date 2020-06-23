exports.getGreeting = (req, res, next) => {
  res.status(200).json({
    msg:
      "Welcome to the dominating 12 visualiser proxy server, please use one of the following paths. All paths return JSON.",
    paths: {
      "/:game_number/territories": {
        returns: "a territories object filled with territory objects",
        sample: {
          Corinthia: {
            owner: "",
            troops: 3,
            xpos: "398",
            ypos: "429",
            highlighted: false,
          },
        },
      },
      "/:game_number/players": {
        returns: "a players object filled with player objects",
        sample: {
          alunturner: {
            colour: "player-7",
            playerURL: "www.xyz.com",
            cards: 0,
            territories: 0,
            troops: 0,
            hidden: false,
          },
        },
      },
      "/:game_number/gamelog": {
        returns:
          "an array where each entry is the message entry from the game log in ascending order",
        sample: [
          "Game created.",
          "alunturner joined the game.",
          "LeRenard joined the game.",
          "Gusreynolds joined the game.",
        ],
      },
      "/:game_number/map": {
        returns: "a map object with the map URL and dimensions",
        sample: {
          map: { url: "www.xyzabc.com", width: "1000px", height: "800px" },
        },
      },
    },
  });
};
