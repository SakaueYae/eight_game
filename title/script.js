$(document).ready(function () {
  function showLevelSelectionScreen() {
    $("#main-title-screen").hide();
    $("#level-selection-screen").show();
  }

  $("#main-title-screen").click(function () {
    showLevelSelectionScreen();
  });

  $(document).keydown(function (event) {
    showLevelSelectionScreen();
  });

  $(".level-button").click(function () {
    var level = $(this).data("level");
    localStorage.setItem("level", level);
    window.location.href = "../progress/8game_sample3.html";
    // ここにゲームのレベルに応じた処理を追加します。
  });

  $(".Description").click(function () {
    $("#level-selection-screen").hide();
    $("#description-screen").show();
    // 説明の画面
  });

  $(".return-level-selection").click(function () {
    $("#description-screen").hide();
    $("#level-selection-screen").show();
    // レベル選択に戻る
  });
});
