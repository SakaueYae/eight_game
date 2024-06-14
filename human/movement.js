let hold = true;
let rightPressed = false;
let leftPressed = false;
let position = $(window).width() - 200;
const speed = 50;
let flag = null;

$(document).ready(() => {
  $(window).keydown((e) => {
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
    } else if (position < 0) {
      flag = "left";
    }

    $("#human").css("left", `${position}px`);
  };

  const move = () => {
    if (flag === "left") {
      console.log("You can't go left anymore");
      flag = null;
      return;
    }
    if (flag === "right") {
      console.log("You can't go right anymore");
      flag = null;
      return;
    }
    draw();
    if (rightPressed) {
      position += speed;
    } else if (leftPressed) {
      position -= speed;
    }
  };

  setInterval(move, 100);
});
