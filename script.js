(function () {
  const loadExternalResources = () => {
    const videoJSScript = document.createElement("script");
    videoJSScript.src = "https://feedio-ai.s3.us-east-1.amazonaws.com/media-2/video.min.js";
    videoJSScript.onload = initializeChatWidget;
    document.head.appendChild(videoJSScript);
  };

  
  const initializeChatWidget = () => {
    const setupWidget = () => {
      const fb_partner_id = document.getElementById("fb_widget_script")?.getAttribute("fb_partner_id");
      console.log("Chat widget initialized!");
      const defaultVideoURL = `https://facebot-videos.s3.us-west-2.amazonaws.com/${fb_partner_id}/videos/knowledge_base/default/1_playlist.m3u8`;
      let bgColor = "#4F46E5";
      let title = "FaceBot Assistant";


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
        backgroundColor: "#ffffff",
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
            <button id="closeChat" aria-label="Close chat" style="background: none; border: none; color: #ffffff; font-size: 16px; cursor: pointer;">X</button>
          </div>
          <div style="padding: 16px; height: 384px; overflow: hidden;">
            <div style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 8px;">
              <video id="videoPlayer" class="video-js vjs-default-skin" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">
                Your browser does not support the video.
              </video>
            </div>
          </div>
       <div style="position: relative; width: 100%; padding: 12px 5px;">
    <input id="userInput" type="text" placeholder="Type a message..."
      style="width: 100%; font-size: 14px; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); outline: none; padding-right: 80px;">

    <!-- Mic button for voice record -->
    <button  id="sendVoice" style="position: absolute; font-size: 14px; top: 50%; right: 75px; transform: translateY(-50%); color:rgb(103, 63, 63); padding: 8px 16px; border-radius: 8px; border: none; transition: background-color 0.3s; cursor: pointer;">
      <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" id="microphone" fill="#B2BEB5">
        <path d="M17 5h-2c0-.3 0-.5-.1-.7C14.6 2.9 13.4 2 12 2s-2.6.9-2.9 2.2c-.1.3-.1.5-.1.8H7c0-.5.1-.9.2-1.3C7.7 1.5 9.7 0 12 0s4.3 1.5 4.8 3.8c.1.3.2.7.2 1.2zm-5 11c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z"></path>
        <path d="M9 5H7c0-.5.1-.9.2-1.3l1.9.5c-.1.3-.1.5-.1.8zm3 15c-5 0-9-4-9-9 0-.6.4-1 1-1s1 .4 1 1c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.6.4-1 1-1s1 .4 1 1c0 5-4 9-9 9zm4 4H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
        <path d="M12 24c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 12c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1z"></path>
      </svg>
    </button>

    <!-- Send message button -->
    <button id="sendMessage" style="position: absolute; font-size: 14px; top: 50%; right: 8px; transform: translateY(-50%); background-color: #007BFF; color: #ffffff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: background-color 0.3s;">
      Send
    </button>
</div>`;

      document.body.appendChild(chatContainer);
      document.body.appendChild(chatButton);

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

      const toggleChat = () => {
        if (chatContainer.style.display === "none") {
          chatContainer.style.display = "block";
          chatContainer.style.opacity = "0";
          chatContainer.style.transform = "translateY(20px)";
          setTimeout(() => {
            chatContainer.style.opacity = "1";
            chatContainer.style.transform = "translateY(0)";
            chatContainer.style.transition = "opacity 0.3s ease, transform 0.3s ease";
          }, 10);

          videoPlayer.play().catch(() => console.log("Video playback failed."));
        } else {
          chatContainer.style.opacity = "0";
          chatContainer.style.transform = "translateY(20px)";
          setTimeout(() => {
            chatContainer.style.display = "none";
          }, 300);
          videoPlayer.pause();
        }
      };


      chatButton.addEventListener("click", toggleChat);
      document.getElementById("closeChat").addEventListener("click", toggleChat);

      const userInput = document.getElementById("userInput");
      const sendMessage = document.getElementById("sendMessage");
      const sendVoice = document.getElementById("sendVoice");

      userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage.click();
        }
      });

      let recognition;
      let isRecording = false;



      let mediaRecorder;
      let audioChunks = [];

      sendVoice.addEventListener("click", async () => {
        if (!isRecording) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            audioChunks = [];

            mediaRecorder.ondataavailable = (event) => {
              audioChunks.push(event.data);
            };

            mediaRecorder.onstop = async () => {
              const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
              const reader = new FileReader();

              reader.onloadend = async () => {
                const base64Audio = reader.result.split(",")[1]; // Extract base64 string

                try {
                  const response = await fetch("https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev/", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ audioMessage: base64Audio, action: "get_answer_for_voice", partner_id: fb_partner_id })
                  });

                  const data = await response.json();
                  if (data.data?.answer_video_url?.length) {
                    userInput.value = "";

                    // Store default ended handler
                    const defaultEndedHandler = () => {
                      videoPlayer.src({
                        src: defaultVideoURL,
                        type: "application/x-mpegURL",
                      });
                      videoPlayer.play().catch(() => console.log("Video playback failed."));
                    };

                    // Remove previous ended listeners
                    videoPlayer.off("ended");

                    // Create a copy of the video URLs array
                    const videoQueue = [...data.data.answer_video_url];

                    // Function to play videos sequentially
                    const playNextVideo = () => {
                      if (videoQueue.length > 0) {
                        const nextVideo = videoQueue.shift();
                        videoPlayer.src({
                          src: nextVideo,
                          type: "application/x-mpegURL",
                        });

                        // Play the video and set event listener for when it ends
                        videoPlayer
                          .play()
                          .then(() => {
                            videoPlayer.one("ended", playNextVideo);
                          })
                          .catch(() => console.log("Video playback failed."));
                      } else {
                        // When queue is empty, return to default video
                        defaultEndedHandler();
                        videoPlayer.on("ended", defaultEndedHandler);
                      }
                    };

                    // Start playing the first video in the queue
                    playNextVideo();
                  }
                } catch (error) {
                  console.error("Error fetching answer:", error);
                }
              };

              reader.readAsDataURL(audioBlob);
            };

            mediaRecorder.start();
            sendVoice.innerHTML = "🔴";
            isRecording = true;
            userInput.placeholder = "Listening...";

          } catch (error) {
            console.error("Error accessing microphone:", error);
          }
        } else {
          mediaRecorder.stop();
          sendVoice.innerHTML = `   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" id="microphone" fill="#B2BEB5">
        <path d="M17 5h-2c0-.3 0-.5-.1-.7C14.6 2.9 13.4 2 12 2s-2.6.9-2.9 2.2c-.1.3-.1.5-.1.8H7c0-.5.1-.9.2-1.3C7.7 1.5 9.7 0 12 0s4.3 1.5 4.8 3.8c.1.3.2.7.2 1.2zm-5 11c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z"></path>
        <path d="M9 5H7c0-.5.1-.9.2-1.3l1.9.5c-.1.3-.1.5-.1.8zm3 15c-5 0-9-4-9-9 0-.6.4-1 1-1s1 .4 1 1c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.6.4-1 1-1s1 .4 1 1c0 5-4 9-9 9zm4 4H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
        <path d="M12 24c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 12c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1z"></path>
      </svg>`;
          isRecording = false;
          userInput.placeholder = "Type a message...";

        }
      });


      sendMessage.addEventListener("click", async () => {
        const searchTerm = userInput.value.trim();
        if (!searchTerm) {
          alert("Please enter a message.");
          return;
        }

        try {
          const response = await fetch(
            "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev/",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                question: searchTerm,
                action: "get_answer",
                partner_id: fb_partner_id,
              }),
            }
          );

          const data = await response.json();
          if (data.data?.answer_video_url?.length) {
            userInput.value = "";

            // Store default ended handler
            const defaultEndedHandler = () => {
              videoPlayer.src({
                src: defaultVideoURL,
                type: "application/x-mpegURL",
              });
              videoPlayer.play().catch(() => console.log("Video playback failed."));
            };

            // Remove previous ended listeners
            videoPlayer.off("ended");

            // Create a copy of the video URLs array
            const videoQueue = [...data.data.answer_video_url];

            // Function to play videos sequentially
            const playNextVideo = () => {
              if (videoQueue.length > 0) {
                const nextVideo = videoQueue.shift();
                videoPlayer.src({
                  src: nextVideo,
                  type: "application/x-mpegURL",
                });

                // Play the video and set event listener for when it ends
                videoPlayer
                  .play()
                  .then(() => {
                    videoPlayer.one("ended", playNextVideo);
                  })
                  .catch(() => console.log("Video playback failed."));
              } else {
                // When queue is empty, return to default video
                defaultEndedHandler();
                videoPlayer.on("ended", defaultEndedHandler);
              }
            };

            // Start playing the first video in the queue
            playNextVideo();
          }
        } catch (error) {
          console.error("Error fetching answer:", error);
        }
      });


    };

    setupWidget();
  };

  loadExternalResources();
})();
