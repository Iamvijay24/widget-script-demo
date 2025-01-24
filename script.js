(function() {
  const loadExternalResources = () => {
    const videoJSScript = document.createElement("script");
    videoJSScript.src =
      "https://feedio-ai.s3.us-east-1.amazonaws.com/media-2/video.min.js";
    videoJSScript.onload = initializeChatWidget;
    document.head.appendChild(videoJSScript);
  };

  const initializeChatWidget = () => {
    const setupWidget = () => {
      console.log("Chat widget initialized!");
      const defaultVideoURL =
        "https://feedio-ai.s3.us-east-1.amazonaws.com/videos/media-facebot/default/default_playlist.m3u8";

      let bgColor = "#4F46E5"; // Indigo color
      let title = "FaceBot Assistant";

      // Add the `@keyframes` for the jump animation
      const styleElement = document.createElement("style");
      styleElement.type = "text/css";
      styleElement.innerHTML = `
  @keyframes jump5c619aea {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }
`;
      document.head.appendChild(styleElement);

      // Create widget
      const chatButton = document.createElement("div");
      chatButton.setAttribute("aria-label", "Open chat");
      Object.assign(chatButton.style, {
        position: "fixed",
        bottom: "8px",
        right: "8px",
        width: "56px",
        height: "56px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        zIndex: "5000",
        alignItems: "center",
        justifyContent: "center",
        // animation: "bounce 2s infinite",
        backgroundColor: "#ffffff",
        animation: "jump5c619aea 1s ease-in-out infinite"
      });
      chatButton.innerHTML = `<img src="https://picsxtra.com/images/2025/01/16/Bot-face-logo.png" alt="Chat Bot" style="width: 56px; height: 56px;" />`;

      const chatContainer = document.createElement("div");
      chatContainer.style.display = "none";
      Object.assign(chatContainer.style, {
        position: "fixed",
        bottom: "76px",
        right: "10px",
        zIndex: "50",
        width: "334px",
        backgroundColor: "#ffffff",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      });

      chatContainer.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background-color: ${bgColor}; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
            <h5 style="margin: 0;">${title}</h5>
            <button id="closeChat9f1da41f" aria-label="Close chat" style="background: none; border: none; color: #ffffff; font-size: 16px; cursor: pointer;">X</button>
          </div>
          <div style="padding: 16px; height: 384px; overflow: hidden;">
            <div style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 8px;">
              <video id="videoPlayer" class="video-js vjs-default-skin" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                Your browser does not support the video.
              </video>
            </div>
          </div>
          <div style="display: flex; align-items: center; padding: 16px; border-top: 1px solid #E5E7EB; background-color: #F9FAFB; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px;">
            <div style="position: relative; width: 100%;">
              <input id="userInputf5b7889e" type="text" placeholder="Type a message..." 
                style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); outline: none; padding-right: 80px;">
              <button id="sendMessage" style="position: absolute; top: 50%; right: 8px; transform: translateY(-50%); background-color: ${bgColor}; color: #ffffff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: background-color 0.3s;">
                Send
              </button>
            </div>
          </div>
      `;

      document.body.appendChild(chatContainer);
      document.body.appendChild(chatButton);

      // Video player setup
      const videoPlayer = videojs("videoPlayer", {
        controls: false,
        autoplay: false,
        preload: "auto",
        sources: [{ src: defaultVideoURL, type: "application/x-mpegURL" }]
      });

      videoPlayer.on("ended", () => {
        videoPlayer.src({ src: defaultVideoURL, type: "application/x-mpegURL" });
        videoPlayer.play().catch(() => console.log("Video playback failed."));
      });

      // Event listeners
      const toggleChat = () => {
        if (chatContainer.style.display === "none") {
          chatContainer.style.display = "block";
          videoPlayer.play().catch(() => console.log("Video playback failed."));
        } else {
          chatContainer.style.display = "none";
          videoPlayer.pause();
        }
      };

      chatButton.addEventListener("click", toggleChat);

      document.getElementById("closeChat9f1da41f").addEventListener("click", () => {
        chatContainer.style.display = "none";
        videoPlayer.pause();
      });

      const handlePlayButtonClick = async() => {
        const searchTerm = document
          .getElementById("userInputf5b7889e")
          .value.trim()
          .toLowerCase();

        if (!searchTerm) {
          alert("Please enter a search term.");
          return;
        }

        try {
          const response = await fetch(
            "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ question: searchTerm, action: "get_answer" })
            }
          );

          const data = await response.json();

          if (data.data) {
            const videoUrls = data.data.answer_video_url;

            if (!Array.isArray(videoUrls) || videoUrls.length === 0) {
              return;
            }

            // Set up the video playlist logic
            let currentVideoIndex = 0;

            const playNextVideo = () => {
              if (currentVideoIndex < videoUrls.length) {
                const videoUrl = videoUrls[currentVideoIndex];
                videoPlayer.src({ type: "application/x-mpegURL", src: videoUrl });
                videoPlayer
                  .play()
                  .catch(() => console.log("Video playback failed."));
                currentVideoIndex++;
              } else {
                // Play the default video after the playlist ends
                videoPlayer.src({ src: defaultVideoURL, type: "application/x-mpegURL" });
                videoPlayer
                  .play()
                  .catch(() => console.log("Default video playback failed."));
              }
            };

            // Event listener for 'ended' to play the next video
            videoPlayer.on("ended", playNextVideo);

            // Start playing the first video in the playlist
            playNextVideo();
          }

          document.getElementById("userInputf5b7889e").value = "";
        } catch (error) {
          console.error("Error fetching video:", error);
        }
      };

      document
        .getElementById("sendMessage")
        .addEventListener("click", handlePlayButtonClick);

      document.getElementById("userInputf5b7889e").addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          handlePlayButtonClick();
        }
      });
    };

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", setupWidget);
    } else {
      setupWidget();
    }
  };

  loadExternalResources();
})();
