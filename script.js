const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const thumbnailRow = document.getElementById("thumbnail-row");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let currentIndex = 0;

// Open lightbox when image is clicked
galleryItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    openLightbox(index);
  });
});

function openLightbox(index) {
  currentIndex = index;
  lightbox.style.display = "flex";
  updateLightboxImage();
  createThumbnails();
}

// Update image
function updateLightboxImage() {
  lightboxImg.src = galleryItems[currentIndex].src;
  updateActiveThumbnail();
}

// Close lightbox
closeBtn.addEventListener("click", () => {
  lightbox.style.display = "none";
});

// Create thumbnails dynamically
function createThumbnails() {
  thumbnailRow.innerHTML = "";
  galleryItems.forEach((img, i) => {
    const thumb = document.createElement("img");
    thumb.src = img.src;
    thumb.classList.add("thumbnail");
    thumb.addEventListener("click", () => {
      currentIndex = i;
      updateLightboxImage();
    });
    thumbnailRow.appendChild(thumb);
  });
  updateActiveThumbnail();
}

function updateActiveThumbnail() {
  const thumbnails = thumbnailRow.querySelectorAll("img");
  thumbnails.forEach((t, i) => {
    t.style.opacity = i === currentIndex ? "1" : "0.6";
    t.style.border = i === currentIndex ? "2px solid white" : "none";
  });
}

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
    if (e.key === "Escape") lightbox.style.display = "none";
  }
});

// Next and previous
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightboxImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightboxImage();
}

// Click outside to close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

// On-screen arrow navigation
nextBtn.addEventListener("click", nextImage);
prevBtn.addEventListener("click", prevImage);

// Fade arrows + thumbnails in/out on mouse movement
let fadeTimeout;
const lightboxEl = document.getElementById("lightbox");

function showControls() {
  lightboxEl.classList.add("show-arrows");
  lightboxEl.classList.add("show-thumbnails");

  clearTimeout(fadeTimeout);
  fadeTimeout = setTimeout(() => {
    lightboxEl.classList.remove("show-arrows");
    lightboxEl.classList.remove("show-thumbnails");
  }, 2000); // hide after 2s of inactivity
}

lightboxEl.addEventListener("mousemove", showControls);
document.addEventListener("keydown", showControls);

