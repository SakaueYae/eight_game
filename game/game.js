$(document).ready(function () {
  //button音声1
  function PlayButton47() {
    document.getElementById("button47").currentTime = 0;
    document.getElementById("button47").play();
  }

  //button音声2
  function PlayButton33() {
    document.getElementById("button33").currentTime = 0;
    document.getElementById("button33").play();
  }

  const volume1 = document.getElementById("main-bgm").volume; // 現在のボリュームを取得
  document.getElementById("main-bgm").volume = volume1 - 0.5;
  const volume2 = document.getElementById("title-bgm").volume; // 現在のボリュームを取得
  document.getElementById("title-bgm").volume = volume2 - 0.5;
  $("#result-container").hide();

  function title() {
    $("#main-title-screen").show();

    //メインタイトル⇒レベル選択画面
    $("#main-title-screen").one("click", function () {
      document.getElementById("title-bgm").currentTime = 0;
      document.getElementById("title-bgm").play();
      PlayButton47();
      $("#main-title-screen").hide();
      $("#level-selection-screen").show();
    });

    //レベル選択
    $(".level-button").click(function () {
      PlayButton33();
      document.getElementById("title-bgm").pause();
      let level = $(this).data("level");
      localStorage.setItem("level", level);
      $("#level-selection-screen").hide();
      game();
    });

    $(".Description").click(function () {
      PlayButton33();
      $("#level-selection-screen").hide();
      $("#description-screen").show();
      // 説明の画面
    });
    /*ルール説明画面*/
    $(".return-level-selection").click(function () {
      PlayButton33();
      $("#description-screen").hide();
      $("#level-selection-screen").show();
      // レベル選択に戻る
    });
    /*TIPS&HOWTOUSE*/
    $(".descriptionToTips").click(function () {
      PlayButton33();
      $("#description-screen").hide();
      $("#tips-screen").show();
      // TIPSへ
    });
    $(".descriptionToUse").click(function () {
      PlayButton33();
      $("#description-screen").hide();
      $("#use-screen").show();
      // 操作説明へ
    });
    /*TIPS画面*/
    $(".tipsToDescription").click(function () {
      PlayButton33();
      $("#tips-screen").hide();
      $("#description-screen").show();
      // ルール説明に戻る
    });
    /*操作説明画面*/
    $(".useToDescription").click(function () {
      PlayButton33();
      $("#use-screen").hide();
      $("#description-screen").show();
      // ルール説明に戻る
    });
  }

  title();

  function game() {
    document.getElementById("main-bgm").currentTime = 0;
    document.getElementById("main-bgm").play();
    let correctCount = 0;
    let requiredCorrect = 0;
    let currentImage = "";
    let difficulty = localStorage.getItem("level");
    const gameImages = Array.from(
      { length: 20 },
      (_, i) => `../images/${i + 1}.png`
    ); // 20枚のゲーム画像
    const originalImage = "../images/ORIGINAL.PNG"; // 元の画像（正解の基準）
    const emptyImage = "../images/BACK_ONLY.png"; // 一時的な空画像
    const difficulties = [4, 6, 9]; // 難易度ごとの正解回数
    let interval = null;
    const onLoad = function () {
      requiredCorrect = difficulties[Number(difficulty) - 1];
      $("#game-container").show();
      $("#original-image").hide();
      currentImage = originalImage; // 最初は元画像を表示
      $("#game-image").attr("src", currentImage).show();
    };

    onLoad();

    function resetGame() {
      correctCount = 0;
      $("#game-container").hide();
      $("#result-container").hide();
      $("#overlay-text").hide();
      title();
    }

    function showResult(message) {
      $("#result-message").text(message);
      $("#game-container").hide();
      $("#result-container").show();
    }

    function getRandomImage() {
      // 70%の確率でダミー画像、30%の確率で元画像を選ぶ
      return Math.random() < 0.3
        ? originalImage
        : gameImages[Math.floor(Math.random() * gameImages.length)];
    }

    // オーバーレイテキスト更新関数
    function updateOverlayText() {
      $("#overlay-text").text(correctCount + "番店");
    }

    function showNextImage() {
      currentImage = getRandomImage();
      $("#game-image").attr("src", currentImage);
      $("#overlay-text").hide();
    }

    function handleCorrect() {
      $("#human").hide(); // 人間を非表示にする
      $("#overlay-text")
        .html(correctCount + "番店" + "<br>" + correctCount + "th store")
        .show(); // オーバーレイテキストを表示
      $("#game-image").attr("src", emptyImage);
      $("#overlay-text").show();
      setTimeout(function () {
        $("#human").css("left", `${position}px`).show(); // 人間を再表示
        showNextImage();
        interval = setInterval(move, 100);
      }, 3000); // 3秒間empty.pngを表示した後に次の画像を表示
    }

    // 不正解時の処理関数
    function handleIncorrect() {
      $("#human").hide(); // 人間を非表示にする
      $("#overlay-text")
        .html("0番店" + "<br>" + "0th store")
        .show();
      $("#game-image").attr("src", emptyImage);
      $("#overlay-text").show();
      setTimeout(function () {
        correctCount = 0;
        currentImage = originalImage;
        $("#game-image").attr("src", currentImage);
        $("#overlay-text").hide();
        $("#human").css("left", `${position}px`).show(); // 人間を再表示
        interval = setInterval(move, 100);
      }, 3000);
    }

    const returnAction = function () {
      if (currentImage !== originalImage) {
        correctCount++;
        updateOverlayText();
        if (correctCount >= requiredCorrect) {
          document.getElementById("main-bgm").pause();
          document.getElementById("shining_star").play();
          showResult("おめでとう！ ゲームをクリアしました。");
        } else {
          handleCorrect();
        }
      } else {
        handleIncorrect();
      }
    };

    const goAction = function () {
      if (currentImage === originalImage) {
        correctCount++;
        updateOverlayText();
        if (correctCount >= requiredCorrect) {
          document.getElementById("main-bgm").pause();
          document.getElementById("shining_star").play();
          showResult("おめでとう！ ゲームをクリアしました。");
        } else {
          handleCorrect();
        }
      } else {
        handleIncorrect();
      }
    };

    $(".retry-button").on("click", function () {
      document.getElementById("shining_star").pause();
      document.getElementById("shining_star").currentTime = 0;
      resetGame();
    });

    // 人間の移動
    let rightPressed = false;
    let leftPressed = false;
    let position = $(window).width() - 200;
    const speed = 50;
    let flag = null;

    $(window).keydown((e) => {
      document.getElementById("wark").currentTime = 0;
      document.getElementById("wark").play();
      if (e.key === "ArrowRight") {
        rightPressed = true;
      } else if (e.key === "ArrowLeft") {
        leftPressed = true;
      }
    });

    $(window).keyup((e) => {
      if (e.key === "ArrowRight") {
        rightPressed = false;
      } else if (e.key === "ArrowLeft") {
        leftPressed = false;
      }
    });

    const draw = () => {
      if (position > $(window).width() - $("#human").width()) {
        flag = "right";
        return;
      } else if (position < 0) {
        flag = "left";
        return;
      }
      $("#human").css("left", `${position}px`);
    };

    const move = () => {
      if (flag === "left") {
        goAction();
        flag = null;
        clearInterval(interval);
        console.log("You can't go left anymore");
        position = $(window).width() - 200;
        return;
      }
      if (flag === "right") {
        returnAction();
        flag = null;
        clearInterval(interval);
        console.log("You can't go right anymore");
        position = 0;
        return;
      }
      draw();
      if (rightPressed) {
        if (position + speed > $(window).width() - 200 && correctCount === 0)
          return;
        position += speed;
      } else if (leftPressed) {
        position -= speed;
      }
    };

    interval = setInterval(move, 100);
  }
});
