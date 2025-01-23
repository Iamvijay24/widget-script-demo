(function () {
  const tailwindCSSLink = document.createElement("link");
  tailwindCSSLink.rel = "stylesheet";
  tailwindCSSLink.href =
    "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
  document.head.appendChild(tailwindCSSLink);

  const videoJSLink = document.createElement("link");
  videoJSLink.rel = "stylesheet";
  videoJSLink.href =
    "https://cdn.jsdelivr.net/npm/video.js@8.21.0/dist/video.min.css";
  document.head.appendChild(videoJSLink);

  const videoJSScript = document.createElement("script");
  videoJSScript.src =
    "https://cdn.jsdelivr.net/npm/video.js@8.21.0/dist/video.min.js";
  document.head.appendChild(videoJSScript);

  videoJSScript.onload = function () {
    document.addEventListener("DOMContentLoaded", function () {
      const videoBasePath =
        "https://feedio-ai.s3.us-east-1.amazonaws.com/videos/media-facebot/";

      let bg_color = `bg-indigo-600`;
      let title = "FaceBot Assistant";

      const createWidget = () => {
        const chatButton = document.createElement("div");
        chatButton.className =
          "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full cursor-pointer flex items-center justify-center animate-bounce";
        chatButton.innerHTML = `<img src="https://picsxtra.com/images/2025/01/16/Bot-face-logo.png" alt="Chat Bot" class="w-10 h-10" />`;

        const chatContainer = document.createElement("div");
        chatContainer.style.display = "none";
        chatContainer.className =
          "fixed bottom-24 right-10 z-50 w-96 bg-white border border-gray-300 rounded-lg shadow-lg";

        chatContainer.innerHTML = `
            <div class="flex justify-between items-center p-4 ${bg_color} text-white rounded-t-lg">
              <h5>${title}</h5>
              <button id="closeChat" class="text-white">X</button>
            </div>
            <div class="p-4 space-y-2 h-96">
              <div class="relative w-full h-full overflow-hidden rounded-lg">
                <video id="videoPlayer" class="video-js vjs-default-skin" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                  Your browser does not support the video.
                </video>
              </div>
            </div>
            <div class="flex items-center p-4 border-t bg-gray-100 rounded-[0px_0px_8px_8px]">
              <div class="relative w-full">
                <input id="userInput" type="text" placeholder="Type a message..." class="w-full p-3 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none pr-20">
                <button id="sendMessage" class="absolute top-1/2 right-2 transform -translate-y-1/2 bg-indigo-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-indigo-700 transition focus:ring-2 focus:ring-indigo-400 focus:outline-none">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 128 128" id="send">
                    <path stroke="#ffff" stroke-width="7" d="M32.523 55.8837C25.7086 41.9768 22.3014 35.0233 23.9101 30.9241C24.8875 28.4336 26.8223 26.4385 29.2817 25.3851C33.3295 23.6514 40.3843 26.8436 54.4939 33.228L82.2307 45.7786C99.5721 53.6254 108.243 57.5488 108.243 64C108.243 70.4512 99.5721 74.3746 82.2307 82.2214L54.4938 94.772C40.3843 101.156 33.3295 104.349 29.2817 102.615C26.8223 101.561 24.8875 99.5664 23.9101 97.0759C22.3014 92.9767 25.7086 86.0232 32.523 72.1163V72.1163C34.0948 68.9087 34.8806 67.3049 35.1314 65.6137C35.2901 64.5437 35.2901 63.4563 35.1314 62.3863C34.8806 60.6951 34.0948 59.0913 32.523 55.8837V55.8837Z" />
                    <path stroke="#ffff" stroke-linecap="round" stroke-width="7" d="M60 64H36" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        `;

        document.body.appendChild(chatContainer);
        document.body.appendChild(chatButton);

        chatButton.addEventListener("click", () => {
          if (chatContainer.style.display === "none") {
            chatContainer.style.display = "block";
          } else {
            chatContainer.style.display = "none";
            const videoPlayer = videojs("videoPlayer");
            videoPlayer.pause(); // Stop the video
          }
        });

        document.getElementById("closeChat").addEventListener("click", () => {
          chatContainer.style.display = "none";
          const videoPlayer = videojs("videoPlayer");
          videoPlayer.pause(); // Stop the video when the close button is clicked
        });

       const videoPlayer = videojs("videoPlayer", {
  autoplay: true,
  controls: false,
  preload: "auto",
  sources: [
    {
      src: "https://feedio-ai.s3.us-east-1.amazonaws.com/videos/media-facebot/default/default_playlist.m3u8", // Default video
      type: "application/x-mpegURL",
    },
  ],
  techOrder: ["html5", "flash"],
});

videoPlayer.on('ended', () => {
  videoPlayer.src({
    type: "application/x-mpegURL",
      src: "https://feedio-ai.s3.us-east-1.amazonaws.com/videos/media-facebot/default/default_playlist.m3u8", // Default video
  });
  videoPlayer.play().catch((error) => {
  });
  videoPlayer.loop(true);
});


        const handlePlayButtonClick = async () => {
          const searchTerm = document
            .getElementById("userInput")
            .value.trim()
            .toLowerCase();
          
          if (!searchTerm) {
            alert("Please enter a search term.");
            return;
          }

          // Api call
          try {
            const response = await fetch("https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              mode: 'cors',
              body: JSON.stringify({ question: searchTerm, action: "get_answer" }),
            });

            const data = await response.json();

            if (data.data) {
              const videoUrl = videoBasePath + data.data.answer_video_url;
              videoPlayer.src({ type: "application/x-mpegURL", src: videoUrl });
              videoPlayer.ready(() => {
                videoPlayer.play().catch((error) => {
                });
                videoPlayer.loop(false);
              });
            } else {
            }

            document.getElementById("userInput").value = '';
          } catch (error) {
            console.error("Error fetching video:", error);
          }
        };

        document
          .getElementById("sendMessage")
          .addEventListener("click", handlePlayButtonClick);
        document
          .getElementById("userInput")
          .addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
              handlePlayButtonClick();
            }
          });
      };

      createWidget();
    });
  };
})();