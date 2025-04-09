// version 7.0.1.04082025
(function () {
  const loadExternalResources = () => {
    const videoJSScript = document.createElement("script");
    videoJSScript.src =
      "https://feedio-ai.s3.us-east-1.amazonaws.com/media-2/video.min.js";
    videoJSScript.onload = initializeChatWidget;
    document.head.appendChild(videoJSScript);

    // Add Tailwind CSS
    const tailwindLink = document.createElement("link");
    tailwindLink.rel = "stylesheet";
    tailwindLink.href =
      "https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css";
    document.head.appendChild(tailwindLink);

  };

  const initializeChatWidget = () => {
    const setupWidget = () => {
      const fb_partner_id = document
        .getElementById("fb_widget_script")
        ?.getAttribute("fb_partner_id");
      console.log("Chat widget initialized!");
      const defaultVideoURL = `https://d1jcbfcd9v1do3.cloudfront.net/${fb_partner_id}/videos/knowledge_base/facebot/default/1_playlist.m3u8`;
      let bgColor = "#034b83";
      let title = "AI assistant 24/7";

      const askContactVideoUrl = `https://d1jcbfcd9v1do3.cloudfront.net/${fb_partner_id}/videos/knowledge_base/facebot/contact/contact_playlist.m3u8`;

      const getInformationFromUser = null;


      const chatButton = document.createElement("div");
      chatButton.setAttribute("aria-label", "Open chat");
      Object.assign(chatButton.style, {
        position: "fixed",
        bottom: "8px",
        right: "8px",
        width: "59px",
        height: "59px",
        borderRadius: "50%",
        cursor: "pointer",
        display: "flex",
        zIndex: "5000",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff",
        animation: "bounce 1.5s infinite ease-in-out",
      });
      chatButton.innerHTML = `
      <svg width="52" height="52" viewBox="0 0 29 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fill-rule="evenodd" clip-rule="evenodd" d="M17.2503 2.76209C17.2503 1.2642 16.0474 2.38419e-07 14.5026 0C12.9578 -2.38419e-07 11.755 1.2642 11.755 2.76209C11.755 3.94518 12.5053 4.98248 13.5819 5.36624V7.98275L13.5819 7.9855H6.08085C4.72488 7.9855 3.62565 9.08473 3.62565 10.4407V35.3857C3.62565 35.9684 4.36145 36.2232 4.7218 35.7653L9.1125 30.1861C9.13538 30.157 9.15513 30.1267 9.17188 30.0956H22.9205C24.2764 30.0956 25.3757 28.9964 25.3757 27.6404V10.4407C25.3757 9.08473 24.2764 7.9855 22.9205 7.9855H15.4233L15.4233 7.98275V5.36624C16.4999 4.98248 17.2503 3.94518 17.2503 2.76209ZM14.5026 3.68279C13.9588 3.68279 13.5675 3.24301 13.5675 2.76209C13.5675 2.28117 13.9588 1.8414 14.5026 1.8414C15.0464 1.8414 15.4378 2.28117 15.4378 2.76209C15.4377 3.24301 15.0464 3.68279 14.5026 3.68279ZM10.4212 17.1973C11.5057 17.1973 12.3848 16.3039 12.3848 15.2018C12.3848 14.0997 11.5057 13.2063 10.4212 13.2063C9.33679 13.2063 8.45768 14.0997 8.45768 15.2018C8.45768 16.3039 9.33679 17.1973 10.4212 17.1973ZM19.9382 23.0333V23.954C19.9382 24.858 19.0497 25.4885 18.1257 25.4885H17.8249V23.0333H19.9382ZM16.9186 23.0333V25.4885H15.1061V23.0333H16.9186ZM12.3874 25.4885H14.1999V23.0333H12.3874V25.4885ZM11.4811 23.0333V25.4885H10.8757C9.95164 25.4885 9.06315 24.858 9.06315 23.954V23.0333H11.4811ZM20.541 15.2018C20.541 16.3039 19.6619 17.1973 18.5775 17.1973C17.493 17.1973 16.6139 16.3039 16.6139 15.2018C16.6139 14.0997 17.493 13.2063 18.5775 13.2063C19.6619 13.2063 20.541 14.0997 20.541 15.2018Z" fill="url(#paint0_linear_2322_2057)"/>
      <path d="M1.51042 22.4181L2.41667 22.4181L2.41667 15.3551H1.51042C0.620625 15.3551 1.86905e-07 16.2583 1.46218e-07 17.1977L0 20.5756C-4.06872e-08 21.5149 0.620625 22.4181 1.51042 22.4181Z" fill="url(#paint1_linear_2322_2057)"/>
      <path d="M26.5846 22.4181L27.4909 22.4181C28.3807 22.4181 29.0013 21.5149 29.0013 20.5756V17.1977C29.0013 16.2583 28.3807 15.3551 27.4909 15.3551H26.5846V22.4181Z" fill="url(#paint2_linear_2322_2057)"/>
      <defs>
      <linearGradient id="paint0_linear_2322_2057" x1="21.472" y1="11.5317" x2="3.70572" y2="35.8565" gradientUnits="userSpaceOnUse">
      <stop stop-color="#13C9DD"/>
      <stop offset="1" stop-color="#0A30D2"/>
      </linearGradient>
      <linearGradient id="paint1_linear_2322_2057" x1="21.472" y1="11.5317" x2="3.70572" y2="35.8565" gradientUnits="userSpaceOnUse">
      <stop stop-color="#13C9DD"/>
      <stop offset="1" stop-color="#0A30D2"/>
      </linearGradient>
      <linearGradient id="paint2_linear_2322_2057" x1="21.472" y1="11.5317" x2="3.70572" y2="35.8565" gradientUnits="userSpaceOnUse">
      <stop stop-color="#13C9DD"/>
      <stop offset="1" stop-color="#0A30D2"/>
      </linearGradient>
      </defs>
      </svg>
      `;

      const style = document.createElement("style");
      style.innerHTML = `
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        img{
         display: unset;
        }

      #fb_loader {
        width: 60px;
        position: relative;
        left: 40%;
        top: 50%;
        z-index: -9999;
        aspect-ratio: 4;
        --_g: no-repeat radial-gradient(circle closest-side, #034b83 90%, #0000);
        background:
          var(--_g) 0%   50%,
          var(--_g) 50%  50%,
          var(--_g) 100% 50%;
        background-size: calc(100%/3) 100%;
        animation: l7 1s infinite linear;
      }
      @keyframes l7 {
          33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
          50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
          66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
      }

       /* Tooltip styles */
    .fb_tooltip {
    }
        .fb_tooltip .fb_tooltip_text {
      visibility: hidden;
      width: 120px;
      font-size: 10px;
      background-color: black;
      color: #fff;
      text-align: center;
      border-radius: 3px;
      padding: 5px 0;
      position: absolute;
      z-index: 1;
      bottom: 100%;
      left: 70%;
      margin-left: -60px;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .fb_tooltip .fb_tooltip_text::after {
      content: "";
      position: absolute;
      top: 100%;
      left: 50%;
      margin-left: -5px;
      border-width: 5px;
      border-style: solid;
      border-color: black transparent transparent transparent;
    }

    .fb_tooltip:hover .fb_tooltip_text {
      visibility: visible;
      opacity: 1;
    }

    #fb_extraMessage {
      position: absolute ! important;
    font-size: 12px !important;
    margin: 0 !important;
    bottom: 6.5rem !important;
    left: 8rem !important;
    color:rgb(66, 163, 66);
    }

    #fb_loader {
        width: 60px;
        position: relative;
        left: 40%;
        top: 50%;
        z-index: -9999;
        aspect-ratio: 4;
        --_g: no-repeat radial-gradient(circle closest-side, #034b83 90%, #0000);
        background:
          var(--_g) 0%   50%,
          var(--_g) 50%  50%,
          var(--_g) 100% 50%;
        background-size: calc(100%/3) 100%;
        animation: l7 1s infinite linear;
      }
      @keyframes l7 {
          33%{background-size:calc(100%/3) 0%  ,calc(100%/3) 100%,calc(100%/3) 100%}
          50%{background-size:calc(100%/3) 100%,calc(100%/3) 0%  ,calc(100%/3) 100%}
          66%{background-size:calc(100%/3) 100%,calc(100%/3) 100%,calc(100%/3) 0%  }
      }

      .vjs-loading-spinner {
        display: none;
      }

      `;

      document.head.appendChild(style);

      const chatContainer = document.createElement("div");
      chatContainer.style.display = "none";
      Object.assign(chatContainer.style, {
        position: "fixed",
        bottom: "76px",
        right: "10px",
        zIndex: "1050",
        width: "334px",
        backgroundColor: "#ffffff",
        border: "1px solid #D1D5DB",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      });

      chatContainer.innerHTML = `
                <div style="display: flex; justify-content: space-between; align-items: center; z-index: 5000; padding: 16px; background-color: ${bgColor}; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
  <h5 style="margin: 0; font-size: 16px;">${title}</h5>
  <button id="fb_closeChat" aria-label="Close chat" style="background: none; border: none; color: #ffffff; font-size: 16px; cursor: pointer;">X</button>
</div>
<div style="padding: 16px; height: 384px; overflow: hidden;">
  <div style="position: relative; width: 100%; height: 100%; overflow: hidden; border-radius: 8px;">
   

    <!-- Fixed the style attribute for the form div -->
    <div id="fb_form_wrapper" style="display: none;">
      <img src="https://radiance.b-cdn.net/logo.svg" id="fb_clint_logo" alt="logo" width="60%" />
     <form style="max-width: 300px; margin: 24px auto;" id="fb_form" action="https://webto.salesforce.com/servlet/servlet.WebToLead?encoding=UTF-8&orgId=00D2v000001XZrO" method="POST">
     <input type=hidden name="oid" value="00D2v000001XZrO">

    <div style="margin-bottom: 20px;">
        <label for="name" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #1F2937;">Name*</label>
        <input type="text" id="fb_name" name="last_name" style="background-color: #F9FAFB; border: 1px solid #D1D5DB; color: #1F2937; font-size: 14px; border-radius: 8px; padding: 10px; width: 100%;" placeholder="Name..." required />
    </div>
    <div style="margin-bottom: 20px;">
        <label for="email" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #1F2937;">Email</label>
        <input type="email" id="fb_email" name="email" style="background-color: #F9FAFB; border: 1px solid #D1D5DB; color: #1F2937; font-size: 14px; border-radius: 8px; padding: 10px; width: 100%;" placeholder="Email..." />
    </div>
    <div>
        <label for="phone" style="display: block; margin-bottom: 8px; font-size: 14px; font-weight: 600; color: #1F2937;">Phone Number*</label>
        <input type="number" id="fb_phoneNumber" name="00N2v00000YCv9z" style="background-color: #F9FAFB; border: 1px solid #D1D5DB; color: #1F2937; font-size: 14px; border-radius: 8px; padding: 10px; width: 100%;" placeholder="Phone..." required />
    </div>
     </form>

    </div>
    <div id="fb_loader"></div>
    <video id="videoPlayer" preload="auto" class="vjs-tech" playsinline webkit-playsinline style="width: 100%; height: 100%; z-index: 1000; object-fit: cover; border-radius: 8px;">
      Your browser does not support the video.
    </video>
  </div>
</div>
<p id="fb_extraMessage" style="visibility: hidden;">contact saved successfully!</p>
<div style="position: relative; width: 100%; padding: 12px 5px;" id="messageContainer">
<input id="fb_userInput" type="text" placeholder="Ask anything..." style="width: 100%; font-size: 14px; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); outline: none; padding-right: 110px;" />

<!-- Mic button for voice record -->
<div class="fb_tooltip">
<button id="fb_sendVoice" style="position: absolute; font-size: 14px; top: 50%; right: 75px; transform: translateY(-50%); color:rgb(103, 63, 63); padding: 8px 16px; border-radius: 8px; border: none; transition: background-color 0.3s; cursor: pointer;">
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" id="microphone" fill="#B2BEB5">
<path d="M17 5h-2c0-.3 0-.5-.1-.7C14.6 2.9 13.4 2 12 2s-2.6.9-2.9 2.2c-.1.3-.1.5-.1.8H7c0-.5.1-.9.2-1.3C7.7 1.5 9.7 0 12 0s4.3 1.5 4.8 3.8c.1.3.2.7.2 1.2zm-5 11c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z"></path>
<path d="M9 5H7c0-.5.1-.9.2-1.3l1.9.5c-.1.3-.1.5-.1.8zm3 15c-5 0-9-4-9-9 0-.6.4-1 1-1s1 .4 1 1c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.6.4-1 1-1s1 .4 1 1c0 5-4 9-9 9zm4 4H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
<path d="M12 24c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 12c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1z"></path>
</svg>
</button>
<span class="fb_tooltip_text" id="fb_micTooltip">Click to Start Recording</span>
</div>

<!-- Send message button -->
<button id="fb_sendMessage" type="submit" style="position: absolute; font-size: 14px; top: 50%; right: 8px; transform: translateY(-50%); background-color: #034b83; color: #ffffff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: background-color 0.3s;">
Send
</button>
<a style="margin: 0; font-size: 5px; position: absolute; bottom: 3px; right: .6rem; text-decoration: none;" href="https://face-bot.ai/" target="_blank" id="fb_logo">
    <span style="color: black;">Powered by</span> 
    <span style="color: #034b83;">Face-Bot.ai</span>
</a>

</div>`;

      document.body.appendChild(chatContainer);
      document.body.appendChild(chatButton);

      const videoPlayer = videojs("videoPlayer", {
        controls: true,
        autoplay: false,
        preload: "auto",
        sources: [{ src: defaultVideoURL, type: "application/x-mpegURL" }],
      });

      videoPlayer.on("ended", () => {
        resetVideoSource(defaultVideoURL);

        userInput.disabled = false;
        sendVoice.disabled = false;
        sendMessage.disabled = false;
      });

      const resetVideoSource = (src) => {
        videoPlayer.pause();

        setTimeout(() => {
          videoPlayer.src({
            src: src,
            type: "application/x-mpegURL",
          });

          videoPlayer.play().catch(error => {
            console.error("Video playback failed:", error);
          });
        }, 50);  // Minimal delay
      };

      // Add error handling
      videoPlayer.on('error', function (event) {
        console.error("Video playback error:", videoPlayer.error());
        videoPlayer.pause();

        resetVideoSource(defaultVideoURL);
      });

      // Create a loader element dynamically
      const loader = document.createElement("div");
      loader.id = "fb_loader";
      loader.style.display = "none"; // Hide loader initially
      loader.innerHTML = `
  <div class="fb_loader">
    <div class="loader"></div>
</div>
`;

      // Append the loader to the video player container
      videoPlayer.el().appendChild(loader);

      videoPlayer.on("waiting", () => {
        loader.style.display = "block"; // Show loader
      });

      videoPlayer.on("playing", () => {
        loader.style.display = "none"; // Hide loader
      });

      videoPlayer.on('loadedmetadata', function () {
        console.log('Metadata loaded, preloading segments...');

        var bufferedCheck = setInterval(function () {
          if (videoPlayer.buffered().length > 0) {
            var bufferEnd = videoPlayer.buffered().end(0);
            var duration = videoPlayer.duration();

            console.log(`Buffered: ${bufferEnd.toFixed(2)}s of ${duration.toFixed(2)}s`);

            if (bufferEnd >= duration - 1) {
              console.log('Fully buffered, starting playback...');
              clearInterval(bufferedCheck);
              videoPlayer.play();
            }
          }
        }, 500); // Check buffer every 500ms
      });


      const toggleChat = () => {
        if (chatContainer.style.display === "none") {
          chatContainer.style.display = "block";
          chatContainer.style.opacity = "0";
          chatContainer.style.transform = "translateY(20px)";
          setTimeout(() => {
            chatContainer.style.opacity = "1";
            chatContainer.style.transform = "translateY(0)";
            chatContainer.style.transition =
              "opacity 0.3s ease, transform 0.3s ease";
          }, 10);

          const cookieName = "fb_user_id";
          let userId = getCookie(cookieName);
          if (!userId) {
            userIdGenerated = generateUUID();
            setCookie(cookieName, userIdGenerated, 365);
          }

          const sessionId = sessionStorage.getItem("fb_session_id");



          // API call for Initialize survey
          const initializeSurvey = async () => {
            const userId = getCookie("fb_user_id");

            const response = await fetch(
              "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  action: "initialize",
                  partner_id: fb_partner_id,
                  user_id: userId,
                  fb_id: fb_partner_id
                }),
              }
            );

            const data = await response.json();
            if (data.data?.chat_session) {
              sessionStorage.setItem('fb_session_id', data.data?.chat_session);

              const initVideo = data.data?.answer_video_url[0];
              if (initVideo) {
                resetVideoSource(initVideo);
              }

            }
          };


          if (!sessionId) {
            initializeSurvey();  // Call the initializeSurvey function
          } else {
            resetVideoSource(defaultVideoURL);
          }

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
      document
        .getElementById("fb_closeChat")
        .addEventListener("click", toggleChat);

      const userInput = document.getElementById("fb_userInput");
      const sendMessage = document.getElementById("fb_sendMessage");
      const sendVoice = document.getElementById("fb_sendVoice");
      const phoneNumber = document.getElementById("fb_phoneNumber");
      const nameInput = document.getElementById("fb_name");
      const emailInput = document.getElementById("fb_email");
      const sendContact = document.getElementById("fb_sendContact");
      const micTooltip = document.getElementById("fb_micTooltip");

      const messageContainer =
        document.getElementById("fb_messageContainer");
      const extraMessage = document.getElementById("fb_extraMessage");
      const videoPlayerElement = document.getElementById("videoPlayer");
      const form = document.getElementById("fb_form_wrapper");

      userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage.click();
        }
      });

      phoneNumber.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && !event.shiftKey) {
          event.preventDefault();
          sendMessage.click();
        }
      });

      let isRecording = false;
      let mediaRecorder;
      let audioChunks = [];

      sendVoice.addEventListener("click", async () => {
        const userId = getCookie("fb_user_id");
        const sessionId = sessionStorage.getItem('fb_session_id');


        if (!isRecording) {

          try {
             const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    // Initialize MediaRecorder with 'audio/mp4'
    const mimeType = 'audio/mp4';
    if (!MediaRecorder.isTypeSupported(mimeType)) {
      alert('mp4 format not supported');
      return;
    }

    mediaRecorder = new MediaRecorder(stream, { mimeType });
    audioChunks = [];

    mediaRecorder.ondataavailable = (event) => {
      // Collect audio data chunks
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });

      // Debug: Check if the blob is empty or null
      if (!audioBlob.size) {
        alert('Audio Blob is empty!');
        return;
      }

      const reader = new FileReader();

              // Handle read as DataURL (base64 encoding)
              reader.onloadend = async () => {
                const base64Audio = reader.result.split(",")[1];
                if(!base64Audio){
                  alert("Base64 encoded problem")
                 return;
                }

                try {
                  const response = await fetch(
                    "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        audioMessage: base64Audio,
                        action: "get_answer_for_voice",
                        partner_id: fb_partner_id,
                        user_id: userId,
                        session_id: sessionId

                      }),
                    }
                  );

                  const data = await response.json();
                  if (data.data?.answer_video_url?.length) {
                    userInput.value = "";
                    videoPlayCount++;

                    // Define default handler to revert to default video and show input
                    const defaultEndedHandler = () => {
                      resetVideoSource(defaultVideoURL);

                      // Show input fields again when default video starts
                      userInput.disabled = false;
                      sendVoice.disabled = false;
                      sendMessage.disabled = false;

                      userInput.style.cursor = "pointer";
                      sendVoice.style.cursor = "pointer";
                      sendMessage.style.cursor = "pointer";
                    };

                    // Remove previous ended listeners
                    videoPlayer.off("ended");

                    // Create a copy of the video URLs array
                    const videoQueue = [...data.data.answer_video_url];

                    // Function to play videos sequentially
                    const playNextVideo = () => {
                      if (videoQueue.length > 0) {
                        const nextVideo = videoQueue.shift();
                        resetVideoSource(nextVideo);

                        // Hide input box while an answer video is playing
                        userInput.disabled = true;
                        sendVoice.disabled = true;
                        sendMessage.disabled = true;

                        userInput.style.cursor = "not-allowed";
                        sendVoice.style.cursor = "not-allowed";
                        sendMessage.style.cursor = "not-allowed";
                        if (videoPlayCount === getInformationFromUser && askMailId && fb_partner_id === "ee305956fc") {
                          console.log("videoPlayCount", videoPlayCount);
                          userInput.style.filter = "blur(4px)";
                          userInput.disabled = true;
                          sendVoice.style.display = "none";
                          // sendMessage.style.display = "none";
                          videoPlayerElement.style.display =
                            "none !important";
                          document.getElementById("videoPlayer").remove();

                          form.style.display = "initial";
                          sendVoice.style.display = "none";
                        } else {
                          userInput.placeholder = "Ask anything...";
                          sendVoice.style.display = "block";
                          userInput.style.filter = "none";
                          sendVoice.style.display = "initial";
                          sendMessage.style.display = "initial";
                          userInput.disabled = false;
                        }

                        // Play the video and set event listener for when it ends
                        videoPlayer
                          .play()
                          .then(() => {
                            videoPlayer.one("ended", playNextVideo);
                          })
                          .catch(() =>
                            console.log("Video playback failed.")
                          );
                        // Show input box when default video starts playing
                        hideInputBox = false;
                      } else {
                        // When queue is empty, return to default video
                        defaultEndedHandler();
                        videoPlayer.one("ended", defaultEndedHandler);
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
            micTooltip.textContent = "Stop and Send";
            userInput.placeholder = "Listening...";
          } catch (error) {
            console.error("Error accessing microphone:", error);
            // Default video when done
            resetVideoSource(defaultVideoURL);
            userInput.disabled = false;
            sendVoice.disabled = false;
            sendMessage.disabled = false;
            micTooltip.textContent = "Click to Start Recording";

            userInput.style.cursor = "pointer";
            sendVoice.style.cursor = "pointer";
            sendMessage.style.cursor = "pointer";
          }
        } else {
          mediaRecorder.stop();
          sendVoice.innerHTML = `   <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" id="microphone" fill="#B2BEB5">
              <path d="M17 5h-2c0-.3 0-.5-.1-.7C14.6 2.9 13.4 2 12 2s-2.6.9-2.9 2.2c-.1.3-.1.5-.1.8H7c0-.5.1-.9.2-1.3C7.7 1.5 9.7 0 12 0s4.3 1.5 4.8 3.8c.1.3.2.7.2 1.2zm-5 11c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z"></path>
              <path d="M9 5H7c0-.5.1-.9.2-1.3l1.9.5c-.1.3-.1.5-.1.8zm3 15c-5 0-9-4-9-9 0-.6.4-1 1-1s1 .4 1 1c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.6.4-1 1-1s1 .4 1 1c0 5-4 9-9 9zm4 4H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
              <path d="M12 24c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 12c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1z"></path>
            </svg>`;
          isRecording = false;
          userInput.placeholder = "Ask anything...";
          micTooltip.textContent = "Click to Start Recording";
        }
      });

      let videoPlayCount = 0;
      let askMailId = true;

      sendMessage.addEventListener("click", async () => {
        const message = userInput.value.trim();
        const phone_number = phoneNumber.value.trim();
        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const userId = getCookie("fb_user_id");
        const sessionId = sessionStorage.getItem('fb_session_id');

        if (!message && videoPlayCount !== getInformationFromUser) return;

        userInput.value = "";
        // Hide input fields when sending message
        userInput.disabled = true;
        sendVoice.disabled = true;
        sendMessage.disabled = true;

        userInput.style.cursor = "not-allowed";
        sendVoice.style.cursor = "not-allowed";
        sendMessage.style.cursor = "not-allowed";

        try {
          const response = await fetch(
            "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                ...(videoPlayCount === getInformationFromUser
                  ? {
                    phone_number: phone_number,
                    name: name,
                    email_id: email,
                  }
                  : { question: message }),
                action:
                  videoPlayCount === getInformationFromUser ? "contact_message" : "get_answer",
                partner_id: fb_partner_id,
                user_id: userId,
                session_id: sessionId
              }),
            }
          );


          const data = await response.json();



          if (videoPlayCount === getInformationFromUser && (response?.status === 200 || response?.status === 502)) {
            videoPlayCount++;
            askMailId = false;
            // Show the extraMessage element
            extraMessage.style.visibility = "visible";

            // Hide the extraMessage element after 1 second
            setTimeout(() => {
              extraMessage.style.visibility = "hidden";
            }, 1500); // 1500 milliseconds = 1.5 second
            form.style.display = "none";
            videoPlayerElement.style.setProperty(
              "display",
              "block",
              "important"
            );
            sendMessage.style.setProperty("top", "50%", "important");
            userInput.disabled = false;
            userInput.style.display = "block";
            userInput.placeholder = "Ask anything...";
            sendVoice.style.display = "block";
            sendMessage.style.display = "block";
          }

          if (videoPlayCount === getInformationFromUser && askMailId && fb_partner_id === "ee305956fc") {
            videoQueue = [askContactVideoUrl];
            console.log("videoPlayCount", videoPlayCount);
          }

          if (data.data?.answer_video_url?.length) {
            videoPlayCount++;

            // Remove previous ended listeners
            videoPlayer.off("ended");

            const videoQueue = [...data.data.answer_video_url];
            const playNextVideo = () => {
              if (videoQueue.length > 0) {
                const nextVideoURL = videoQueue.shift();
                resetVideoSource(nextVideoURL);
                videoPlayer.one('loadedmetadata', function () {
                  console.log('Metadata loaded, preloading segments...');

                  let bufferedCheck = setInterval(function () {
                    if (videoPlayer.buffered().length > 0) {
                      let bufferEnd = videoPlayer.buffered().end(0);
                      let duration = videoPlayer.duration();

                      console.log('Buffer end:', bufferEnd);
                      if (bufferEnd >= duration - 1) {
                        console.log('Fully buffered, starting playback...');
                        clearInterval(bufferedCheck);
                        videoPlayer.play();
                      }
                    }
                  }, 500);
                });
                if (videoPlayCount === getInformationFromUser && askMailId && fb_partner_id === "ee305956fc") {
                  // userInput.style.filter = "blur(4px)";
                  userInput.disabled = true;
                  sendVoice.style.display = "none";
                  //  sendMessage.style.display = "none";
                  videoPlayerElement.style.display = "none !important";
                  // document.getElementById("videoPlayer").remove();

                  form.style.display = "initial";
                } else {
                  userInput.placeholder = "Ask anything...";
                  sendVoice.style.display = "block";
                  sendMessage.style.display = "block";
                  videoPlayerElement.style.display = "block !important";
                  userInput.style.filter = "none";
                  userInput.disabled = false;
                  sendVoice.disabled = false;
                  sendMessage.disabled = false;
                }
                videoPlayer
                  .play()
                  .catch(() => console.log("Video playback failed."));
              } else if (videoPlayCount === getInformationFromUser - 1 && askMailId && fb_partner_id === "ee305956fc") {
                resetVideoSource(askContactVideoUrl);
                userInput.style.filter = "blur(4px)";
                userInput.placeholder = "";
                userInput.disabled = true;
                sendVoice.style.display = "none";
                sendMessage.style.backgroundColor = "unset";

                sendVoice.style.display = "none";
                videoPlayer
                  .play()
                  .catch(() => console.log("Video playback failed."));
                videoPlayCount++;
              } else {
                // Default video when done
                resetVideoSource(defaultVideoURL);

                // Show input fields again when default video starts
                userInput.disabled = false;
                sendVoice.disabled = false;
                sendMessage.disabled = false;

                userInput.style.cursor = "pointer";
                sendVoice.style.cursor = "pointer";
                sendMessage.style.cursor = "pointer";

                if (videoPlayCount === getInformationFromUser && askMailId && fb_partner_id === "ee305956fc") {
                  userInput.style.display = "none";
                  sendVoice.style.display = "none";
                  sendMessage.style.backgroundColor = bgColor;
                  sendMessage.style.setProperty(
                    "top",
                    "-22%",
                    "important"
                  );

                  form.style.display = "initial";
                  videoPlayerElement.style.setProperty(
                    "display",
                    "none",
                    "important"
                  );
                }
                userInput.style.filter = "none";
              }
            };

            // Play the first response video
            playNextVideo();

            // When the current video ends, play the next one
            videoPlayer.on("ended", playNextVideo);
          } else {
            console.log("No video response received.");
            userInput.disabled = false;
            sendVoice.disabled = false;
            sendMessage.disabled = false;

            userInput.style.cursor = "pointer";
            sendVoice.style.cursor = "pointer";
            sendMessage.style.cursor = "pointer";
          }
        } catch (error) {
          console.error("Error fetching video response:", error);
          // Default video when done
          resetVideoSource(defaultVideoURL);

          // Show input fields again when default video starts
          userInput.disabled = false;
          sendVoice.disabled = false;
          sendMessage.disabled = false;

          userInput.style.cursor = "pointer";
          sendVoice.style.cursor = "pointer";
          sendMessage.style.cursor = "pointer";
        }
      });
    };

    setupWidget();

    // Function to set a cookie
    const setCookie = (name, value, daysToExpire) => {
      const date = new Date();
      date.setTime(date.getTime() + daysToExpire * 24 * 60 * 60 * 1000);
      const expires = `expires=${date.toUTCString()}`;
      document.cookie = `${name}=${value};${expires};path=/`;
    };

    // Function to get a cookie by name
    const getCookie = (name) => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) {
          return cookieValue;
        }
      }
      return null;
    };


    // Function to get a UUID User_Id
    function generateUUID() {
      let d = new Date().getTime(); //Timestamp
      let d2 = (performance && performance.now && (performance.now() * 1000)) || 0; //Time in microseconds since page-load or 0 if unsupported
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = Math.random() * 16; //random number between 0 and 15
        if (d > 0) {  // Use the timestamp to add entropy. Makes it slightly more likely to be unique
          r = (d + r) % 16 | 0;
          d = Math.floor(d / 16);
        } else {
          r = (d2 + r) % 16 | 0;
          d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }


  };

  loadExternalResources();
})();
