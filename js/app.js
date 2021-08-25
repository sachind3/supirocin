document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  let bodyBg = "images/sceenBg.jpg";
  let bodImg = new Image();
  bodImg.addEventListener("load", function () {
    body.style.backgroundImage = "url(" + bodyBg + ")";
  });
  bodImg.src = bodyBg;

  let score = 0;
  let imgs = [];
  let counter = 0;
  let winWidth = window.innerWidth;
  let winHeight = window.innerHeight;
  let gameDisplay = document.getElementById("wrapper");
  let imgUrls = [
    "images/indications/g1.png?" + Math.random(),
    "images/indications/g2.png?" + Math.random(),
    "images/indications/g3.png?" + Math.random(),
    "images/indications/g4.png?" + Math.random(),
    "images/indications/g5.png?" + Math.random(),
    "images/indications/g6.png?" + Math.random(),
    "images/indications/g7.png?" + Math.random(),
    "images/indications/g8.png?" + Math.random(),
    "images/indications/g9.png?" + Math.random(),
    "images/indications/g10.png?" + Math.random(),
    "images/indications/b1.png?" + Math.random(),
    "images/indications/b2.png?" + Math.random(),
    "images/indications/b3.png?" + Math.random(),
    "images/indications/b4.png?" + Math.random(),
    "images/indications/b5.png?" + Math.random(),
    "images/indications/b6.png?" + Math.random(),
    "images/indications/g10-1.png?" + Math.random(),
    "images/indications/g10-2.png?" + Math.random(),
  ];
  for (let i = 0; i < imgUrls.length; i++) {
    imgs.push(new Image());
    imgs[i].src = imgUrls[i];
    incrementCounter();
  }
  function incrementCounter() {
    counter++;
    if (counter === imgUrls.length) {
      console.log("All images loaded!");
      document.getElementById("loader").addEventListener("click", function () {
        document.getElementById("loader").remove();
        init();
      });
    }
  }

  function init() {
    let throwSound = new Audio("sound/throw.mp3");
    let goodHit = new Audio("sound/goodHit.mp3");
    const data = [
      {
        id: 0,
        name: "Impetigo",
        status: "good",
        point: 1,
        img: imgs[0],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 1,
        name: "Pyoderma",
        status: "good",
        point: 1,
        img: imgs[1],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 2,
        name: "Cellulitis",
        status: "good",
        point: 1,
        img: imgs[2],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 3,
        name: "Cuts",
        status: "good",
        point: 1,
        img: imgs[3],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 4,
        name: "Wounds",
        status: "good",
        point: 1,
        img: imgs[4],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 5,
        name: "Burns",
        status: "good",
        point: 1,
        img: imgs[5],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 6,
        name: "Abscess",
        status: "good",
        point: 1,
        img: imgs[6],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 7,
        name: "Primary Skin Infections",
        status: "good",
        point: 1,
        img: imgs[7],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 8,
        name: "Secondary Skin Infections",
        status: "good",
        point: 1,
        img: imgs[8],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 9,
        name: "SSIs",
        status: "good",
        point: 1,
        img: imgs[9],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 10,
        name: "IDSA accredited",
        status: "bad",
        point: 1,
        img: imgs[10],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 11,
        name: "AAFP accredited",
        status: "bad",
        point: 1,
        img: imgs[11],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 12,
        name: "High cure rate",
        status: "bad",
        point: 1,
        img: imgs[12],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 13,
        name: "Most prefered mupirocin",
        status: "bad",
        point: 1,
        img: imgs[13],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 14,
        name: "40 countries",
        status: "bad",
        point: 1,
        img: imgs[14],
        img1: imgs[16],
        img2: imgs[17],
      },
      {
        id: 15,
        name: "2 decades trust",
        status: "bad",
        point: 1,
        img: imgs[15],
        img1: imgs[16],
        img2: imgs[17],
      },
    ];

    function generateObstacle() {
      let randomX = Math.floor(Math.random() * (winWidth - 160));
      if (randomX < 80) {
        randomX = 80;
      }
      let createObs = data[Math.floor(Math.random() * data.length)];
      let obstacleLeft = randomX;
      let obstacleTop = winHeight;
      const obstacle = document.createElement("div");
      obstacle.classList.add("obstacle");

      obstacle.style.left = `${obstacleLeft}px`;
      obstacle.innerHTML = `
        <img src="${createObs.img1.src}" class="leftImg" />
        <img src="${createObs.img2.src}" class="rightImg" />
        <img src="${createObs.img.src}" class="mainImg" data-id="${
        createObs.id
      }" data-status="${createObs.status}" data-point="${createObs.point}" />
        <div class="point">${createObs.status === "good" ? "+" : "-"}${
        createObs.point
      }</div>
      `;
      gameDisplay.appendChild(obstacle);

      let mousePointer = document.createElement("div");
      mousePointer.classList.add("mousePointer");
      body.addEventListener("touchstart", startTouch);
      body.addEventListener("mousedown", startTouch);
      body.addEventListener("touchend", removeTouch);
      body.addEventListener("mouseup", removeTouch);

      function startTouch(e) {
        body.append(mousePointer);
        body.addEventListener("touchmove", move);
        body.addEventListener("mousemove", move);
        move(e);
      }
      function removeTouch(e) {
        body.removeEventListener("touchmove", move);
        body.removeEventListener("mousemove", move);
        mousePointer.remove();
      }

      function move(e) {
        throwSound.play();
        mousePointer.style.left = e.touches[0].pageX - 1 + "px";
        mousePointer.style.top = e.touches[0].pageY - 1 + "px";
        mousePointer.style.cursor = "pointer";
        isCollapsed();
      }
      function isCollapsed() {
        var object_1 = mousePointer.getBoundingClientRect();
        var object_2 = obstacle.getBoundingClientRect();
        if (
          object_1.left < object_2.left + object_2.width &&
          object_1.left + object_1.width > object_2.left &&
          object_1.top < object_2.top + object_2.height &&
          object_1.top + object_1.height > object_2.top
        ) {
          // document.getElementById("scoreTxt").innerHTML = score;
          // console.log(score);
          obstacle.childNodes.forEach((obs) => {
            if (obs.className === "mainImg") {
              let getPoint = obs.getAttribute("data-point");
              let getStaus = obs.getAttribute("data-status");
              if (getStaus === "good") {
                goodHit.play();
                score = score + parseInt(getPoint);
              } else {
                score = score - parseInt(getPoint);
              }
              obs.remove();
              document.getElementById("scoreTxt").innerHTML = score;
            }
            if (obs.className === "leftImg") {
              obs.classList.add("remove");
            }
            if (obs.className === "rightImg") {
              obs.classList.add("remove");
            }
          });
          setTimeout(() => {
            obstacle.remove();
          }, 3000);
          // console.log(mainImg);
        }
      }
      setTimeout(() => {
        // clearInterval(obstacleTimerId);
        if (gameDisplay.hasChildNodes()) {
          obstacle.remove();
        }
      }, 2000);

      setTimeout(generateObstacle, 1000);
    }
    generateObstacle();
  }
  startTimer();
});

function startTimer() {
  var presentTime = document.getElementById("timer").innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if ((m + "").length == 1) {
    m = "0" + m;
  }
  if (m < 0) {
    m = "59";
  }
  document.getElementById("timer").innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  }
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}
