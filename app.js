let items = document.querySelectorAll(".slider .list .item");
let next = document.getElementById("next");
let prev = document.getElementById("prev");
let thumbnails = document.querySelectorAll(".thumbnail .item");

let countItem = items.length;
let itemActive = 0;
next.onclick = function () {
  itemActive = itemActive + 1;
  if (itemActive >= countItem) {
    itemActive = 0;
  }
  showSlider();
};
prev.onclick = function () {
  itemActive = itemActive - 1;
  if (itemActive < 0) {
    itemActive = countItem - 1;
  }
  showSlider();
};
let refreshInterval = setInterval(() => {
  next.click();
}, 5000);
function showSlider() {
  let itemActiveOld = document.querySelector(".slider .list .item.active");
  let thumbnailActiveOld = document.querySelector(".thumbnail .item.active");
  itemActiveOld.classList.remove("active");
  thumbnailActiveOld.classList.remove("active");

  items[itemActive].classList.add("active");
  thumbnails[itemActive].classList.add("active");
  setPositionThumbnail();

  clearInterval(refreshInterval);
  refreshInterval = setInterval(() => {
    next.click();
  }, 5000);
}
function setPositionThumbnail() {
  let thumbnailActive = document.querySelector(".thumbnail .item.active");
  let rect = thumbnailActive.getBoundingClientRect();
  if (rect.left < 0 || rect.right > window.innerWidth) {
    thumbnailActive.scrollIntoView({ behavior: "smooth", inline: "nearest" });
  }
}

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener("click", () => {
    itemActive = index;
    showSlider();
  });
});
const cursor = document.querySelector(".cursor");
window.addEventListener("mousemove", (e) => {
  let x = e.pageX;
  let y = e.pageY;
  cursor.style.left = `${x}px`;
  cursor.style.top = `${y}px`;
});

const navLinks = document.querySelectorAll("a");
navLinks.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("expand");
  });
  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("expand");
  });
});

const is_touch_enabled = () => {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
};

if (is_touch_enabled()) {
  document.body.removeChild(cursor);
} else {
  document.body.style.cursor = "none";
}

window.addEventListener("mouseout", (e) => {
  if (!e.relatedTarget && !e.toElement) {
    cursor.style.opacity = "0";
  }
});

window.addEventListener("mouseover", () => {
  cursor.style.opacity = "1";
});
document.addEventListener("DOMContentLoaded", function () {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  function animateOnScroll() {
    const elements = document.querySelectorAll(
      ".content-section h2, .content-section p, .content-section .fancy-button"
    );

    elements.forEach((el, index) => {
      const elementPosition = el.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.2;

      if (elementPosition < screenPosition) {
        el.classList.add("reveal-animate");
        el.classList.add(`delay-${index + 1}`);
      }
    });
  }

  function setupHorizontalScroll() {
    const track = document.querySelector(".horizontal-scroll-track");
    const items = document.querySelectorAll(".scroll-item");
    const itemWidth = items[0].offsetWidth + 30;

    const cloneCount = Math.ceil(window.innerWidth / itemWidth) + 1;
    for (let i = 0; i < cloneCount; i++) {
      items.forEach((item) => {
        track.appendChild(item.cloneNode(true));
      });
    }

    const totalWidth = itemWidth * (items.length + cloneCount);
    track.style.width = `${totalWidth}px`;

    const scrollSpeed = 1;
    let progress = 0;

    gsap.to(track, {
      x: () => -itemWidth * items.length,
      ease: "none",
      scrollTrigger: {
        trigger: ".horizontal-scroll-section",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          progress = self.progress;
        },
      },
    });

    gsap.ticker.add(() => {
      if (progress >= 0.99) {
        gsap.set(track, { x: 0 });
        ScrollTrigger.refresh();
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        gsap.to(window, {
          duration: 1,
          scrollTo: target,
          ease: "power2.inOut",
        });
      }
    });
  });

  window.addEventListener("load", animateOnScroll);
  window.addEventListener("scroll", animateOnScroll);
  animateOnScroll();
  setupHorizontalScroll();

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
});

document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  function initImageTextReveal() {
    const section = document.querySelector(".image-text-section");
    const textElements = section.querySelectorAll(
      ".text-content h2, .text-content p, .text-content .fancy-button"
    );
    const image = section.querySelector(".reveal-image");
    textElements.forEach((el, index) => {
      el.style.animationDelay = `${index * 0.15}s`;

      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        onEnter: () => el.classList.add("text-reveal"),
        once: true,
      });
    });

    ScrollTrigger.create({
      trigger: image,
      start: "top 75%",
      onEnter: () => image.classList.add("image-reveal"),
      once: true,
    });
  }

  initImageTextReveal();
});

document.addEventListener("DOMContentLoaded", function () {
  const timelineItems = document.querySelectorAll(".timeline-item");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("active");
          }, index * 200);
        }
      });
    },
    {
      threshold: 0.5,
      rootMargin: "0px 0px -100px 0px",
    }
  );

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
});
