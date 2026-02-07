  // fix autoplay in modern browsers
    const bgMusic = document.getElementById("bgMusic");
    bgMusic.volume = 0.35;
    let musicStarted = false;

    function startMusic() {
      if (!musicStarted) {
        bgMusic.play().catch(() => console.log("Autoplay blocked"));
        musicStarted = true;
      }
    }

    // Start music on first interaction if autoplay blocked
    document.addEventListener("click", startMusic, { once: true });
    document.addEventListener("mousemove", startMusic, { once: true });

    // Optional: floating hearts for celebration
    function createHeart() {
      const heart = document.createElement("div");
      heart.className = "heart";
      heart.textContent = "💖";

      const x = (Math.random() - 0.5) * 300 + "px";
      const y = -200 + "px";

      heart.style.left = (window.innerWidth / 2) + "px";
      heart.style.top = window.innerHeight + "px";
      heart.style.setProperty("--x", x);
      heart.style.setProperty("--y", y);

      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2000);
    }

    setInterval(createHeart, 500);