import * as PIXI from "pixi.js";
/**
 * ボタンを生成してオブジェクトを返す関数
 * @param text テキスト
 * @param width 横幅
 * @param height 縦幅
 */
export function createButton(text: string, width: number, height: number, color: number, onClick: () => void)
{
    const fontSize = 20;
    const buttonAlpha = 0.6; 
    const buttonContainer = new PIXI.Container();

    // ボタン作成
    const backColor = new PIXI.Graphics();
    backColor.beginFill(color, buttonAlpha);
    backColor.drawRect(0, 0, width, height);
    backColor.endFill(); 
    backColor.interactive = true;
    backColor.on("pointerdown", onClick);
    buttonContainer.addChild(backColor);

    const textStyle = new PIXI.TextStyle({
        fontFamily: "Arial",
        fontSize: fontSize,
        fill: 0xffffff,
        dropShadow: true,
        dropShadowDistance: 2,
    });

    const buttonText = new PIXI.Text(text, textStyle);
    buttonText.anchor.x = 0.5;
    buttonText.anchor.y = 0.5;
    buttonText.x = width / 2;
    buttonText.y = height / 2;
    buttonContainer.addChild(buttonText);
    return buttonContainer;
}