let slideIndex = 0;
let confettiInterval;

// Opens the envelope
function openEnvelope() {
  const envelope = document.querySelector(".envelope");
  envelope.classList.add("open");

  startSlideshow();
  startConfetti();
  playMusic();

  // Stop confetti after 10 seconds
  setTimeout(stopConfetti, 10000);
}

// Slideshow logic
function startSlideshow() {
  const slides = document.querySelectorAll(".slide");

  function showSlides() {
    slides.forEach(slide => (slide.style.display = "none"));

    slideIndex++;
    if (slideIndex > slides.length) slideIndex = slides.length;

    slides[slideIndex - 1].style.display = "block";

    if (slideIndex < slides.length) {
      setTimeout(showSlides, 2000);
    } else {
      // Show feedback after slideshow ends
      const feedback = document.querySelector(".feedback");
      feedback.style.display = "block";
    }
  }

  showSlides();
}

// Creates a single heart for confetti
function createHeart() {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerHTML = "❤️";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animationDuration = (Math.random() * 3 + 2) + "s";

  document.getElementById("confetti").appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}

// Start and stop confetti
function startConfetti() {
  if (!confettiInterval) {
    confettiInterval = setInterval(createHeart, 300);
  }
}
function stopConfetti() {
  clearInterval(confettiInterval);
  confettiInterval = null;
}

// Background music
function playMusic() {
  const audio = document.getElementById("bg-music");
  audio.volume = 0.7;
  audio.play().catch(() => console.log("Autoplay blocked"));
}

// Sends feedback to backend
function sendFeedback(answer) {
  fetch("http://localhost:5000/feedback", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answer })
  })
    .then(res => {
      if (!res.ok) throw new Error("Network response not ok");
      return res.json();
    })
    .then(data => {
      console.log("✅ Server response:", data);
      alert(data.message);
    })
    .catch(err => {
      console.error("❌ Error sending feedback:", err);
      alert("Error sending feedback.");
    });
}
