import Phaser from "phaser";
import OptionsScene from "./OptionsScene";

class WelcomeScene extends Phaser.Scene {
  constructor() {
    super("WelcomeScene");
    this.soundsOn = true;
  }
  preload() {
    // general
    this.uiAssets();

    // WelcomeScene
    this.load.image(
      "welcomebg",
      "/public/assets/louiseffa226/1_Main Menu Screen/bg.png"
    );
    this.load.image("progress", "/public/assets/progress.png");
    this.load.image("progress2", "/public/assets/progress2.png");

    //  startscene
    this.startSceneAssets();

    //GameScene
    this.gameSceneAssets();

    // EndScene
    this.endSceneAssets();
  }
  uiAssets() {
    this.load.image(
      "logo",
      "/public/assets/louiseffa226/1_Main Menu Screen/logo.png"
    );
    this.load.image(
      "settingBtn",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn (1).png"
    );
    this.load.image(
      "tutorialBtn",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn (2).png"
    );
    this.load.image(
      "journalBtn",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn (3).png"
    );
    this.load.image(
      "playBtn",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn_play (1).png"
    );
    this.load.image(
      "playBtnHover",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn_hover (1).png"
    );

    this.load.image(
      "friendsBtn",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn_play (2).png"
    );
    this.load.image(
      "friendsBtnHover",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn_hover (2).png"
    );
    this.load.image(
      "crossBtn",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn (4).png"
    );
    this.load.image(
      "writtingBox",
      "/public/assets/louiseffa226/1_Main Menu Screen/btn (5).png"
    );
    this.load.image(
      "flowerIcon",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/icons (1).png"
    );
    this.load.image(
      "timeIcon",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/icons (2).png"
    );
    this.load.image(
      "diamondIcon",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/icons (3).png"
    );
  }
  startSceneAssets() {
    this.load.image(
      "startbg",
      "/public/assets/louiseffa226/1_Main Menu Screen/bg.png"
    );
    // startScene Imotional check
    this.load.image(
      "board",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/board.png"
    );
    this.load.image(
      "checkmark",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/checkmark.png"
    );
    this.load.image(
      "boardBtn1",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/btn (1).png"
    );
    this.load.image(
      "boardBtn1Hover",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/btn_hover (1).png"
    );
    this.load.image(
      "boardBtn2",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/btn (2).png"
    );
    this.load.image(
      "boardBtn2Hover",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/btn_hover (2).png"
    );
    for (let i = 1; i <= 5; i++) {
      this.load.image(
        `emoji${i}`,
        `/public/assets/louiseffa226/2_Emotional Check-In Screen/emoji (${i}).png`
      );
    }
    this.load.image(
      "emojibg1",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/emoji_bg (1).png"
    );
    this.load.image(
      "emojibg2",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/emoji_bg (2).png"
    );
    this.load.image(
      "emojiPanel",
      "/public/assets/louiseffa226/2_Emotional Check-In Screen/panel.png"
    );
    // Start scene Setting Btn
    this.load.image(
      "setting_bar1",
      "/public/assets/louiseffa226/9_settings/bar (1).png"
    );
    this.load.image(
      "setting_bar2",
      "/public/assets/louiseffa226/9_settings/bar (2).png"
    );
    this.load.image(
      "setting_bar3",
      "/public/assets/louiseffa226/9_settings/bar (3).png"
    );
    this.load.image(
      "setting_board",
      "/public/assets/louiseffa226/9_settings/board.png"
    );
    this.load.image(
      "setting_btn1",
      "/public/assets/louiseffa226/9_settings/btn (1).png"
    );
    this.load.image(
      "setting_btn2",
      "/public/assets/louiseffa226/9_settings/btn (3).png"
    );
    this.load.image(
      "setting_crossBtn",
      "/public/assets/louiseffa226/9_settings/btn (2).png"
    );
    this.load.image(
      "setting_soundIcon",
      "/public/assets/louiseffa226/9_settings/icon.png"
    );
    this.load.image(
      "setting_panel",
      "/public/assets/louiseffa226/9_settings/panel (2).png"
    );
    this.load.image(
      "setting_left",
      "/public/assets/louiseffa226/9_settings/panel (3).png"
    );
    this.load.image(
      "setting_right",
      "/public/assets/louiseffa226/9_settings/panel (1).png"
    );
    this.load.image(
      "setting_checkmarkOn",
      "/public/assets/louiseffa226/9_settings/tick (1).png"
    );
    this.load.image(
      "setting_checkmarkOff",
      "/public/assets/louiseffa226/9_settings/tick (2).png"
    );
    // startScene Journal Board
    this.load.image(
      "journal_board",
      "/public/assets/louiseffa226/8_Journal Screen/board.png"
    );
    this.load.image(
      "journal_pdfBtn1",
      "/public/assets/louiseffa226/8_Journal Screen/btn (1).png"
    );
    this.load.image(
      "journal_pdfBtn2",
      "/public/assets/louiseffa226/8_Journal Screen/btn (2).png"
    );
    this.load.image(
      "journal_writeIcon",
      "/public/assets/louiseffa226/8_Journal Screen/icon (1).png"
    );
    this.load.image(
      "journal_crossBtn",
      "/public/assets/louiseffa226/8_Journal Screen/icon (2).png"
    );
    this.load.image(
      "journal_panel_long",
      "/public/assets/louiseffa226/8_Journal Screen/panels (1).png"
    );
    this.load.image(
      "journal_panel_rect",
      "/public/assets/louiseffa226/8_Journal Screen/panels (2).png"
    );
    this.load.image(
      "journal_panel_square",
      "/public/assets/louiseffa226/8_Journal Screen/panels (3).png"
    );
    this.load.image(
      "journal_panel_rect_solid",
      "/public/assets/louiseffa226/8_Journal Screen/panels (4).png"
    );
    this.load.image(
      "journal_title_on",
      "/public/assets/louiseffa226/8_Journal Screen/title (1).png"
    );
    this.load.image(
      "journal_title_off",
      "/public/assets/louiseffa226/8_Journal Screen/title (2).png"
    );
  }
  gameSceneAssets() {
    // ground
    this.load.image(
      "ground",
      "/public/assets/louiseffa226/4_Gameplay Screen/ground.png"
    );
    //scoreAssets
    this.load.image(
      "diamond",
      "/public/assets/louiseffa226/4_Gameplay Screen/UI/iteams (2).png"
    );
    this.load.image(
      "flower",
      "/public/assets/louiseffa226/4_Gameplay Screen/UI/iteams (1).png"
    );

    this.gameUiAssets();
    this.backgroundAndObstacles();
    this.playerAssets();
    this.pauseAssets();
  }
  backgroundAndObstacles() {
    // backgrounds
    this.load.image(
      "game_beachBgStart",
      "/public/assets/louiseffa226/4_Gameplay Screen/Beach background (1).png"
    );
    this.load.image(
      "game_beachBg",
      "/public/assets/louiseffa226/4_Gameplay Screen/Beach background (2).png"
    );
    this.load.image(
      "game_beachBgEnd",
      "/public/assets/louiseffa226/4_Gameplay Screen/Beach background.png"
    );
    this.load.image(
      "game_forestBgStart",
      "/public/assets/louiseffa226/4_Gameplay Screen/forest_bg.png"
    );
    this.load.image(
      "game_forestBg",
      "/public/assets/louiseffa226/4_Gameplay Screen/forest_bg (2).png"
    );
    this.load.image(
      "game_forestBgEnd",
      "/public/assets/louiseffa226/4_Gameplay Screen/forest_bg (1).png"
    );
    this.load.image(
      "game_mountainsBgStart",
      "/public/assets/louiseffa226/4_Gameplay Screen/mountains background (1).png"
    );
    this.load.image(
      "game_mountainsBg",
      "/public/assets/louiseffa226/4_Gameplay Screen/mountains background (3).png"
    );
    this.load.image(
      "game_mountainsBgEnd",
      "/public/assets/louiseffa226/4_Gameplay Screen/mountains background (2).png"
    );

    // Obstacles
    this.load.image(
      "game_pressureObstacle",
      "/public/assets/louiseffa226/4_Gameplay Screen/Obstacles (4).png"
    );
    this.load.image(
      "game_socialNegativityObstacle",
      "/public/assets/louiseffa226/4_Gameplay Screen/Obstacles (5).png"
    );
    this.load.image(
      "game_fearObstacle",
      "/public/assets/louiseffa226/4_Gameplay Screen/Obstacles (6).png"
    );
    this.load.image(
      "game_AnxiousThoughtsObstacle",
      "/public/assets/louiseffa226/4_Gameplay Screen/Obstacles (8).png"
    );
  }
  gameUiAssets() {
    this.load.image(
      "game_affirmationsCollectedBar",
      "/public/assets/louiseffa226/4_Gameplay Screen/UI/btn_ui (1).png"
    );
    this.load.image(
      "game_diamondBar",
      "/public/assets/louiseffa226/4_Gameplay Screen/UI/btn_ui (2).png"
    );
    this.load.image(
      "game_timePlayedBar",
      "/public/assets/louiseffa226/4_Gameplay Screen/UI/btn_ui (3).png"
    );
    this.load.image(
      "game_pauseBtn",
      "/public/assets/louiseffa226/4_Gameplay Screen/UI/btn_ui (4).png"
    );
  }
  playerAssets() {
    this.load.spritesheet(
      "stay",
      "/public/assets/louiseffa226/player/stay.png",
      {
        frameWidth: 426 / 4,
        frameHeight: 200,
      }
    );
    this.load.spritesheet("run", "/public/assets/louiseffa226/player/run.png", {
      frameWidth: (563 * 2) / 6,
      frameHeight: 98 * 2,
    });
    this.load.spritesheet(
      "jump",
      "/public/assets/louiseffa226/player/jump.png",
      {
        frameWidth: (686 * 2) / 9,
        frameHeight: 100 * 2,
      }
    );
    this.load.spritesheet(
      "slip",
      "/public/assets/louiseffa226/player/slip.png",
      {
        frameWidth: 1836 / 9,
        frameHeight: 196,
      }
    );
    this.load.spritesheet(
      "fall",
      "/public/assets/louiseffa226/player/fall.png",
      {
        frameWidth: (465 * 2) / 5,
        frameHeight: 90 * 2,
      }
    );
  }
  pauseAssets() {
    this.load.image(
      "pause_board",
      "/public/assets/louiseffa226/5_Pause Zone/UPD_boad (1).png"
    );
    this.load.image(
      "pause_resumeBtn",
      "/public/assets/louiseffa226/5_Pause Zone/UPD_btn (3).png"
    );
    this.load.image(
      "pause_journalBtn",
      "/public/assets/louiseffa226/5_Pause Zone/UPD_btn (2).png"
    );
    this.load.image(
      "pause_playBtn",
      "/public/assets/louiseffa226/5_Pause Zone/UPD_btn (1).png"
    );
  }
  endSceneAssets() {
    this.load.image(
      "end_board1",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/board (1).png"
    );
    this.load.image(
      "end_board2",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/board (2).png"
    );
    this.load.image(
      "end_restartBtnHover",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/btn (1).png"
    );
    this.load.image(
      "end_menuBtnHover",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/btn (2).png"
    );
    this.load.image(
      "end_viewJournalBtnHover",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/btn (3).png"
    );
    this.load.image(
      "end_restartBtn",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/btn_hover (1).png"
    );
    this.load.image(
      "end_menuBtn",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/btn_hover (2).png"
    );
    this.load.image(
      "end_viewJournalBtn",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/btn_hover (3).png"
    );
    this.load.image(
      "end_achievementBoard",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/Achievements (2).png"
    );
    this.load.image(
      "end_achievement1",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/Achievements (1).png"
    );
    this.load.image(
      "end_achievement2",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/Achievements (4).png"
    );
    this.load.image(
      "end_achievement3",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/Achievements (3).png"
    );
    this.load.image(
      "end_panel",
      "/public/assets/louiseffa226/7_End-of-Game Summary Screen/panel.png"
    );
  }

  create() {
    let bg = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "welcomebg")
      .setDisplaySize(this.scale.width, this.scale.height);

    let logo = this.add
      .image(this.scale.width / 2, this.scale.height / 2.3, "logo")
      .setDisplaySize(this.scale.width / 2, this.scale.height / 2);

    let width = this.scale.width;
    let height = this.scale.height * 0.9;

    let pwidth = width * 0.69;
    let pheight = 30;

    let progressBox = this.add.image(
      this.scale.width / 2,
      this.scale.height * 0.9,
      "progress"
    );
    progressBox.setDisplaySize(this.scale.width * 0.7, 40);

    let progressBox2 = this.add
      .image(this.scale.width / 2, this.scale.height * 0.9, "progress2")
      .setDepth(3);
    progressBox2.setDisplaySize(this.scale.width * 0.7, 40);
    let progressBar = this.add.graphics();

    let time = 0;
    let timer = this.time.addEvent({
      delay: 20,
      callback: () => {
        progressBar.clear();
        progressBar.fillStyle(0x60c340, 1);
        progressBar.fillRect(
          width / 2 - pwidth / 2 + 2,
          height - pheight / 2,
          pwidth * time,
          pheight
        );
        // phaser = DOMStringList;
        if (time >= 1) {
          this.time.removeEvent(timer);
          this.tweens.add({
            targets: [progressBar, progressBox, progressBox2],
            alpha: 0, // Fade to invisible
            duration: 1000, // Duration in milliseconds
            onComplete: () => {
              bg.destroy();
              logo.destroy();
              progressBar.destroy();
              progressBox.destroy();
              progressBox2.destroy();

              // this.scene.start("GameScene");
              this.scene.start("StartScene");
              this.game.scene.add("OptionsScene", new OptionsScene(), true);
            },
          });
          this.tweens.add({
            targets: [bg, logo],
            alpha: 0.5,
            duration: 1000,
            onComplete: () => {
              bg.destroy();
              logo.destroy();
            },
          });
        } else {
          time += 0.01;
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
}

export default WelcomeScene;
