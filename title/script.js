$(document).ready(function() {
    $('#main-title-screen').click(function() {
        $(this).hide();
        $('#level-selection-screen').show();
    });

    $('.level-button').click(function() {
        var level = $(this).data('level');
        alert('レベル ' + level + ' が選択されました!');
        // ここにゲームのレベルに応じた処理を追加します。
    });

    $('.Description').click(function(){
        alert("ゲームの説明が選択されました");
        // 説明の画面
    })
});