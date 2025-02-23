import getGame from "../games/amyspark-ng/get/game";
import spamGame from "../games/amyspark-ng/spam/game";
import kaplayware from "./kaplayware";

const games = [
	getGame,
	spamGame,
];

const ware = kaplayware(games);
const k = ware.kCtx;

k.scene("game", () => {
	ware.runGame(games[0]).start();
});

k.scene("gameover", () => {
	k.debug.log(":(");
});

k.go("game");
