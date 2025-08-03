//your code here
const imageContainer = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

// Image class names
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];

let selectedImages = [];
let imageElements = [];

function generateImages() {
  const duplicateIndex = Math.floor(Math.random() * 5);
  const images = [...imageClasses];
  images.push(imageClasses[duplicateIndex]); // Add duplicate

  // Shuffle images
  images.sort(() => 0.5 - Math.random());

  // Clear container and state
  imageContainer.innerHTML = "";
  selectedImages = [];
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Create image elements
  imageElements = images.map((cls, i) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.imgClass = cls;
    img.addEventListener("click", () => handleImageClick(img));
    return img;
  });

  imageElements.forEach(img => imageContainer.appendChild(img));
}

function handleImageClick(img) {
  if (!img.classList.contains("selected")) {
    img.classList.add("selected");
    selectedImages.push(img);

    if (selectedImages.length === 1) {
      resetBtn.style.display = "inline-block";
    }

    if (selectedImages.length === 2) {
      verifyBtn.style.display = "inline-block";
    }

    if (selectedImages.length > 2) {
      // Limit to 2 selections
      selectedImages.forEach(i => i.classList.remove("selected"));
      selectedImages = [];
      verifyBtn.style.display = "none";
      message.textContent = "You can only select two tiles.";
    }
  }
}

resetBtn.addEventListener("click", () => {
  selectedImages.forEach(img => img.classList.remove("selected"));
  selectedImages = [];
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
});

verifyBtn.addEventListener("click", () => {
  if (selectedImages.length === 2) {
    if (selectedImages[0].dataset.imgClass === selectedImages[1].dataset.imgClass) {
      message.textContent = "You are a human. Congratulations!";
    } else {
      message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyBtn.style.display = "none";
});

window.onload = generateImages;