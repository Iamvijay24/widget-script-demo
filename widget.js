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
        "https://feedio-ai.s3.us-east-1.amazonaws.com/media-2/d1/";
      const defaultVideos = ["default-2/default1024_playlist.m3u8"].map(
        (video) => videoBasePath + video
      );

      const videoConditions = {
        emergency: [
          "emergency/1_playlist.m3u8",
          "emergency/2_playlist.m3u8",
          "emergency/3_playlist.m3u8",
          "emergency/4_playlist.m3u8",
          "emergency/5_playlist.m3u8",
          "emergency/6_playlist.m3u8",
          "emergency/7_playlist.m3u8",
          "emergency/8_playlist.m3u8",
          "emergency/9_playlist.m3u8",
          "emergency/10_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "infectious disease screening followup": [
          "infectious_disease_screening_followup/1_playlist.m3u8",
          "infectious_disease_screening_followup/2_playlist.m3u8",
          "infectious_disease_screening_followup/3_playlist.m3u8",
          "infectious_disease_screening_followup/4_playlist.m3u8",
          "infectious_disease_screening_followup/5_playlist.m3u8",
          "infectious_disease_screening_followup/6_playlist.m3u8",
          "infectious_disease_screening_followup/7_playlist.m3u8",
          "infectious_disease_screening_followup/8_playlist.m3u8",
          "infectious_disease_screening_followup/9_playlist.m3u8",
          "infectious_disease_screening_followup/10_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "additional concern": [
          "mh_additional_concern/1_playlist.m3u8",
          "mh_additional_concern/2_playlist.m3u8",
          "mh_additional_concern/3_playlist.m3u8",
          "mh_additional_concern/4_playlist.m3u8",
          "mh_additional_concern/5_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        allergies: [
          "mh_allergies/1_playlist.m3u8",
          "mh_allergies/2_playlist.m3u8",
          "mh_allergies/3_playlist.m3u8",
          "mh_allergies/4_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        family: ["mh_family/1_playlist.m3u8", "mh_family/2_playlist.m3u8"].map(
          (video) => videoBasePath + video
        ),

        lifestyle: [
          "mh_lifestyle/1_playlist.m3u8",
          "mh_lifestyle/2_playlist.m3u8",
          "mh_lifestyle/3_playlist.m3u8",
          "mh_lifestyle/4_playlist.m3u8",
          "mh_lifestyle/5_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "medication followup": ["mh_medication_followup/1_playlist.m3u8"].map(
          (video) => videoBasePath + video
        ),

        medication: [
          "mh_medication/1_playlist.m3u8",
          "mh_medication/2_playlist.m3u8",
          "mh_medication/3_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "past diagnosis": [
          "mh_past_diagnosis/1_playlist.m3u8",
          "mh_past_diagnosis/2_playlist.m3u8",
          "mh_past_diagnosis/3_playlist.m3u8",
          "mh_past_diagnosis/4_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        psychiatric: [
          "mh_psychiatric/1_playlist.m3u8",
          "mh_psychiatric/2_playlist.m3u8",
          "mh_psychiatric/3_playlist.m3u8",
          "mh_psychiatric/4_playlist.m3u8",
          "mh_psychiatric/5_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "pain assessment intensity": [
          "pain_assessment_intensity/1_playlist.m3u8",
          "pain_assessment_intensity/2_playlist.m3u8",
          "pain_assessment_intensity/3_playlist.m3u8",
          "pain_assessment_intensity/4_playlist.m3u8",
          "pain_assessment_intensity/5_playlist.m3u8",
          "pain_assessment_intensity/6_playlist.m3u8",
          "pain_assessment_intensity/7_playlist.m3u8",
          "pain_assessment_intensity/8_playlist.m3u8",
          "pain_assessment_intensity/9_playlist.m3u8",
          "pain_assessment_intensity/10_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "pain assessment location": [
          "pain_assessment_location/1_playlist.m3u8",
          "pain_assessment_location/2_playlist.m3u8",
          "pain_assessment_location/3_playlist.m3u8",
          "pain_assessment_location/4_playlist.m3u8",
          "pain_assessment_location/5_playlist.m3u8",
          "pain_assessment_location/6_playlist.m3u8",
          "pain_assessment_location/7_playlist.m3u8",
          "pain_assessment_location/8_playlist.m3u8",
          "pain_assessment_location/9_playlist.m3u8",
          "pain_assessment_location/10_playlist.m3u8",
          "pain_assessment_location/11_playlist.m3u8",
          "pain_assessment_location/12_playlist.m3u8",
          "pain_assessment_location/13_playlist.m3u8",
          "pain_assessment_location/14_playlist.m3u8",
          "pain_assessment_location/15_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "pain assessment": [
          "pain_assessment/1_playlist.m3u8",
          "pain_assessment/2_playlist.m3u8",
          "pain_assessment/3_playlist.m3u8",
          "pain_assessment/4_playlist.m3u8",
          "pain_assessment/5_playlist.m3u8",
          "pain_assessment/6_playlist.m3u8",
          "pain_assessment/7_playlist.m3u8",
          "pain_assessment/8_playlist.m3u8",
          "pain_assessment/9_playlist.m3u8",
          "pain_assessment/10_playlist.m3u8",
          "pain_assessment/11_playlist.m3u8",
          "pain_assessment/12_playlist.m3u8",
          "pain_assessment/13_playlist.m3u8",
          "pain_assessment/14_playlist.m3u8",
          "pain_assessment/15_playlist.m3u8",
          "pain_assessment/16_playlist.m3u8",
          "pain_assessment/17_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "reason for visit": [
          "reason_for_visit/1_playlist.m3u8",
          "reason_for_visit/3_playlist.m3u8",
          "reason_for_visit/4_playlist.m3u8",
          "reason_for_visit/5_playlist.m3u8",
          "reason_for_visit/6_playlist.m3u8",
          "reason_for_visit/7_playlist.m3u8",
          "reason_for_visit/8_playlist.m3u8",
          "reason_for_visit/9_playlist.m3u8",
          "reason_for_visit/10_playlist.m3u8",
          "reason_for_visit/11_playlist.m3u8",
          "reason_for_visit/13_playlist.m3u8",
          "reason_for_visit/14_playlist.m3u8",
          "reason_for_visit/15_playlist.m3u8",
        ].map((video) => videoBasePath + video),

        "infectious disease screening": [
          "infectious_disease_screening/1_playlist.m3u8",
          "infectious_disease_screening/2_playlist.m3u8",
          "infectious_disease_screening/3_playlist.m3u8",
          "infectious_disease_screening/4_playlist.m3u8",
          "infectious_disease_screening/5_playlist.m3u8",
          "infectious_disease_screening/6_playlist.m3u8",
          "infectious_disease_screening/7_playlist.m3u8",
          "infectious_disease_screening/8_playlist.m3u8",
          "infectious_disease_screening/9_playlist.m3u8",
          "infectious_disease_screening/10_playlist.m3u8",
          "infectious_disease_screening/11_playlist.m3u8",
        ].map((video) => videoBasePath + video),
      };

      let bg_color = `bg-indigo-600`;
      let title = "FaceBot Assistant";

      const createWidget = () => {
        const chatButton = document.createElement("div");
        chatButton.className =
          "fixed bottom-8 right-8 z-50 w-14 h-14 rounded-full shadow-lg cursor-pointer flex items-center justify-center animate-bounce";
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
            // Show the chat container and start the video
            chatContainer.style.display = "block";
          } else {
            // Hide the chat container and stop the video
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
              src: defaultVideos[0],
              type: "application/x-mpegURL",
            },
          ],
          techOrder: ["html5", "flash"],
        });

        const handlePlayButtonClick = () => {
          const searchTerm = document
            .getElementById("userInput")
            .value.trim()
            .toLowerCase();
          if (videoConditions[searchTerm]) {
            const videoUrl =
              videoConditions[searchTerm][
                Math.floor(Math.random() * videoConditions[searchTerm].length)
              ];

            videoPlayer.src({ type: "application/x-mpegURL", src: videoUrl });

            videoPlayer.ready(() => {
              videoPlayer.play().catch((error) => {
                console.error("Error playing the selected video:", error);
              });
            });
          } else {
            alert("Please enter a valid search term.");
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
