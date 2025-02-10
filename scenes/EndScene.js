import Phaser from "phaser";

class EndScene extends Phaser.Scene {
  constructor() {
    super("EndScene");
    this.affirmationsCollected = 0;
    this.strengthTokenEarned = 0;
    this.totalTimePlayed = 0;
  }

  create(data) {
    this.affirmationsCollected = data.strengthTokenEarned || 0;
    this.strengthTokenEarned = data.affirmationsCollected || 0;
    this.totalTimePlayed = data.timePlayed || 0;
    this.endSceneArray = [];
    this.endSceneBg = this.add
      .rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        this.scale.width,
        this.scale.height,
        0x777777
      )
      .setOrigin(0.5, 0.5);
    this.endSceneBoard = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.49, "end_board1")
      .setDisplaySize(this.scale.width * 0.7, this.scale.height * 0.9);
    this.endSceneBoardText = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.18,
        "You are stronger than yesterday. Keep going!",
        {
          fontFamily: "font2",
          fontSize: "32px",
          color: "#dddddd",
        }
      )
      .setOrigin(0.5, 0.5);
    this.EndScenePanel = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.4, "end_panel")
      .setDisplaySize(this.scale.width * 0.38, this.scale.height * 0.23)
      .setOrigin(0.5, 0.5);

    this.endSceneFlowerIcon = this.add
      .image(this.scale.width * 0.37, this.scale.height * 0.34, "flowerIcon")
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);
    this.endSceneFlowerText = this.add
      .text(
        this.scale.width * 0.37,
        this.scale.height * 0.42,
        "Affirmations\nCollected:",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.endSceneFlowerScore = this.add
      .text(
        this.scale.width * 0.37,
        this.scale.height * 0.48,
        this.affirmationsCollected,
        {
          fontFamily: "font2",
          fontSize: "38px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.endSceneDiamondIcon = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.34, "diamondIcon")
      .setDisplaySize(80, 70)
      .setOrigin(0.5, 0.5);
    this.endSceneDiamondText = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.42,
        "Strength Tokens\nEarned:",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.endSceneDiamondScore = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.48,
        this.strengthTokenEarned,
        {
          fontFamily: "font2",
          fontSize: "38px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.endSceneTimeIcon = this.add
      .image(this.scale.width * 0.64, this.scale.height * 0.34, "timeIcon")
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);
    this.endSceneTimeText = this.add
      .text(
        this.scale.width * 0.64,
        this.scale.height * 0.42,
        "Total Time\nPlayed:",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.endSceneTimeValue = this.add
      .text(
        this.scale.width * 0.64,
        this.scale.height * 0.48,
        Math.floor(this.totalTimePlayed / 60) +
          ":" +
          (this.totalTimePlayed % 60),
        {
          fontFamily: "font2",
          fontSize: "38px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.endSceneAchievement1 = this.add
      .image(
        this.scale.width * 0.33,
        this.scale.height * 0.68,
        "end_achievement1"
      )
      .setDisplaySize(300, 300)
      .setOrigin(0.5, 0.5);
    this.endSceneAchievement2 = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.68,
        "end_achievement2"
      )
      .setDisplaySize(300, 300)
      .setOrigin(0.5, 0.5);
    this.endSceneAchievement3 = this.add
      .image(
        this.scale.width * 0.67,
        this.scale.height * 0.68,
        "end_achievement3"
      )
      .setDisplaySize(300, 300)
      .setOrigin(0.5, 0.5);

    this.restartBtn = this.add
      .image(
        this.scale.width * 0.28,
        this.scale.height * 0.88,
        "end_restartBtn"
      )
      .setDisplaySize(300, 100)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
        this.restartBtn.setTexture("end_restartBtnHover");
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
        this.restartBtn.setTexture("end_restartBtn");
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.restartBtn,
          scale: 0.85,
          duration: 100,
          onComplete: () => {
            this.tweens.add({
              targets: this.restartBtn,
              scale: 1,
              duration: 100,
              onComplete: () => {
                this.scene.stop();
                this.scene.start("GameScene");
              },
            });
          },
        });
        document.body.style.cursor = "default";
      });

    this.viewJournalBtn = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.88,
        "end_viewJournalBtn"
      )
      .setDisplaySize(300, 100)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
        this.viewJournalBtn.setTexture("end_viewJournalBtnHover");
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
        this.viewJournalBtn.setTexture("end_viewJournalBtn");
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.viewJournalBtn,
          scale: 0.85,
          duration: 100,
          onComplete: () => {
            this.tweens.add({
              targets: this.viewJournalBtn,
              scale: 1,
              duration: 100,
              onComplete: () => {
                this.journalBtnAction();
              },
            });
          },
        });
        document.body.style.cursor = "default";
      });

    this.menuBtn = this.add
      .image(this.scale.width * 0.72, this.scale.height * 0.88, "end_menuBtn")
      .setDisplaySize(300, 100)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
        this.menuBtn.setTexture("end_menuBtnHover");
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
        this.menuBtn.setTexture("end_menuBtn");
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.menuBtn,
          scale: 0.85,
          duration: 100,
          onComplete: () => {
            this.tweens.add({
              targets: this.menuBtn,
              scale: 1,
              duration: 100,
              onComplete: () => {
                this.scene.stop();
                this.scene.start("StartScene");
              },
            });
          },
        });
        document.body.style.cursor = "default";
      });
    this.endSceneArray.push(
      this.endSceneBg,
      this.endSceneBoard,
      this.endSceneBoardText,
      this.EndScenePanel,
      this.endSceneFlowerIcon,
      this.endSceneFlowerText,
      this.endSceneFlowerScore,
      this.endSceneDiamondIcon,
      this.endSceneDiamondText,
      this.endSceneDiamondScore,
      this.endSceneTimeIcon,
      this.endSceneTimeText,
      this.endSceneTimeValue,
      this.endSceneAchievement1,
      this.endSceneAchievement2,
      this.endSceneAchievement3,
      this.restartBtn,
      this.viewJournalBtn,
      this.menuBtn
    );
    for (let i = 0; i < this.endSceneArray.length; i++) {
      this.endSceneArray[i].setAlpha(0);
    }
    for (let i = 0; i < this.endSceneArray.length; i++) {
      this.tweens.add({
        targets: [this.endSceneArray[i]],
        alpha: 1,
        duration: 500,
      });
    }
  }
  journalBtnAction() {
    this.journalArray = [];
    this.journalOptionArray = [];
    this.journalBoardOn = true;
    this.journalOption = 1;

    this.journalBg = this.add
      .rectangle(
        this.scale.width / 2,
        this.scale.height / 2,
        this.scale.width,
        this.scale.height,
        0x777777
      )
      .setOrigin(0.5, 0.5);
    this.journalBoard = this.add
      .image(this.scale.width / 2, this.scale.height / 2.1, "journal_board")
      .setDisplaySize(this.scale.width / 1.4, this.scale.height / 1.2);
    this.DailyReflectionsImg = this.add
      .image(
        this.scale.width * 0.32,
        this.scale.height * 0.13,
        "journal_title_off"
      )
      .setDisplaySize(250, 100)
      .setOrigin(0.5, 0)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.DailyReflectionsImg,
          scaleY: 1.2,
          duration: 200,
          onComplete: () => {
            this.DailyReflectionsImg.setTexture("journal_title_on");
            this.journalOption = 1;
            this.openJournalOption();
          },
        });
        document.body.style.cursor = "default";
      });

    this.DailyReflectionsText = this.add
      .text(
        this.scale.width * 0.32,
        this.scale.height * 0.16,
        "Daily Reflections",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#bbbbbb",
        }
      )
      .setOrigin(0.5, 0);
    this.AffirmationsCollectedImg = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.13,
        "journal_title_off"
      )
      .setDisplaySize(290, 100)
      .setOrigin(0.5, 0)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.AffirmationsCollectedImg,
          scaleY: 1.2,
          duration: 200,
          onComplete: () => {
            this.AffirmationsCollectedImg.setTexture("journal_title_on");
            this.journalOption = 2;
            this.openJournalOption();
          },
        });
        document.body.style.cursor = "default";
      });

    this.AffirmationsCollectedText = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.16,
        "Affirmations Collected",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#bbbbbb",
        }
      )
      .setOrigin(0.5, 0);
    this.GoalsAndProgressImg = this.add
      .image(
        this.scale.width * 0.68,
        this.scale.height * 0.13,
        "journal_title_off"
      )
      .setDisplaySize(250, 100)
      .setOrigin(0.5, 0)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.GoalsAndProgressImg,
          scaleY: 1.2,
          duration: 200,
          onComplete: () => {
            this.GoalsAndProgressImg.setTexture("journal_title_on");
            this.journalOption = 3;
            this.openJournalOption();
          },
        });
        document.body.style.cursor = "default";
      });

    this.GoalsAndProgressText = this.add
      .text(
        this.scale.width * 0.68,
        this.scale.height * 0.16,
        "Goals and Progress",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#bbbbbb",
        }
      )
      .setOrigin(0.5, 0);
    this.journalCrossBtn = this.add
      .image(this.scale.width * 0.81, this.scale.height * 0.08, "crossBtn")
      .setDisplaySize(100, 80)
      .setOrigin(0.5, 0)
      .setAlpha(0.001);
    this.journalCrossBtn
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        this.journalArray[this.journalArray.length - 1].destroy();
        for (let i = 0; i < this.journalArray.length - 1; i++) {
          this.tweens.add({
            targets: [this.journalArray[i]],
            alpha: 0.1,
            duration: 500,
            onComplete: () => {
              this.journalArray[i].destroy();
            },
          });
        }
        for (let i = 0; i < this.journalOptionArray.length; i++) {
          this.tweens.add({
            targets: [this.journalOptionArray[i]],
            alpha: 0.1,
            duration: 500,
            onComplete: () => {
              this.journalOptionArray[i].destroy();
            },
          });
        }
        for (let i = 0; i < this.endSceneArray.length; i++) {
          this.endSceneArray[i].setAlpha(1);
        }
        this.settingBarOn = false;
        document.body.style.cursor = "default";
      });

    this.journalArray.push(
      this.journalBg,
      this.journalBoard,
      this.DailyReflectionsImg,
      this.DailyReflectionsText,
      this.AffirmationsCollectedImg,
      this.AffirmationsCollectedText,
      this.GoalsAndProgressImg,
      this.GoalsAndProgressText,
      this.journalCrossBtn
    );
    this.openJournalOption();
  }
  openJournalOption() {
    if (this.journalOption == 1) {
      this.DailyReflectionsImg.setTexture("journal_title_on");
      this.DailyReflectionsText.y = this.scale.height * 0.18;
      this.AffirmationsCollectedImg.setTexture("journal_title_off");
      this.AffirmationsCollectedText.y = this.scale.height * 0.16;
      this.GoalsAndProgressImg.setTexture("journal_title_off");
      this.GoalsAndProgressText.y = this.scale.height * 0.16;
      this.openDailyReflections();
    } else if (this.journalOption == 2) {
      this.AffirmationsCollectedImg.setTexture("journal_title_on");
      this.AffirmationsCollectedText.y = this.scale.height * 0.18;
      this.DailyReflectionsImg.setTexture("journal_title_off");
      this.DailyReflectionsText.y = this.scale.height * 0.16;
      this.GoalsAndProgressImg.setTexture("journal_title_off");
      this.GoalsAndProgressText.y = this.scale.height * 0.16;
      this.openAffirmationsCollected();
    } else if (this.journalOption == 3) {
      this.GoalsAndProgressImg.setTexture("journal_title_on");
      this.GoalsAndProgressText.y = this.scale.height * 0.18;
      this.DailyReflectionsImg.setTexture("journal_title_off");
      this.DailyReflectionsText.y = this.scale.height * 0.16;
      this.AffirmationsCollectedImg.setTexture("journal_title_off");
      this.AffirmationsCollectedText.y = this.scale.height * 0.16;
      this.openGoalsAndProgress();
    }
  }
  openDailyReflections() {
    if (this.journalOptionArray) {
      for (let i = 0; i < this.journalOptionArray.length; i++) {
        this.journalOptionArray[i].destroy();
      }
    }
    this.DailyReflectionsPanel = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        "journal_panel_rect_solid"
      )
      .setDisplaySize(this.scale.width * 0.45, this.scale.height * 0.32)
      .setOrigin(0.5, 0.5);

    this.DailyReflectionsFlowerIcon = this.add
      .image(this.scale.width * 0.36, this.scale.height * 0.41, "flowerIcon")
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);
    this.DailyReflectionsFlowerText = this.add
      .text(
        this.scale.width * 0.36,
        this.scale.height * 0.5,
        "Affirmations\nCollected:",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.DailyReflectionsFlowerScore = this.add
      .text(
        this.scale.width * 0.36,
        this.scale.height * 0.57,
        this.affirmationsCollected,
        {
          fontFamily: "font2",
          fontSize: "38px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.DailyReflectionsDiamondIcon = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.41, "diamondIcon")
      .setDisplaySize(80, 70)
      .setOrigin(0.5, 0.5);
    this.DailyReflectionsDiamondText = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        "Strength Tokens\nEarned:",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.DailyReflectionsDiamondScore = this.add
      .text(
        this.scale.width * 0.5,
        this.scale.height * 0.57,
        this.strengthTokenEarned,
        {
          fontFamily: "font2",
          fontSize: "38px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.DailyReflectionsTimeIcon = this.add
      .image(this.scale.width * 0.64, this.scale.height * 0.41, "timeIcon")
      .setDisplaySize(80, 80)
      .setOrigin(0.5, 0.5);
    this.DailyReflectionsTimeText = this.add
      .text(
        this.scale.width * 0.64,
        this.scale.height * 0.5,
        "Total Time\nPlayed:",
        {
          fontFamily: "font2",
          fontSize: "22px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);
    this.DailyReflectionsTimeValue = this.add
      .text(
        this.scale.width * 0.64,
        this.scale.height * 0.57,
        Math.floor(this.totalTimePlayed / 60) +
          ":" +
          (this.totalTimePlayed % 60),
        {
          fontFamily: "font2",
          fontSize: "38px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5);

    this.journalOptionArray.push(
      this.DailyReflectionsPanel,
      this.DailyReflectionsFlowerIcon,
      this.DailyReflectionsFlowerText,
      this.DailyReflectionsFlowerScore,
      this.DailyReflectionsDiamondIcon,
      this.DailyReflectionsDiamondText,
      this.DailyReflectionsDiamondScore,
      this.DailyReflectionsTimeIcon,
      this.DailyReflectionsTimeText,
      this.DailyReflectionsTimeValue
    );
  }
  openAffirmationsCollected() {
    if (this.journalOptionArray) {
      for (let i = 0; i < this.journalOptionArray.length; i++) {
        this.journalOptionArray[i].destroy();
      }
    }
    this.AffirmationsCollectedPanel = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        "journal_panel_rect_solid"
      )
      .setDisplaySize(this.scale.width * 0.45, this.scale.height * 0.32)
      .setOrigin(0.5, 0.5);

    this.journalOptionArray.push(this.AffirmationsCollectedPanel);
  }
  openGoalsAndProgress() {
    if (this.journalOptionArray) {
      for (let i = 0; i < this.journalOptionArray.length; i++) {
        this.journalOptionArray[i].destroy();
      }
    }
    this.GoalsAndProgressPanel = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.5,
        "journal_panel_rect_solid"
      )
      .setDisplaySize(this.scale.width * 0.45, this.scale.height * 0.32)
      .setOrigin(0.5, 0.5);

    this.journalOptionArray.push(this.GoalsAndProgressPanel);
  }
}

export default EndScene;
