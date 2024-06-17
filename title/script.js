$(document).ready(function () {
  function PlayButton47() {
    document.getElementById("button47").currentTime = 0;
    document.getElementById("button47").play();
  }

  function PlayButton33() {
    document.getElementById("button33").currentTime = 0;
    document.getElementById("button33").play();
  }

  $("#main-title-screen").click(function () {
    PlayButton47();
    $("#main-title-screen").hide();
    $("#level-selection-screen").show();
  });

  $(".level-button").click(function () {
    PlayButton33();
    var level = $(this).data("level");
    localStorage.setItem("level", level);
    window.location.href = "../progress/8game_sample3.html";
    // ここにゲームのレベルに応じた処理を追加します。
  });
  $(".levelToCredit").click(function () {
    PlayButton47();
    $("#level-selection-screen").hide();
    $("#Credit").show();
  });

  $(".creditToTitle").click(function () {
    PlayButton47();
    $("#Credit").hide();
    $("#main-title-screen").show();
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
});
