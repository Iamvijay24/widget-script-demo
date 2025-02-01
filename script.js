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
            <h5 style="margin: 0; font-size: 16px;">${title}</h5>
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
      style="width: 100%; font-size: 14px; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); outline: none; padding-right: 80px;">

    <!-- Mic button for voice record -->
    <button disabled  id="sendVoice" style="position: absolute; font-size: 14px; top: 50%; right: 75px; transform: translateY(-50%); background-color: #E5E4E2; color: #ffffff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: background-color 0.3s; cursor: no-drop;">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" id="microphone" fill="#B2BEB5">
  <path d="M17 5h-2c0-.3 0-.5-.1-.7C14.6 2.9 13.4 2 12 2s-2.6.9-2.9 2.2c-.1.3-.1.5-.1.8H7c0-.5.1-.9.2-1.3C7.7 1.5 9.7 0 12 0s4.3 1.5 4.8 3.8c.1.3.2.7.2 1.2zm-5 11c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z"></path>
  <path d="M9 5H7c0-.5.1-.9.2-1.3l1.9.5c-.1.3-.1.5-.1.8zm3 15c-5 0-9-4-9-9 0-.6.4-1 1-1s1 .4 1 1c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.6.4-1 1-1s1 .4 1 1c0 5-4 9-9 9zm4 4H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
  <path d="M12 24c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 12c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1z"></path>
</svg>
    </button>

    <!-- Send message button -->
    <button id="sendMessage" style="position: absolute; font-size: 14px; top: 50%; right: 8px; transform: translateY(-50%); background-color: #007BFF; color: #ffffff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: background-color 0.3s;">
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
