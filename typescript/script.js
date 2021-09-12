"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PIXI = require("pixi.js"); // node_modulesから PIXI.jsをインポート
const PIXI_SOUND = require("pixi-sound"); // node_modulesから PIXI_SOUNDをインポート
const scene_manager_1 = require("./scene_manager"); // シーン管理を行うクラスをインポート
const create_button_1 = require("./create_button"); // ボタン生成関数をインポート
PIXI_SOUND.default.init();
const app = new PIXI.Application({ width: 800, height: 600 });
document.body.appendChild(app.view);
app.renderer.view.style.position = "relative";
app.renderer.view.style.width = "800px";
app.renderer.view.style.height = "600px";
app.renderer.view.style.display = "block";
app.renderer.view.style.border = "2px dashed black";
app.renderer.backgroundColor = 0x212121;
PIXI.Loader.shared.add('hit', "sound/hit.mp3");
PIXI.Loader.shared.add('player', 'images/jiki.png');
PIXI.Loader.shared.add('enemy', 'images/teki.png');
PIXI.Loader.shared.add('enemy_anim', 'images/teki_anim000.json');
PIXI.Loader.shared.add('bullet', "images/tama01.png");
const sceneManager = new scene_manager_1.SceneManager(app);
PIXI.Loader.shared.load((loader, resources) => {
    let score = 0;
    let e_x = 100;
    let e_y = 100;
    let timeCounter = 20;
    let timecount = 0;
    function mainGameScene() {
        sceneManager.removeAllScene();
        sceneManager.removeAllGameLoops();
        const gameScene = new PIXI.Container();
        app.stage.addChild(gameScene);
        score = 0;
        timeCounter = 20;
        timecount = 0;
        const enemy = new PIXI.Graphics();
        enemy.beginFill(0xffffff, 0.6);
        enemy.drawCircle(0, 0, 10);
        enemy.interactive = true;
        enemy.on("pointerdown", () => {
            score++;
            resources["hit"].sound.play();
            e_x = Math.random() * 600 + 100;
            e_y = Math.random() * 300 + 100;
        });
        gameScene.addChild(enemy);
        const aim = new PIXI.Graphics();
        aim.beginFill(0xffffff, 0.6);
        aim.drawCircle(0, 0, 10);
        gameScene.addChild(aim);
        const textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 20,
            fill: 0xfcbb08,
            dropShadow: true,
            dropShadowDistance: 2,
        });
        const timerText = new PIXI.Text(`TIME:${timeCounter}`, textStyle);
        timerText.anchor.x = 0.5;
        timerText.x = 100;
        timerText.y = 100;
        gameScene.addChild(timerText);
        function gameLoop() {
            enemy.x = e_x;
            enemy.y = e_y;
            if (timecount > 120) {
                timeCounter = timeCounter - 1;
                timecount = 0;
            }
            else {
                timecount++;
            }
            timerText.text = `TIME:${timeCounter}`;
            aim.x = app.renderer.plugins.interaction.mouse.global.x;
            aim.y = app.renderer.plugins.interaction.mouse.global.y;
            if (timeCounter == 0) {
                EndScene();
            }
        }
        sceneManager.addGameLoop(gameLoop);
    }
    function EndScene() {
        sceneManager.removeAllScene();
        sceneManager.removeAllGameLoops();
        const endScene = new PIXI.Container();
        app.stage.addChild(endScene);
        const textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 32,
            fill: 0xfcbb08,
            dropShadow: true,
            dropShadowDistance: 2,
        });
        const text = new PIXI.Text(`GAME OVER`, textStyle);
        text.anchor.x = 0.5;
        text.x = 400;
        text.y = 200;
        endScene.addChild(text);
        const scoreText = new PIXI.Text(`SCORE:${score}`, textStyle);
        scoreText.anchor.x = 0.5;
        scoreText.x = 400;
        scoreText.y = 300;
        endScene.addChild(scoreText);
        const retryButton = create_button_1.createButton("continue", 100, 60, 0xff0000, () => {
            mainGameScene();
        });
        retryButton.x = 650;
        retryButton.y = 500;
        endScene.addChild(retryButton);
    }
    mainGameScene();
});
//# sourceMappingURL=script.js.map