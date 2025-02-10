import Phaser from "phaser";

class GameScene extends Phaser.Scene {
  constructor() {
    super("GameScene");
  }

  create() {
    this.resetGame();
    this.optionsScene = this.scene.get("OptionsScene");
    this.cursors = this.input.keyboard.createCursorKeys();

    this.userUI();
    this.gameZone();
  }
  resetGame() {
    this.strengthTokenEarned = 0;
    this.affirmationsCollected = 0;
    this.totalTimePlayed = 0;
    this.timePlayed = 0;
    this.playing = true;
    this.speed = 5;
    this.state = 0;
    this.obstacleCallbackTime = 5000;
    this.scoreItemCallbackTime = 6000;

    this.overlapOnObstacleItem = false;
    this.overlapOnObstacleItem = false;
  }
  userUI() {
    this.diamondBar = this.add
      .image(50 + 75, 75, "game_diamondBar")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(150, 55)
      .setDepth(4);
    this.affirmationsBar = this.add
      .image(50 + 75, 75 + 70, "game_affirmationsCollectedBar")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(150, 55)
      .setDepth(4);
    this.timePlayedBar = this.add
      .image(this.scale.width * 0.5, 75, "game_timePlayedBar")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(150, 60)
      .setDepth(4);

    this.strengthTokenText = this.add
      .text(50 + 75 + 20, 75, this.strengthTokenEarned, {
        fontFamily: "font2",
        fontSize: "24px",
        color: "#5b0600",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(5);
    this.affirmationScoreText = this.add
      .text(50 + 75 + 20, 75 + 70, this.affirmationsCollected, {
        fontFamily: "font2",
        fontSize: "24px",
        color: "#5b0600",
        align: "center",
      })
      .setOrigin(0.5, 0.5)
      .setDepth(5);
    this.timePlayedText = this.add
      .text(
        this.scale.width * 0.5 + 15,
        75,
        Math.floor(this.timePlayed / 60) + ":" + (this.timePlayed % 60),
        {
          fontFamily: "font2",
          fontSize: "30px",
          color: "#5b0600",
          align: "center",
        }
      )
      .setOrigin(0.5, 0.5)
      .setDepth(5);

    this.pauseBtn = this.add
      .image(this.scale.width - 75, 75, "game_pauseBtn")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 50)
      .setDepth(5)
      .setTint(0xeeeeee)
      .setInteractive()
      .on("pointerover", () => {
        this.pauseBtn.clearTint();
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        this.pauseBtn.setTint(0xeeeeee);
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        this.player.anims.pause();
        this.socialNegativity.setVelocityX(0);
        this.anxiousThoughts.setVelocityX(0);
        this.fear.setVelocityX(0);
        this.pressure.setVelocityX(0);
        this.pauseBtn.setAlpha(0);
        this.pauseZone();
        for (let i = 0; i < 4; i++) {
          this.scoreItemArray[i].setVelocityX(0);
        }
      });
  }
  pauseZone() {
    this.playing = false;
    this.pauseArray = [];

    this.pauseBg = this.add
      .graphics()
      .fillStyle(0x000000, 0.5)
      .setDepth(10)
      .fillRect(0, 0, this.scale.width, this.scale.height);
    this.pauseBoard = this.add
      .image(this.scale.width * 0.5, this.scale.height * 0.53, "pause_board")
      .setOrigin(0.5, 0.5)
      .setDepth(10)
      .setDisplaySize(this.scale.width / 1.4, this.scale.height / 1.2);

    this.resumeBtn = this.add
      .image(
        this.scale.width * 0.28,
        this.scale.height * 0.88,
        "pause_resumeBtn"
      )
      .setDisplaySize(300, 100)
      .setOrigin(0.5, 0.5)
      .setInteractive()
      .setDepth(10)
      .setTint(0xdddddd)
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
        this.resumeBtn.clearTint();
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
        this.resumeBtn.setTint(0xdddddd);
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.resumeBtn,
          scale: 0.85,
          duration: 100,
          onComplete: () => {
            this.tweens.add({
              targets: this.resumeBtn,
              scale: 1,
              duration: 100,
              onComplete: () => {
                this.playing = true;
                for (let i = 0; i < this.pauseArray.length; i++) {
                  this.pauseArray[i].destroy();
                }
                this.player.anims.resume();
                this.pauseBtn.setAlpha(1);
                if (this.socialNegativity.x !== this.obstacleX) {
                  this.socialNegativity.setVelocityX(
                    this.adjustSpeed * this.speed
                  );
                }
                if (this.anxiousThoughts.x !== this.obstacleX) {
                  this.anxiousThoughts.setVelocityX(
                    this.adjustSpeed * this.speed
                  );
                }
                if (this.fear.x !== this.obstacleX) {
                  this.fear.setVelocityX(this.adjustSpeed * this.speed);
                }
                if (this.pressure.x !== this.obstacleX) {
                  this.pressure.setVelocityX(this.adjustSpeed * this.speed);
                }
                for (let i = 0; i < 4; i++) {
                  if (this.scoreItemArray[i].x !== this.obstacleX) {
                    this.scoreItemArray[i].setVelocityX(
                      this.adjustSpeed * this.speed
                    );
                  }
                }
              },
            });
          },
        });
        document.body.style.cursor = "default";
      });

    this.journalEntryBtn = this.add
      .image(
        this.scale.width * 0.5,
        this.scale.height * 0.88,
        "pause_journalBtn"
      )
      .setDisplaySize(300, 100)
      .setOrigin(0.5, 0.5)
      .setDepth(10)
      .setTint(0xdddddd)
      .setInteractive()
      .on("pointerover", () => {
        document.body.style.cursor = "pointer";
        this.journalEntryBtn.clearTint();
      })
      .on("pointerout", () => {
        document.body.style.cursor = "default";
        this.journalEntryBtn.setTint(0xdddddd);
      })
      .on("pointerdown", () => {
        this.tweens.add({
          targets: this.journalEntryBtn,
          scale: 0.85,
          duration: 100,
          onComplete: () => {
            this.tweens.add({
              targets: this.journalEntryBtn,
              scale: 0.9,
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
      .setDepth(10)
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

    this.pauseArray.push(
      this.pauseBg,
      this.pauseBoard,
      this.resumeBtn,
      this.journalEntryBtn,
      this.menuBtn
    );
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
    for (let i = 0; i < this.journalArray.length; i++) {
      this.journalArray[i].setDepth(10);
    }
    for (let i = 0; i < this.journalOptionArray.length; i++) {
      this.journalOptionArray[i].setDepth(10);
    }
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

  gameZone() {
    this.initializeAnimations();
    this.ground = this.physics.add
      .image(0, this.scale.height - 80, "ground")
      .setImmovable(true)
      .setGravityY(0)
      .setOrigin(0, 0);

    this.bg = this.add
      .tileSprite(
        0,
        this.scale.height,
        this.scale.width,
        this.scale.height,
        "game_forestBg"
      )
      .setOrigin(0, 1);
    // this.bgPosition = this.time.addEvent({
    //   delay: 500, // Varying delay
    //   loop: true,
    //   callback: () => {
    //     console.log((this.bg.tilePositionX%2459));
    //   },
    //   callbackScope: this,
    // });
    this.milestones = [400, 800, 1200, 1600, 2000];
    this.triggeredMilestones = new Set();
    this.player = this.physics.add
      .sprite(300, this.scale.height - 280, "player")
      .setGravityY(700)
      .setDepth(3)
      .setOrigin(0.5, 0)
      .setCollideWorldBounds(true);

    this.player.anims.play("run");
    this.player.body.setCircle(100, 0, 0);
    this.physics.add.collider(this.player, this.ground);

    this.animationComplete();
    this.createObstacles();
    this.createScoreItems();
    this.createCollider();
    this.timeUpdate();
  }

  timeUpdate() {
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        if (this.playing) {
          this.timePlayed += 1;
          this.timePlayedText.setText(
            Math.floor(this.timePlayed / 60) + ":" + (this.timePlayed % 60)
          );
        }
      },
      callbackScope: this,
      loop: true,
    });
  }
  initializeAnimations() {
    this.anims.create({
      key: "stay",
      frames: this.anims.generateFrameNumbers("stay", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("run", { start: 0, end: 5 }),
      frameRate: 7,
      repeat: -1,
    });
    this.anims.create({
      key: "jump",
      frames: this.anims.generateFrameNumbers("jump", {
        frames: [0, 1, 1, 2, 3, 4, 5, 6, 7, 7, 7, 8, 8],
      }),
      frameRate: 10,
    });
    this.anims.create({
      key: "slip",
      frames: this.anims.generateFrameNumbers("slip", { start: 0, end: 8 }),
      frameRate: 12,
    });
    this.anims.create({
      key: "fall",
      frames: this.anims.generateFrameNumbers("fall", { start: 0, end: 4 }),
      frameRate: 6,
    });
  }
  animationComplete() {
    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "jump" && this.player.body.velocity.y >= 0) {
        this.player.anims.play("run");
        this.state = 1;
      }
    });
    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "slip" && this.player.body.velocity.y >= 0) {
        this.player.anims.play("run");
        this.state = 1;
      }
    });
    this.player.on("animationcomplete", (animation) => {
      if (animation.key === "fall" && this.player.body.velocity.y >= 0) {
        this.gameOver();
      }
    });
  }
  createObstacles() {
    this.adjustSpeed = -60.8;
    this.obstacleX = this.scale.width + 920;
    this.obstacleY = this.scale.height - 100;
    let obstacleDisplaySizeScale = 0.8;
    this.socialNegativity = this.physics.add
      .sprite(
        this.obstacleX,
        this.obstacleY - 20,
        "game_socialNegativityObstacle"
      )
      .setDisplaySize(
        obstacleDisplaySizeScale * 222,
        obstacleDisplaySizeScale * 180
      );
    this.fear = this.physics.add
      .sprite(this.obstacleX, this.obstacleY, "game_fearObstacle")
      .setDisplaySize(
        obstacleDisplaySizeScale * 222,
        obstacleDisplaySizeScale * 180
      );

    this.pressure = this.physics.add
      .sprite(this.obstacleX, this.obstacleY - 20, "game_pressureObstacle")
      .setDisplaySize(
        obstacleDisplaySizeScale * 222,
        obstacleDisplaySizeScale * 180
      );
    this.anxiousThoughts = this.physics.add
      .sprite(
        this.obstacleX,
        this.obstacleY - 200,
        "game_AnxiousThoughtsObstacle"
      )
      .setDisplaySize(
        obstacleDisplaySizeScale * 222 * 1.2,
        obstacleDisplaySizeScale * 180 * 1.2
      )
      .setDepth(4);
    this.socialNegativity.setCircle(10, 100, 80);
    this.fear.setCircle(20, 160, 40);
    this.pressure.setCircle(10, 90, 80);
    this.anxiousThoughts.setCircle(20, 160, 90);
    this.startObstacleUpdate();
  }
  startObstacleUpdate() {
    if (this.obstacleEvent) {
      this.obstacleEvent.remove(); // Remove any existing event to prevent duplicates
    }

    // this.obstacleEvent = this.time.addEvent({
    //   delay: 4000 + Math.random() * 2000, // Varying delay
    //   loop: true,
    //   callback: this.updateObstacles,
    //   callbackScope: this, // Ensures 'this' refers to the game object
    // });
  }

  updateObstacles() {
    if (!this.playing) return;

    let selectObstacle = Math.random() * 10;
    const tolerance = 1; // Fix floating-point comparison issue

    if (
      selectObstacle < 2.5 &&
      this.socialNegativity &&
      Math.abs(this.socialNegativity.x - this.obstacleX) < tolerance
    ) {
      this.socialNegativity.setVelocityX(this.adjustSpeed * this.speed);
    } else if (
      selectObstacle < 5 &&
      this.fear &&
      Math.abs(this.fear.x - this.obstacleX) < tolerance
    ) {
      this.fear.setVelocityX(this.adjustSpeed * this.speed);
    } else if (
      selectObstacle < 7.5 &&
      this.anxiousThoughts &&
      Math.abs(this.anxiousThoughts.x - this.obstacleX) < tolerance
    ) {
      this.anxiousThoughts.setVelocityX(this.adjustSpeed * this.speed);
    } else if (
      this.pressure &&
      Math.abs(this.pressure.x - this.obstacleX) < tolerance
    ) {
      this.pressure.setVelocityX(this.adjustSpeed * this.speed);
    }
  }

  createScoreItems() {
    this.obstacleY = this.scale.height - 200;
    let scoreItemDisplaySize = 60;
    this.scoreItemArray = [];
    this.diamond1 = this.physics.add
      .sprite(this.obstacleX, this.obstacleY - 20, "diamond")
      .setDisplaySize(scoreItemDisplaySize, scoreItemDisplaySize * 0.8);
    this.diamond2 = this.physics.add
      .sprite(this.obstacleX, this.obstacleY - 20, "diamond")
      .setDisplaySize(scoreItemDisplaySize, scoreItemDisplaySize * 0.8);
    this.diamond3 = this.physics.add
      .sprite(this.obstacleX, this.obstacleY - 20, "diamond")
      .setDisplaySize(scoreItemDisplaySize, scoreItemDisplaySize * 0.8);
    this.flower = this.physics.add
      .sprite(this.obstacleX, this.obstacleY, "flower")
      .setDisplaySize(scoreItemDisplaySize * 1.2, scoreItemDisplaySize);
    this.scoreItemArray.push(
      this.diamond1,
      this.diamond2,
      this.diamond3,
      this.flower
    );
    this.startScoreItemUpdate();
    console.log("create obstacle");
  }
  startScoreItemUpdate() {
    if (this.scoreItemEvent) {
      this.scoreItemEvent.remove(); // Remove any existing event to prevent duplicates
    }

    // this.scoreItemEvent = this.time.addEvent({
    //   delay: 4000 + Math.random() * 3000, // Run every 5 seconds
    //   loop: true,
    //   callback: this.updateScoreItems,
    //   callbackScope: this, // Ensures 'this' refers to the game object
    // });
  }

  updateScoreItems() {
    if (this.playing) {
      let selectObstacle = Math.random() * 10;
      console.log(this.flower?.x); // Avoids errors if flower is undefined

      const tolerance = 1; // Fix floating-point comparison issue

      if (
        selectObstacle < 3 &&
        this.flower &&
        Math.abs(this.flower.x - this.obstacleX) < tolerance
      ) {
        console.log("create flower");
        this.flower.setVelocityX(this.adjustSpeed * this.speed);
      } else if (
        this.diamond1 &&
        Math.abs(this.diamond1.x - this.obstacleX) < tolerance
      ) {
        console.log("create diamond 1");
        this.diamond1.setVelocityX(this.adjustSpeed * this.speed);
      } else if (
        this.diamond2 &&
        Math.abs(this.diamond2.x - this.obstacleX) < tolerance
      ) {
        this.diamond2.setVelocityX(this.adjustSpeed * this.speed);
      } else if (
        this.diamond3 &&
        Math.abs(this.diamond3.x - this.obstacleX) < tolerance
      ) {
        this.diamond3.setVelocityX(this.adjustSpeed * this.speed);
      }
    }
  }
  createCollider() {
    for (let i = 0; i < this.scoreItemArray.length; i++) {
      this.physics.add.overlap(this.scoreItemArray[i], this.player, () => {
        if (!this.overlapOnScoreItem) {
          this.overlapOnScoreItem = true;
          setTimeout(() => {
            this.tweens.add({
              targets: this.scoreItemArray[i],
              scale: 0.2,
              y: this.player.y - 500,
              x: this.scoreItemArray[i].x - 150,
              alpha: 0,
              duration: 300,
              onComplete: () => {
                this.scoreItemArray[i].setVelocityX(0);
                this.scoreItemArray[i].x = this.obstacleX;
                this.scoreItemArray[i].y = this.obstacleY;
                this.scoreItemArray[i].setAlpha(1);
                this.scoreItemArray[i].setScale(0.6);
                this.overlapOnScoreItem = false;
                if (i == 3) {
                  this.affirmationsCollected += 1;
                  this.affirmationScoreText.setText(this.affirmationsCollected);
                } else {
                  this.strengthTokenEarned += 1;
                  this.strengthTokenText.setText(this.strengthTokenEarned);
                }
                this.overlapOnScoreItem = false;
              },
            });
          }, 200);
        }
      });
    }
    this.physics.add.overlap(this.socialNegativity, this.player, () => {
      if (!this.overlapOnObstacleItem) {
        this.playing = false;
        this.overlapOnObstacleItem = true;
        this.player.anims.play("fall");
        this.player.setVelocityY(0);
        this.tweens.add({
          targets: this.socialNegativity,
          scale: 0.7,
          duration: 200,
          onComplete: () => {
            this.tweens.add({
              targets: this.socialNegativity,
              scale: 0.9,
              alpha: 0,
              duration: 200,
              onComplete: () => {
                this.playing = false;
                this.socialNegativity.setVelocityX(0);
                this.anxiousThoughts.setVelocityX(0);
                this.fear.setVelocityX(0);
                this.pressure.setVelocityX(0);
                for (let i = 0; i < 4; i++) {
                  this.scoreItemArray[i].setVelocityX(0);
                }
              },
            });
          },
        });
      }
    });
    this.physics.add.overlap(this.fear, this.player, () => {
      if (!this.overlapOnObstacleItem) {
        this.playing = false;
        this.overlapOnObstacleItem = true;
        this.player.setVelocityY(0);
        this.player.anims.play("fall");
        this.tweens.add({
          targets: this.fear,
          scale: 0.7,
          duration: 200,
          onComplete: () => {
            this.tweens.add({
              targets: this.fear,
              scale: 0.9,
              alpha: 0,
              duration: 200,
              onComplete: () => {
                this.playing = false;
                this.socialNegativity.setVelocityX(0);
                this.anxiousThoughts.setVelocityX(0);
                this.fear.setVelocityX(0);
                this.pressure.setVelocityX(0);
                for (let i = 0; i < 4; i++) {
                  this.scoreItemArray[i].setVelocityX(0);
                }
              },
            });
          },
        });
      }
    });
    this.physics.add.overlap(this.pressure, this.player, () => {
      if (!this.overlapOnObstacleItem) {
        this.playing = false;
        this.overlapOnObstacleItem = true;
        this.player.setVelocityY(0);
        this.player.anims.play("fall");
        this.tweens.add({
          targets: this.pressure,
          scale: 0.7,
          duration: 200,
          onComplete: () => {
            this.tweens.add({
              targets: this.pressure,
              scale: 0.9,
              alpha: 0,
              duration: 200,
              onComplete: () => {
                this.playing = false;
                this.socialNegativity.setVelocityX(0);
                this.anxiousThoughts.setVelocityX(0);
                this.fear.setVelocityX(0);
                this.pressure.setVelocityX(0);
                for (let i = 0; i < 4; i++) {
                  this.scoreItemArray[i].setVelocityX(0);
                }
              },
            });
          },
        });
      }
    });
    this.physics.add.overlap(this.anxiousThoughts, this.player, () => {
      if (!this.overlapOnObstacleItem) {
        if (this.state == 3) {
        } else {
          this.playing = false;
          this.overlapOnObstacleItem = true;
          this.player.setVelocityY(0);
          this.player.anims.play("fall");
          this.tweens.add({
            targets: this.anxiousThoughts,
            scale: 0.7,
            duration: 200,
            onComplete: () => {
              this.tweens.add({
                targets: this.anxiousThoughts,
                scale: 0.9,
                alpha: 0,
                duration: 200,
                onComplete: () => {
                  this.playing = false;
                  this.socialNegativity.setVelocityX(0);
                  this.anxiousThoughts.setVelocityX(0);
                  this.fear.setVelocityX(0);
                  this.pressure.setVelocityX(0);
                  for (let i = 0; i < 4; i++) {
                    this.scoreItemArray[i].setVelocityX(0);
                  }
                },
              });
            },
          });
        }
      }
    });
  }

  update(time, delta) {
    if (this.playing) {
      this.bg.tilePositionX += this.speed;
      if (this.cursors.up.isDown && this.player.body.blocked.down) {
        this.player.setVelocityY(-400);
        this.player.anims.play("jump");
        this.state = 2;
      }
      if (this.cursors.down.isDown && this.player.body.blocked.down) {
        this.player.anims.play("slip");
        this.state = 3;
      }

      let positionX = this.bg.tilePositionX % 2459;
      if (positionX < 50) {
        this.triggeredMilestones.clear(); // Allow functions to trigger again
      }
      for (let milestone of this.milestones) {
        if (positionX > milestone && !this.triggeredMilestones.has(milestone)) {
          this.triggeredMilestones.add(milestone); // Mark as triggered
          this.runMilestoneFunction(milestone);
        }
      }
      this.destroyObstacle(this.socialNegativity);
      this.destroyObstacle(this.fear);
      this.destroyObstacle(this.anxiousThoughts);
      this.destroyObstacle(this.pressure);
      this.destroyObstacle(this.flower);
      this.destroyObstacle(this.diamond1);
      this.destroyObstacle(this.diamond2);
      this.destroyObstacle(this.diamond3);
    }
  }
  runMilestoneFunction(milestone) {
    switch (milestone) {
      case 400:
        console.log("Function 1 executed");
        this.updateObstacles();
        break;
      case 800:
        console.log("Function 2 executed");
        this.updateScoreItems();
        break;
      case 1200:
        console.log("Function 3 executed");
        this.updateObstacles();
        break;
      case 1600:
        console.log("Function 4 executed");
        this.updateScoreItems();
        break;
      case 2000:
        console.log("Function 5 executed");
        this.updateObstacles();
        break;
    }
  }

  destroyObstacle(obstacle) {
    if (obstacle && obstacle.x < -100) {
      obstacle.setVelocityX(0);
      setTimeout(() => {
        obstacle.x = this.obstacleX;
      }, 100);
    }
  }

  gameOver() {
    this.playing = false;
    this.stopObstacleUpdate();
    this.stopScoreItemUpdate();
    this.fear.setVelocityX(0);
    this.anxiousThoughts.setVelocityX(0);
    this.pressure.setVelocityX(0);
    this.socialNegativity.setVelocityX(0);

    this.isGameOver = true;
    this.scene.start("EndScene", {
      strengthTokenEarned: this.strengthTokenEarned,
      affirmationsCollected: this.affirmationsCollected,
      timePlayed: this.timePlayed,
    });
  }
  stopScoreItemUpdate() {
    if (this.scoreItemEvent) {
      this.scoreItemEvent.remove(); // Stop the interval when not playing
      this.scoreItemEvent = null;
    }
  }
  stopObstacleUpdate() {
    if (this.obstacleEvent) {
      this.obstacleEvent.remove(); // Stop the event loop when not playing
      this.obstacleEvent = null;
    }
  }
}

export default GameScene;
