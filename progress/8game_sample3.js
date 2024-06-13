$(document).ready(function () {
  let correctCount = 0;
  let requiredCorrect = 0;
  let currentImage = "";
  let difficulty = "";
  const gameImages = Array.from({ length: 20 }, (_, i) => `image/${i + 1}.png`); // 20枚のゲーム画像
  const originalImage = "image/original.png"; // 元の画像（正解の基準）
  const emptyImage = "image/empty.png"; // 一時的な空画像
  const difficulties = {
    easy: 4,
    normal: 6,
    hard: 9,
  };

  function resetGame() {
    correctCount = 0;
    $("#game-container").hide();
    $("#result-container").hide();
    $("#announcement").hide();
    $("#difficulty-selection").show();
    $("#message").text("");
    $("#back-button").hide();
    $("#go-button").hide();
  }

  function showMessage(message) {
    $("#message").text(message);
  }

  function showResult(message) {
    $("#result-message").text(message);
    $("#announcement").hide(); // ゲームクリア時には~番店を非表示にする
    $("#game-container").hide();
    $("#result-container").show();
  }

  function getRandomImage() {
    // 70%の確率でダミー画像、30%の確率で元画像を選ぶ
    return Math.random() < 0.3
      ? originalImage
      : gameImages[Math.floor(Math.random() * gameImages.length)];
  }

  function updateAnnouncement() {
    $("#announcement").text(correctCount + "番店");
  }

  function showNextImage() {
    currentImage = getRandomImage();
    $("#game-image").attr("src", currentImage);
    $("#announcement").show();
    $("#back-button").show();
    $("#go-button").show();
  }

  $("button[data-difficulty]").on("click", function () {
    difficulty = $(this).data("difficulty");
    requiredCorrect = difficulties[difficulty];
    $("#difficulty-selection").hide();
    $("#announcement").text("0番店").show();
    $("#game-container").show();
    $("#original-image").hide();
    currentImage = originalImage; // 最初は元画像を表示
    $("#game-image").attr("src", currentImage).show();
    $("#back-button").hide(); // 0番店では引き返すボタンを非表示
    $("#go-button").show();
  });

  function handleCorrect() {
    $("#back-button").hide();
    $("#go-button").hide();
    $("#announcement").hide(); // ~番店を非表示にする
    $("#game-image").attr("src", emptyImage);
    setTimeout(function () {
      $("#announcement").show(); // 3秒後に~番店を再表示
      showNextImage();
    }, 3000); // 3秒間empty.pngを表示した後に次の画像を表示
  }

  $("#back-button").on("click", function () {
    if (currentImage !== originalImage) {
      correctCount++;
      updateAnnouncement();
      if (correctCount >= requiredCorrect) {
        showResult("おめでとう！ ゲームをクリアしました。");
      } else {
        handleCorrect();
      }
    } else {
      correctCount = 0;
      $("#announcement").text("0番店");
      currentImage = originalImage;
      $("#game-image").attr("src", currentImage);
    }
    if (correctCount === 0) {
      $("#back-button").hide(); // 0番店では引き返すボタンを非表示
    } else {
      $("#back-button").show();
    }
  });

  $("#go-button").on("click", function () {
    if (currentImage === originalImage) {
      correctCount++;
      updateAnnouncement();
      if (correctCount >= requiredCorrect) {
        showResult("おめでとう！ ゲームをクリアしました。");
      } else {
        handleCorrect();
      }
    } else {
      correctCount = 0;
      $("#announcement").text("0番店");
      currentImage = originalImage;
      $("#game-image").attr("src", currentImage);
    }
    if (correctCount === 0) {
      $("#back-button").hide(); // 0番店では引き返すボタンを非表示
    } else {
      $("#back-button").show();
    }
  });

  $("#retry-button").on("click", function () {
    resetGame();
  });

  $("#play-again-button").on("click", function () {
    // 現在の難易度のボタンを隠す
    $(`button[data-difficulty=${difficulty}]`).hide();
    // 他の難易度のボタンを表示する
    $(`button[data-difficulty]:not([data-difficulty=${difficulty}])`).show();
    $("#result-container").hide();
    $("#difficulty-selection").show();
  });
});
