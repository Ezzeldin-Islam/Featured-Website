//* preparing for headroom.js libirary
document.addEventListener("DOMContentLoaded", function () {
  var myElement = document.querySelector(".header");

  if (!myElement) {
    return;
  }

  var options = {
    offset: 100,
    tolerance: {
      up: 10,
      down: 5,
    },
    classes: {
      initial: "header",
      pinned: "header--pinned",
      unpinned: "header--unpinned",
      top: "header--top",
      notTop: "header--not-top",
    },
    onPin: function () {},
    onUnpin: function () {},
    onTop: function () {},
    onNotTop: function () {},
  };

  // إنشاء Headroom
  var headroom = new Headroom(myElement, options);
  headroom.init();
});

//* toggle menu logic
let toggleIcon = document.querySelector("header .menu");
let headerLinks = document.querySelector("header .header-links");

toggleIcon.addEventListener("click", function () {
  headerLinks.classList.toggle("active");
  toggleIcon.classList.toggle("active");
  if (toggleIcon.classList.contains("active")) {
    toggleIcon.className = `fa-solid fa-xmark active menu`;
  } else {
    toggleIcon.className = `fa-solid fa-bars menu`;
  }
});

document.addEventListener("click", function (e) {
  if (e.target !== toggleIcon && e.target !== headerLinks) {
    headerLinks.classList.remove("active");
    toggleIcon.classList.remove("active");
    toggleIcon.className = `fa-solid fa-bars menu`;
  }
});

//* scroll bar at the top of the web
let scrollerBar = document.querySelector(".scroller");

window.addEventListener("scroll", function () {
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrollTop = document.documentElement.scrollTop;

  scrollerBar.style.width = `${(scrollTop / height) * 100}%`;
});

//* up to top btn
let upToTop = document.createElement("span");
upToTop.className = "up-to-top";
upToTop.innerHTML = `<i class="fa-solid fa-angles-up"></i>`;
document.body.append(upToTop);

window.onscroll = showUpToTop;

//* handle click
upToTop.addEventListener("click", function () {
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
});

//* general variables
let backgroundInterval;
let toggleBtn = document.querySelector(".toggle-settings");
let setingsOptions = document.querySelector(".settings-options");
let landing = document.querySelector(".landing");
let removeOptions = document.querySelector(".remove-options");

//* settings options logic

toggleBtn.addEventListener("click", function () {
  setingsOptions.classList.toggle("open");
  document.querySelector(".toggle-settings i").classList.toggle("fa-spin");
});

//* start color logic
let color = localStorage.getItem("color");

if (color != null) {
  document.documentElement.style.setProperty("--main-color", color);
  document.querySelector(".colors li.active").classList.remove("active");
  document.querySelector(`[data-color="${color}"]`).classList.add("active");
}

//* select color box
document.querySelectorAll(".colors li").forEach((color) => {
  color.style.backgroundColor = color.getAttribute("data-color");

  color.addEventListener("click", function (e) {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color,
    );
    localStorage.setItem("color", e.target.dataset.color);

    document.querySelector(".colors li.active").classList.remove("active");
    e.target.classList.add("active");
  });
});

//* start bacground logic
let btns = document.querySelectorAll(
  ".settings-options .option-box .random-backgrounds span",
);

let backgroundOption = "yes";

let backLocalItem = localStorage.getItem("background");

if (backLocalItem != null) {
  backgroundOption = backLocalItem;
  document
    .querySelector(
      `.random-backgrounds span[data-background="${backLocalItem}"]`,
    )
    .classList.add("active");
  randomizeBack();
} else {
  document.querySelector(".random-backgrounds .yes").classList.add("active");
  backgroundOption = "yes";
  randomizeBack();
}

btns.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    //* remove active class
    btns.forEach((span) => {
      span.classList.remove("active");
    });

    clearInterval(backgroundInterval);

    checkBackBtn(e);
  });
});

//* remove options btn
removeOptions.addEventListener("click", function (e) {
  localStorage.removeItem("color");
  localStorage.removeItem("background");
  backgroundOption = "yes";
  randomizeBack();
  window.location.reload();
});

//* skills scroll animation
let skills = document.querySelector(".skills");

window.addEventListener("scroll", function () {
  let skillsTop = skills.offsetTop;
  let skillsHeight = skills.offsetHeight;
  let windowHeight = window.innerHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition >= skillsTop - windowHeight + skillsHeight / 2) {
    this.document.querySelectorAll(".progress").forEach((progress) => {
      let span = progress.querySelector("span");
      span.style.width = span.dataset.progress;
    });
  }
});

//* gallery logic

document.querySelectorAll(".imgs-container img").forEach((img) => {
  img.addEventListener("click", function (e) {
    createElements(e);
  });
});

//* features logic
let features = document.querySelector(".features");
let nums = document.querySelectorAll(".feat-nums .num");
let started = false;

window.addEventListener("scroll", function () {
  let featuresTop = features.offsetTop;
  let windowHeight = window.innerHeight;
  let scrollPosition = window.scrollY;

  if (scrollPosition >= featuresTop) {
    if (!started) {
      nums.forEach((num) => startCount(num));
    }
    started = true;
  }
});

//* type writer animation
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let elementType = document.querySelector(".type-writer");
let phrases = [
  "build websites",
  "build applications",
  "make perfect performance",
];
let phraseIndex = 0;
let time = 100;

let typeWrite = async () => {
  while (true) {
    let phrase = phrases[phraseIndex];

    for (let i = 0; i < phrase.length; i++) {
      elementType.innerText = phrase.substring(0, i + 1);
      await sleep(time);
    }

    await sleep(time * 10);

    for (let i = phrase.length; i > 0; i--) {
      elementType.innerText = phrase.substring(0, i - 1);
      await sleep(time);
    }

    await sleep(time * 5);

    if (phraseIndex == phrases.length - 1) {
      phraseIndex = 0;
    } else {
      phraseIndex++;
    }
  }
};

typeWrite();

function showUpToTop() {
  if (window.scrollY >= 300) {
    upToTop.classList.add("show");
  } else {
    upToTop.classList.remove("show");
  }
}

function randomizeBack() {
  if (backgroundOption == "yes") {
    backgroundInterval = setInterval(() => {
      let imgs = [
        "01.jpg",
        "02.jpg",
        "03.jpg",
        "04.jpg",
        "05.jpg",
        "06.png",
        "07.jpg",
        "08.jpg",
        "09.jpg",
        "10.jpg",
      ];
      let randomImg = imgs[Math.floor(Math.random() * imgs.length)];
      landing.style.backgroundImage = `url(./imgs/${randomImg})`;
    }, 5000);
    localStorage.setItem("background", "yes");
  } else {
    clearInterval(backgroundInterval);
    localStorage.setItem("background", "no");
  }
}

function checkBackBtn(e) {
  if (e.target.dataset.background == "yes") {
    backgroundOption = "yes";
    e.target.classList.add("active");
    localStorage.setItem("background", "yes");
    randomizeBack();
  } else {
    backgroundOption = "no";
    e.target.classList.add("active");
    localStorage.setItem("background", "no");
    randomizeBack();
  }
}

function createElements(e) {
  let overlay = document.createElement("div");
  overlay.className = "overlay-img";

  let imgContainer = document.createElement("div");
  imgContainer.className = "img-container";

  let imgTitle = document.createElement("h2");
  imgTitle.className = "img-title";
  imgTitle.appendChild(document.createTextNode(e.target.alt));
  imgContainer.append(imgTitle);

  let closeBtn = document.createElement("span");
  closeBtn.className = "close-btn";
  closeBtn.innerHTML = `<i class="fa-regular fa-circle-xmark"></i>`;
  imgContainer.append(closeBtn);

  imgContainer.append(e.target.cloneNode(true));

  overlay.append(imgContainer);
  document.body.appendChild(overlay);

  overlay.addEventListener("click", function (e) {
    if (e.target === overlay) {
      overlay.remove();
    }
  });

  closeBtn.addEventListener("click", function () {
    overlay.remove();
  });
}

function startCount(el) {
  let goal = el.dataset.num;
  let currentNum = 0;
  el.textContent = 0;

  let count = setInterval(() => {
    currentNum++;
    el.textContent = currentNum;
    if (currentNum >= goal) {
      clearInterval(count);
    }
  }, 2000 / goal);
}
