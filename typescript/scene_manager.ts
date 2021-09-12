import * as PIXI from "pixi.js";

export class SceneManager{
    private gameLoops = [];
    private app: PIXI.Application;
    constructor(app: PIXI.Application){
        this.app = app;
    }

    addGameLoop(gameLoopFunction){
        this.app.ticker.add(gameLoopFunction);
        this.gameLoops.push(gameLoopFunction);
    }

    removeAllGameLoops()
    {
        for (const gameLoop of this.gameLoops){
            this.app.ticker.remove(gameLoop);
        }
        this.gameLoops = [];
    }
    
    removeAllScene(){
        for (const scene of this.app.stage.children){
            this.app.stage.removeChild(scene);
        }
    }
}