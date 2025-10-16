// Select all images in the gallery
const galleryItems = document.querySelectorAll(".gallery-item img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeBtn = document.querySelector(".close");
const thumbnailRow = document.getElementById("thumbnail-row");

let currentIndex = 0;

// Open lightbox when an image is clicked
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

// Update the main lightbox image
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

// Highlight the active thumbnail
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

// Next and previous image functions
function nextImage() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  updateLightboxImage();
}

function prevImage() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  updateLightboxImage();
}

// Optional: click outside image to close
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});
// On-screen arrow navigation
document.getElementById("next-btn").addEventListener("click", nextImage);
document.getElementById("prev-btn").addEventListener("click", prevImage);

