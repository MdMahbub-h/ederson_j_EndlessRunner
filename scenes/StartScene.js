import Phaser from "phaser";

class StartScene extends Phaser.Scene {
  constructor() {
    super("StartScene");
    this.affirmationsCollected = 120;
    this.strengthTokenEarned = 200;
    this.totalTimePlayed = 43 * 60 + 45;
  }

  create() {
    this.optionsScene = this.game.scene.getScene("OptionsScene");

    this.arrayOfAll = [];
    this.createAll();

    this.tweens.add({
      targets: [
        this.logo,
        this.settingBtn,
        this.journalBtn,
        this.tutorialBtn,
        this.playBtn,
        this.friendsBtn,
        this.crossBtn,
      ],
      alpha: 0.9, // Fade to invisible
      duration: 500, // Duration in milliseconds
      onComplete: () => {
        this.arriveAllTween();
        this.getActions();
      },
    });
    this.tweens.add({
      targets: [this.bg],
      alpha: 1,
      duration: 1000,
      onComplete: () => {},
    });
  }
  createAll() {
    this.bg = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "startbg")
      .setDisplaySize(this.scale.width, this.scale.height);
    this.logo = this.add
      .image(this.scale.width / 2, this.scale.height / 4, "logo")
      .setDisplaySize(this.scale.width / 2, this.scale.height / 2.8);
    this.settingBtn = this.physics.add
      .image(100, 80, "settingBtn")
      .setDisplaySize(120, 120);
    this.journalBtn = this.physics.add
      .image(this.scale.width - 100, 100, "journalBtn")
      .setDisplaySize(120, 120);
    this.tutorialBtn = this.physics.add
      .image(this.scale.width - 100, 350, "tutorialBtn")
      .setDisplaySize(120, 120);
    this.playBtn = this.physics.add
      .image(
        this.scale.width / 2 - 180,
        this.scale.height - 250,
        "playBtnHover"
      )
      .setDisplaySize(300, 300)
      .setCircle(150, 20, 20);
    this.friendsBtn = this.physics.add
      .image(
        this.scale.width / 2 + 180,
        this.scale.height - 250,
        "friendsBtnHover"
      )
      .setDisplaySize(300, 300)
      .setCircle(160, 20, 20);
    this.crossBtn = this.physics.add
      .image(85, this.scale.height - 85, "crossBtn")
      .setDisplaySize(65, 65)
      .setCircle(33, 5, 2);

    this.bg.setAlpha(0);
    this.logo.setAlpha(0);
    this.settingBtn.setAlpha(0);
    this.journalBtn.setAlpha(0);
    this.tutorialBtn.setAlpha(0);
    this.playBtn.setAlpha(0);
    this.friendsBtn.setAlpha(0);
    this.crossBtn.setAlpha(0);

    this.arrayOfAll.push(
      this.bg,
      this.logo,
      this.settingBtn,
      this.journalBtn,
      this.tutorialBtn,
      this.playBtn,
      this.friendsBtn,
      this.crossBtn
    );
    setTimeout(() => {
      // this.settingBtnAction();
      // this.journalBtnAction();
    }, 1500);
  }
  arriveAllTween() {
    this.settingBtn
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        if (!this.settingBarOn) {
          this.settingBtn.setAlpha(1);
        }
      })
      .on("pointerout", () => {
        if (!this.settingBarOn) {
          this.settingBtn.setAlpha(0.9);
        }
      });
    this.journalBtn
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        if (!this.journalBoardOn) {
          this.journalBtn.setAlpha(1);
        }
      })
      .on("pointerout", () => {
        if (!this.journalBoardOn) {
          this.journalBtn.setAlpha(0.9);
        }
      });
    this.tutorialBtn
      .setInteractive({ useHandCursor: true })
      .on("pointerover", () => {
        this.tutorialBtn.setAlpha(1);
      })
      .on("pointerout", () => {
        this.tutorialBtn.setAlpha(0.9);
      });
    this.playBtn
      .setInteractive(
        new Phaser.Geom.Circle(150 + 20, 150 + 20, 150), // (x, y, radius) - offset included
        Phaser.Geom.Circle.Contains
      )
      .on("pointerover", () => {
        this.playBtn.setTexture("playBtn");
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        this.playBtn.setTexture("playBtnHover");
        document.body.style.cursor = "default";
      });
    this.friendsBtn
      .setInteractive(
        new Phaser.Geom.Circle(160 + 20, 160 + 20, 160), // (x, y, radius) - offset included
        Phaser.Geom.Circle.Contains
      )
      .on("pointerover", () => {
        this.friendsBtn.setTexture("friendsBtn");
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        this.friendsBtn.setTexture("friendsBtnHover");
        document.body.style.cursor = "default";
      });
    this.crossBtn
      .setInteractive(
        new Phaser.Geom.Circle(33 + 5, 33 + 2, 33), // (x, y, radius) - offset included
        Phaser.Geom.Circle.Contains
      )
      .setAlpha(0.9)
      .on("pointerover", () => {
        this.crossBtn.setAlpha(1);
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        this.crossBtn.setAlpha(0.9);
        document.body.style.cursor = "default";
      });
  }
  getActions() {
    this.playBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.playBtn,
        scale: 0.85,
        duration: 100,
        onComplete: () => {
          this.tweens.add({
            targets: this.playBtn,
            scale: 0.9,
            duration: 100,
            onComplete: () => {
              this.playBtnAction();
              // this.scene.stop();
              // this.scene.start("GameScene");
            },
          });
        },
      });
    });
    this.settingBtn.on("pointerdown", () => {
      if (!this.soundBtnClicked) {
        this.soundBtnClicked = true;
        this.tweens.add({
          targets: this.settingBtn,
          scale: 0.85,
          duration: 100,
          onComplete: () => {
            this.tweens.add({
              targets: this.settingBtn,
              scale: 0.9,
              duration: 100,
              onComplete: () => {
                this.settingBtnAction();
                this.soundBtnClicked = false;
              },
            });
          },
        });
      }
    });
    this.journalBtn.on("pointerdown", () => {
      this.tweens.add({
        targets: this.journalBtn,
        scale: 0.8,
        duration: 100,
        onComplete: () => {
          this.tweens.add({
            targets: this.journalBtn,
            scale: 0.9,
            duration: 100,
            onComplete: () => {
              this.journalBtnAction();
            },
          });
        },
      });
    });
  }

  playBtnAction() {
    this.emotionalCheckInArray = [];
    this.emojiSelected = false;
    for (let i = 0; i < this.arrayOfAll.length; i++) {
      this.arrayOfAll[i].setAlpha(0);
    }
    this.arrayOfAll[0].setAlpha(0.5);
    this.board = this.add
      .image(this.scale.width / 2, this.scale.height / 2.2, "board")
      .setDisplaySize(this.scale.width / 1.5, this.scale.height / 1.15);
    this.boardText = this.add
      .text(
        this.scale.width / 2,
        this.scale.height / 7.5,
        "How are you feeling right now?",
        {
          fontFamily: "font2",
          fontStyle: "bold",
          fontSize: "36px",
          color: "#f0ffaa",
        }
      )
      .setOrigin(0.5);
    this.boardPlayBtn = this.add
      .image(this.scale.width / 2, this.scale.height / 1.23, "boardBtn1Hover")
      .setDisplaySize(400, 140)
      .setInteractive()
      .on("pointerover", () => {
        this.boardPlayBtn.setTexture("boardBtn1");
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        this.boardPlayBtn.setTexture("boardBtn1Hover");
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        if (this.emojiSelected) {
          this.emojiSelected = false;
          for (let i = 0; i < this.emotionalCheckInArray.length; i++) {
            this.tweens.add({
              targets: [this.emotionalCheckInArray[i]],
              alpha: 0,
              duration: 500,
              onComplete: () => {
                this.emotionalCheckInArray[i].destroy();
                this.selectBackground();
              },
            });
          }
          this.tweens.add({
            targets: [this.bg],
            alpha: 0,
            duration: 500,
          });
        }
      });

    this.emojiPanel = this.add
      .image(this.scale.width / 2, this.scale.height / 2.2, "emojiPanel")
      .setDisplaySize(this.scale.width / 1.8, 250);
    this.emojis = [];
    this.emojiBgs = [];
    for (let i = 1; i <= 5; i++) {
      let emojiBg = this.add
        .image(
          this.scale.width / 5.25 + (i * 200 * this.scale.width) / 1920,
          this.scale.height / 2.2,
          `emojibg1`
        )
        .setDisplaySize(150, 150);
      let emoji = this.add
        .image(
          this.scale.width / 5.25 + (i * 200 * this.scale.width) / 1920,
          this.scale.height / 2.2,
          `emoji${i}`
        )
        .setDisplaySize(120, 120);
      this.emojiBgs.push(emojiBg);
      this.emojis.push(emoji);
      this.emotionalCheckInArray.push(emoji, emojiBg);
    }
    this.emojiCrossBtn = this.add
      .image(this.scale.width / 1.26, this.scale.height / 13, "crossBtn")
      .setDisplaySize(65, 65)
      .setAlpha(0.01)
      .setInteractive({ useHandCursor: true });

    this.emotionalCheckInArray.push(
      this.board,
      this.boardText,
      this.boardPlayBtn,
      this.emojiPanel,
      this.emojiCrossBtn
    );

    for (let i = 0; i < this.emojiBgs.length; i++) {
      let element = this.emojiBgs[i];
      element
        .setInteractive({ useHandCursor: true })
        .on("pointerover", () => {
          if (!this.emojiSelected) {
            element.setTexture("emojibg2");
            this.emojis[i].setScale(1.2);
          }
        })
        .on("pointerout", () => {
          if (!this.emojiSelected) {
            element.setTexture("emojibg1");
            this.emojis[i].setScale(1);
          }
        })
        .on("pointerdown", () => {
          if (!this.emojiSelected) {
            this.emojiSelected = true;
            element.setTexture("emojibg2");
            this.emojis[i].setScale(1.2);
            this.checkMark = this.add.image(
              this.scale.width / 5.25 +
                ((i + 1) * 200 * this.scale.width) / 1920 +
                50,
              this.scale.height / 2.2 + 60,
              "checkmark"
            );
            this.emotionalCheckInArray.push(this.checkMark);
            this.boardPlayBtn.setTexture("boardBtn2Hover");
            this.boardPlayBtn
              .on("pointerover", () => {
                this.boardPlayBtn.setTexture("boardBtn2");
              })
              .on("pointerout", () => {
                this.boardPlayBtn.setTexture("boardBtn2Hover");
              });
          } else {
            this.boardPlayBtn.on("pointerdown", () => {});
          }
        });
    }
    this.emojiCrossBtn.on("pointerdown", () => {
      this.emojiSelected = false;
      for (let i = 0; i < this.emotionalCheckInArray.length; i++) {
        this.emotionalCheckInArray[i].destroy();
      }
      this.arrayOfAll[0].setAlpha(1);
      for (let i = 1; i < this.arrayOfAll.length; i++) {
        this.arrayOfAll[i].setAlpha(0.9);
      }
    });
  }
  selectBackground() {
    this.scene.stop();
    this.scene.start("GameScene");
  }
  settingBtnAction() {
    this.settingBarOn = true;
    this.settingsArray = [];
    this.settingBtnsArray = [];
    for (let i = 0; i < this.arrayOfAll.length; i++) {
      this.arrayOfAll[i].setAlpha(0);
    }
    this.arrayOfAll[0].setAlpha(0.5);
    this.settingBoard = this.add
      .image(this.scale.width / 2, this.scale.height / 2, "setting_board")
      .setDisplaySize(this.scale.width / 1.5, this.scale.height / 1.25);
    this.settingText = this.add
      .text(this.scale.width * 0.5, this.scale.height * 0.162, "Settings", {
        fontFamily: "font2",
        fontSize: "50px",
        color: "#ffb236",
      })
      .setOrigin(0.5, 0.5);
    this.soundMaintain();
    this.themesMaintain();
    this.fontSizeMaintain();

    this.textToSpeechCheckmark = this.add
      .image(
        this.scale.width * 0.32,
        this.scale.height * 0.66,
        "setting_checkmarkOn"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(65, 60);
    // setting_checkmarkOff
    this.textToSpeechText = this.add
      .text(
        this.scale.width * 0.32,
        this.scale.height * 0.74,
        "Text-to-Speech",
        {
          fontFamily: "font2",
          fontSize: "20px",
          color: "#8d3800",
        }
      )
      .setOrigin(0.5, 0.5);
    this.MindfulnessRemindersCheckmark = this.add
      .image(
        this.scale.width * 0.42,
        this.scale.height * 0.66,
        "setting_checkmarkOff"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(65, 60);
    // setting_checkmarkOff
    this.MindfulnessRemindersText = this.add
      .text(
        this.scale.width * 0.42,
        this.scale.height * 0.755,
        "Mindfulness\n Reminders",
        {
          fontFamily: "font2",
          fontSize: "20px",
          color: "#8d3800",
        }
      )
      .setOrigin(0.5, 0.5);

    this.HighContrastModeCheckmark = this.add
      .image(
        this.scale.width * 0.52,
        this.scale.height * 0.66,
        "setting_checkmarkOff"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(65, 60);
    // setting_checkmarkOff
    this.HighContrastModeText = this.add
      .text(
        this.scale.width * 0.52,
        this.scale.height * 0.755,
        "High-Contrast\n      Mode",
        {
          fontFamily: "font2",
          fontSize: "20px",
          color: "#8d3800",
        }
      )
      .setOrigin(0.5, 0.5);

    this.privacyCheckmark = this.add
      .image(this.scale.width * 0.67, this.scale.height * 0.65, "setting_btn1")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(120, 100);
    // off setting_btn2
    this.privacyText = this.add
      .text(
        this.scale.width * 0.67,
        this.scale.height * 0.75,
        "Privacy & Data",
        {
          fontFamily: "font2",
          fontSize: "20px",
          color: "#8d3800",
        }
      )
      .setOrigin(0.5, 0.5);
    this.settingCrossBtn = this.add
      .image(
        this.scale.width * 0.795,
        this.scale.height * 0.19,
        "setting_crossBtn"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(100, 100);
    this.settingCrossBtn
      .setInteractive(
        new Phaser.Geom.Circle(50, 50, 52), // (x, y, radius) - offset included
        Phaser.Geom.Circle.Contains
      )
      .setAlpha(0.9)
      .on("pointerover", () => {
        this.settingCrossBtn.setAlpha(1);
        document.body.style.cursor = "pointer";
      })
      .on("pointerout", () => {
        this.settingCrossBtn.setAlpha(0.9);
        document.body.style.cursor = "default";
      })
      .on("pointerdown", () => {
        for (let i = 0; i < this.settingsArray.length; i++) {
          this.settingsArray[i].destroy();
        }
        for (let i = 0; i < this.settingBtnsArray.length; i++) {
          this.settingBtnsArray[i].destroy();
        }
        this.arrayOfAll[0].setAlpha(1);
        for (let i = 1; i < this.arrayOfAll.length; i++) {
          this.arrayOfAll[i].setAlpha(0.9);
        }
        this.settingBarOn = false;
        document.body.style.cursor = "default";
      });
    this.settingsArray.push(
      this.settingBoard,
      this.settingText,
      this.volumeIcon,
      this.volumeText,
      this.barBg,
      this.barHandle,
      this.barPointer,
      this.themesText,
      this.themesItem,
      this.fontSizeText,
      this.fontSizeItem,
      this.textToSpeechText,
      this.MindfulnessRemindersText,
      this.HighContrastModeText,
      this.privacyText,
      this.themesPanel,
      this.fontSizePanel
    );
    this.settingBtnsArray.push(
      this.themesLeft,
      this.themesRight,
      this.fontSizeLeft,
      this.fontSizeRight,
      this.textToSpeechCheckmark,
      this.MindfulnessRemindersCheckmark,
      this.HighContrastModeCheckmark,
      this.privacyCheckmark,
      this.settingCrossBtn
    );
  }
  soundMaintain() {
    this.volumeIcon = this.add
      .image(
        this.scale.width * 0.28,
        this.scale.height * 0.32,
        "setting_soundIcon"
      )
      .setDisplaySize(50, 42);
    this.volumeText = this.add
      .text(this.scale.width * 0.35, this.scale.height * 0.32, "Volume:", {
        fontFamily: "font2",
        fontStyle: "bold",
        fontSize: "40px",
        color: "#8d3800",
      })
      .setOrigin(0.5, 0.5);
    this.barBg = this.add
      .image(this.scale.width * 0.58, this.scale.height * 0.32, "setting_bar2")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(this.scale.width / 3 + 4, 42);
    this.barHandle = this.add
      .image(this.scale.width * 0.58, this.scale.height * 0.32, "setting_bar1")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(this.scale.width / 3, 40);

    this.barPointer = this.add
      .image(
        this.scale.width * 0.58 - this.scale.width / 6 + 20,
        this.scale.height * 0.32,
        "setting_bar3"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(30, 50)
      .setInteractive({ draggable: true });
    // this.music = this.sound.add("background_music", { loop: true });
    // this.music.play();
    this.minX = this.barBg.x - this.barBg.width / 2 + 40;
    this.maxX = this.barBg.x + this.barBg.width / 2 - 40;
    this.input.setDraggable(this.barPointer);
    this.input.on("drag", (pointer, gameObject, dragX) => {
      if (dragX < this.minX) dragX = this.minX;
      if (dragX > this.maxX) dragX = this.maxX;
      gameObject.x = dragX;
      let volume = (dragX - this.minX) / (this.maxX - this.minX);
      this.sound.setVolume(volume);
    });
  }
  themesMaintain() {
    this.themesText = this.add
      .text(this.scale.width * 0.35, this.scale.height * 0.42, "Themes", {
        fontFamily: "font2",
        fontSize: "28px",
        color: "#9e4900",
      })
      .setOrigin(0.5, 0.5);
    this.themesPanel = this.add
      .image(this.scale.width * 0.35, this.scale.height * 0.48, "setting_panel")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(200, 50);
    this.themesItem = this.add
      .text(this.scale.width * 0.35, this.scale.height * 0.48, "Forest", {
        fontFamily: "font2",
        fontSize: "30px",
        color: "#6b1600",
      })
      .setOrigin(0.5, 0.5);
    this.themesLeft = this.add
      .image(
        this.scale.width * 0.35 - 130,
        this.scale.height * 0.48,
        "setting_left"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 60);
    this.themesRight = this.add
      .image(
        this.scale.width * 0.35 + 130,
        this.scale.height * 0.48,
        "setting_right"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 60);
  }
  fontSizeMaintain() {
    this.fontSizeText = this.add
      .text(this.scale.width * 0.65, this.scale.height * 0.42, "Font size", {
        fontFamily: "font2",
        fontSize: "28px",
        color: "#9e4900",
      })
      .setOrigin(0.5, 0.5);
    this.fontSizePanel = this.add
      .image(this.scale.width * 0.65, this.scale.height * 0.48, "setting_panel")
      .setOrigin(0.5, 0.5)
      .setDisplaySize(200, 50);
    this.fontSizeItem = this.add
      .text(this.scale.width * 0.65, this.scale.height * 0.48, "Medium", {
        fontFamily: "font2",
        fontSize: "30px",
        color: "#6b1600",
      })
      .setOrigin(0.5, 0.5);
    this.fontSizeLeft = this.add
      .image(
        this.scale.width * 0.65 - 130,
        this.scale.height * 0.48,
        "setting_left"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 60);
    this.fontSizeRight = this.add
      .image(
        this.scale.width * 0.65 + 130,
        this.scale.height * 0.48,
        "setting_right"
      )
      .setOrigin(0.5, 0.5)
      .setDisplaySize(50, 60);
  }
  journalBtnAction() {
    this.journalArray = [];
    this.journalOptionArray = [];
    this.journalBoardOn = true;
    this.journalOption = 1;
    for (let i = 1; i < this.arrayOfAll.length; i++) {
      this.arrayOfAll[i].setAlpha(0);
    }
    this.arrayOfAll[0].setAlpha(0.5);
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
        for (let i = 1; i < this.arrayOfAll.length; i++) {
          this.arrayOfAll[i].setAlpha(0.9);
        }
        this.arrayOfAll[0].setAlpha(1);
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

  btnClickTween(target, afterFunction) {
    this.tweens.add({
      targets: target,
      scale: 0.85,
      duration: 100,
      onComplete: () => {
        this.tweens.add({
          targets: target,
          scale: 1,
          duration: 100,
          onComplete: () => {
            afterFunction;
          },
        });
      },
    });
  }
}

export default StartScene;
