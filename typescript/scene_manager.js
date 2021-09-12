"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneManager = void 0;
//　シーンの変化を管理するクラス
class SceneManager {
    constructor(app) {
        this.gameLoops = [];
        this.app = app;
    }
    addGameLoop(gameLoopFunction) {
        this.app.ticker.add(gameLoopFunction);
        this.gameLoops.push(gameLoopFunction);
    }
    removeAllGameLoops() {
        for (const gameLoop of this.gameLoops) {
            this.app.ticker.remove(gameLoop);
        }
        this.gameLoops = [];
    }
    removeAllScene() {
        for (const scene of this.app.stage.children) {
            this.app.stage.removeChild(scene);
        }
    }
}
exports.SceneManager = SceneManager;
//# sourceMappingURL=scene_manager.js.map