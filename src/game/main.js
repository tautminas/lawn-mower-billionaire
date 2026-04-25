import { Game as MainGame } from "./scenes/Game";
import { MainMenu } from "./scenes/MainMenu";
import { WinScene } from "./scenes/WinScene";
import { AUTO, Scale, Game } from "phaser";

// Find out more information about the Game Config at:
// https://docs.phaser.io/api-documentation/typedef/types-core#gameconfig
const config = {
  type: AUTO,
  width: 1024,
  height: 768,
  parent: "game-container",
  backgroundColor: "#a3d998",
  scale: {
    mode: Scale.FIT,
    autoCenter: Scale.CENTER_BOTH,
  },
  physics: {
    default: "arcade",
    // arcade: {
    //   debug: true,
    // },
  },
  scene: [MainGame, MainMenu, WinScene],
};

const StartGame = (parent) => {
  return new Game({ ...config, parent });
};

export default StartGame;
