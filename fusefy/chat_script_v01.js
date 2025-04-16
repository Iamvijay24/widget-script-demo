// version 1.2
let widgetInitialized = false; // Flag to track initialization
let widgetIconHide = true;
let currentToken;
let currentAssessmentId;
let chatButton;
let toggleChatFn;

const fbInitializeResources = (token, assessmentId) => {

  // Call initializeChatWidget only after resources are loaded
  if (!widgetInitialized) {
    widgetInitialized = true;
    currentToken = token;
    currentAssessmentId = assessmentId;
    initializeChatWidget();

    if (widgetIconHide && chatButton) { // Check if chatButton exists
      chatButton.style.display = "flex";
    }
    if (toggleChatFn) {
      toggleChatFn();
    }

  }
  else {
    if (widgetIconHide && chatButton) { // Check if chatButton exists
      chatButton.style.display = "flex";
    }
    if (toggleChatFn) {
      toggleChatFn();
    }
  }
};

// Function to update the token
const fbPartnerTokenUpdate = (newToken) => {
  currentToken = newToken;
};


const initializeChatWidget = () => {
  const setupWidget = () => {
    console.log("%c🤖 widget initialized!", "color: #4CAF50; font-size: 18px; font-weight: bold; font-family: 'Arial', sans-serif; background-color: #333; padding: 5px 10px; border-radius: 5px;");


    let bgColor = "#034b83";
    let title = "AI assistant 24/7";

    chatButton = document.createElement("div"); // Assign chatButton here
    chatButton.setAttribute("aria-label", "Open chat");
    chatButton.setAttribute("id", "fb_widget_icon");

    Object.assign(chatButton.style, {
      position: "fixed",
      bottom: "2px",
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
      <svg width="50" height="50" viewBox="0 0 29 36" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        #fb_loader {
          width: 20px;
          height: 20px;
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-top: 4px solid #034b83;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
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

        /* Chat message styles */
        #chatMessages {
            display: flex;
            flex-direction: column;
            overflow-y: auto; /* For scrolling if messages exceed height */
            padding: 10px;
        }


        .chat-message {
            display: flex;
            align-items: flex-start; /* Align items vertically */
            margin-bottom: 10px;
            width: fit-content; /* Important: Adjust width based on content */
            max-width: 90%;    /* Limit the width to prevent overwhelming the display */
            word-break: break-word; /* Handle long words */
            font-family: 'Roboto', sans-serif;

        }

        .chat-message.ai {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .chat-message.ai .message-container {
          // display: flex;
          align-items: center;
        }

        .chat-message.user { /* Class for user messages */
            align-self: flex-end; /* Push to the right */
            flex-direction: row-reverse; /* Avatar on the right for user */
        }


        .chat-message.ai { /* Class for AI messages */
            align-self: flex-start; /* Push to the left (default, but explicit for clarity)*/
            flex-direction: row;   /* Avatar on the left for AI (default, but explicit) */
        }



        .avatar {
            width: 30px;  /* Adjust as needed */
            height: 50px; /* Adjust as needed */
            border-radius: 50%; /* Make it circular */
            margin-right: 10px; /* Spacing between avatar and message */
            margin-left: 10px; /* Spacing between avatar and message */
        }

        .chat-message.user .avatar {
          margin-left: 10px;
          margin-right: 0;
        }

        .message-content {
            padding: 8px;
            border-radius: 8px;
            background-color: #f1f1f1;
            color: #000000;
            font-size: 14px;
            /* Add specific styling for user/AI messages here if needed */
        }

        .chat-message.user .message-content {
          background-color: #034b83;
          color: #ffffff;
        }
          .skip-button {
  color: #034b83;
  border: none;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 5px; /* Add spacing between message and button */
}

.skip-button:hover {
  color:rgb(2, 56, 97); /* Darker red on hover */
}


      `;
    document.head.appendChild(style);

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
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    });

    chatContainer.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 16px; background-color: ${bgColor}; color: #ffffff; border-top-left-radius: 8px; border-top-right-radius: 8px;">
          <h5 style="margin: 0; font-size: 16px; font-family: 'Roboto', sans-serif; font-weight: 100; color: #ffffff;">${title}</h5>
          <button id="fb_closeChat" aria-label="Close chat" style="background: none; border: none; color: #ffffff; font-size: 16px; cursor: pointer;">X</button>
        </div>
        <div style="padding: 16px; height: 384px; overflow-y: auto;" id="chatMessages">
          <!-- Chat messages will be appended here -->
        </div>
        <div style="position: relative; width: 100%; padding: 12px 5px;" id="messageContainer">
          <input id="fb_userInput" type="text" placeholder="Ask anything..." style="width: 14.5rem; font-size: 14px; padding: 12px; border-radius: 8px; border: 1px solid #D1D5DB; box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05); outline: none; padding-right: 80px; font-family: 'Roboto', sans-serif;" />
          <!-- Mic button for voice record -->
         <!-- <div class="fb_tooltip">
            <button id="fb_sendVoice" type="text" style="position: absolute; background: none; font-size: 14px; top: 50%; right: 75px; transform: translateY(-50%); color:rgb(103, 63, 63); padding: 8px 16px; border-radius: 8px; border: none; transition: background-color 0.3s; cursor: pointer;">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" id="microphone" fill="#B2BEB5">
                <path d="M17 5h-2c0-.3 0-.5-.1-.7C14.6 2.9 13.4 2 12 2s-2.6.9-2.9 2.2c-.1.3-.1.5-.1.8H7c0-.5.1-.9.2-1.3C7.7 1.5 9.7 0 12 0s4.3 1.5 4.8 3.8c.1.3.2.7.2 1.2zm-5 11c-2.8 0-5-2.2-5-5h2c0 1.7 1.3 3 3 3s3-1.3 3-3h2c0 2.8-2.2 5-5 5z"></path>
                <path d="M9 5H7c0-.5.1-.9.2-1.3l1.9.5c-.1.3-.1.5-.1.8zm3 15c-5 0-9-4-9-9 0-.6.4-1 1-1s1 .4 1 1c0 3.9 3.1 7 7 7s7-3.1 7-7c0-.6.4-1 1-1s1 .4 1 1c0 5-4 9-9 9zm4 4H8c-.6 0-1-.4-1-1s.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1z"></path>
                <path d="M12 24c-.6 0-1-.4-1-1v-4c0-.6.4-1 1-1s1 .4 1 1v4c0 .6-.4 1-1 1zM8 12c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1zm8 0c-.6 0-1-.4-1-1V5c0-.6.4-1 1-1s1 .4 1 1v6c0 .6-.4 1-1 1z"></path>
              </svg>
            </button>
            <span class="fb_tooltip_text" id="fb_micTooltip">Click to Start Recording</span>
          </div> -->
          <!-- Send message button -->
          <button id="fb_sendMessage" style="position: absolute; font-size: 14px; top: 50%; right: 1rem; transform: translateY(-50%); background-color: #034b83; color: #ffffff; padding: 8px 16px; border-radius: 8px; border: none; cursor: pointer; transition: background-color 0.3s; font-family: 'Roboto', sans-serif;">
          Send
          </button>
          <a style="margin: 0; font-size: 5px; position: absolute; bottom: 3px; right: 1.2rem; text-decoration: none; font-family: 'Roboto', sans-serif;" href="https://face-bot.ai/" target="_blank" id="fb_logo">
            <span style="color: black;">Powered by</span>
            <span style="color: #034b83;">Face-Bot.ai</span>
          </a>
        </div>`;

    document.body.appendChild(chatContainer);
    document.body.appendChild(chatButton);

    if (widgetIconHide) {
      chatButton.style.display = "none";
    }

    let isSurveyInitialized = false; // Flag to track if survey is initialized
    let survey_session_id = null;


    toggleChatFn = async () => { // Assign the function to toggleChatFn
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

        // Initialize survey only if it hasn't been initialized yet
        if (!isSurveyInitialized) {
          await initializeSurvey();
          isSurveyInitialized = true; // Set flag to true after initialization
        }
      } else {
        chatContainer.style.opacity = "0";
        chatContainer.style.transform = "translateY(20px)";
        setTimeout(() => {
          chatContainer.style.display = "none";
        }, 300);
      }
    };

    chatButton.addEventListener("click", toggleChatFn);
    document
      .getElementById("fb_closeChat")
      .addEventListener("click", () => {
        if (widgetIconHide) {
          chatButton.style.display = "none";
        }
        toggleChatFn();
      });

    const userInput = document.getElementById("fb_userInput");
    const sendMessage = document.getElementById("fb_sendMessage");
    const sendVoice = document.getElementById("fb_sendVoice");
    const micTooltip = document.getElementById("fb_micTooltip");
    const chatMessages = document.getElementById("chatMessages");
    const messageContainer = document.getElementById("messageContainer");

    if (sendVoice) {
      sendVoice.disabled = true;
      sendVoice.style.cursor = "not-allowed";
    }

    const appendMessage = (message, isUser, isLoading = false, response_type = null) => {
      const messageElement = document.createElement("div");
      messageElement.classList.add("chat-message");
      messageElement.classList.add(isUser ? "user" : "ai");

      const avatarElement = document.createElement("img");
      avatarElement.src = isUser ? "https://d1jcbfcd9v1do3.cloudfront.net/script/user_icon.svg" : "https://d1jcbfcd9v1do3.cloudfront.net/script/facebot_icon.svg";
      avatarElement.alt = isUser ? "User Avatar" : "AI Avatar";
      avatarElement.classList.add("avatar");

      const messageContentElement = document.createElement("div");
      messageContentElement.classList.add("message-content");

      if (isLoading) {
        // Add loading animation inside the message
        messageContentElement.innerHTML = '<div id="fb_loader"></div>';
      } else {
        messageContentElement.textContent = message;
      }
      // Apply specific style if the answer_type is "end"
      if (response_type === "end") {
        messageContentElement.style.backgroundColor = "#4CAF50"; // Green color for end message
        messageContentElement.style.color = "#ffffff"; // White text color
        messageContainer.style.display = "none";
      }

      //If response type is error recall the intialsurvey
      if (response_type === "error") {
        initializeSurvey();
        return; // Stop appending the message
      }

      messageElement.appendChild(avatarElement);
      messageElement.appendChild(messageContentElement);

      // Remove existing skip buttons (if any)
      const existingSkipButtons = chatMessages.querySelectorAll(".skip-button");
      existingSkipButtons.forEach(button => button.remove());

      // Add Skip Button (conditionally)
      if (!isUser && !isLoading && response_type !== "end") {
        const skipButton = document.createElement("button");
        skipButton.textContent = "Skip";
        skipButton.classList.add("skip-button");
        skipButton.style.color = "#034b83";
        skipButton.style.cursor = "pointer";

        skipButton.addEventListener("click", handleSkipClick);

        // Create a container for the message and the skip button
        const messageContainer = document.createElement("div");
        messageContainer.classList.add("message-container");

        // Append message content and skip button to the message container
        messageContainer.appendChild(messageContentElement);
        messageContainer.appendChild(skipButton);

        // Clear the messageElement content and append the message container
        messageElement.innerHTML = '';  // Clear existing content (avatar)
        messageElement.appendChild(avatarElement); // Re-add the avatar
        messageElement.appendChild(messageContainer);
      }

      chatMessages.appendChild(messageElement);
      chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    userInput.addEventListener("keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        sendMessage.click();
      }
    });

    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    sendVoice?.addEventListener("click", async () => {
      if (!isRecording) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });
          mediaRecorder = new MediaRecorder(stream);
          audioChunks = [];

          mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
          };

          mediaRecorder.onstop = async () => {
            const audioBlob = new Blob(audioChunks, {
              type: "audio/wav",
            });
            const reader = new FileReader();

            reader.onloadend = async () => {
              const base64Audio = reader.result.split(",")[1]; // Extract base64 string

              try {
                const response = await fetch(
                  "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      audioMessage: base64Audio,
                      action: "get_answer_for_voice",
                      partner_id: "ee305956fc",
                      "partner-token": currentToken
                    }),
                  }
                );

                const data = await response.json();
                if (data.data?.answer_video_url?.length) {
                  userInput.value = "";
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
          micTooltip.textContent = "Stop and Send";
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
        userInput.placeholder = "Ask anything...";
        micTooltip.textContent = "Click to Start Recording";
      }
    });

    sendMessage.addEventListener("click", async () => {
      const message = userInput.value.trim();
      if (!message) return;

      appendMessage(message, true);
      userInput.value = "";

      // Show loading animation using the AI's appendMessage function
      appendMessage("", false, true); // Simulate AI message with loading animation

      try {
        const response = await fetch(
          "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "action": "get_next_question",
              "survey_id": currentAssessmentId,
              "message": message,
              "survey_session": survey_session_id,
              "partner_token": currentToken
            }),
          }
        );

        const data = await response.json();

        survey_session_id = data.data?.survey_session;

        if (data) {
          const aiMessages = document
            .querySelectorAll(".chat-message.ai");
          if (aiMessages.length > 0) {
            aiMessages[aiMessages.length - 1].remove(); // Remove the last AI message
          }


          // data?.data?.response_type = "error"
          if (data.data?.response_type === "error") {
            alert(data?.data?.response)
            clearChatMessages(); // Clear all previous messages
            appendMessage("An error occurred. Restarting assessment...", false, false, data?.data?.response_type); // Append an error message
            return;
          }
        }

         data.data.response?.forEach((item) => {
            appendMessage(item, false, false, data.data.response_type);
          });

      } catch (error) {
        console.error("Error fetching AI response:", error);

        // Remove loading animation in case of error: also remove the *last* AI message.
        const aiMessages = document
          .querySelectorAll(".chat-message.ai");
        if (aiMessages.length > 0) {
          aiMessages[aiMessages.length - 1].remove(); // Remove the last AI message
        }

        appendMessage("Sorry, something went wrong. Please try again.", false);
      }
    });

    // Function to handle skip click
    const handleSkipClick = async () => {
      //      // Append "Skipped" as a user message (you can customize this)
      appendMessage("Skipped", true);

      // Show loading animation
      appendMessage("", false, true);

      try {
        const response = await fetch(
          "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "action": "skip_question",
              "survey_session": survey_session_id,
            }),
          }
        );

        const data = await response.json();

        if (data) {
          survey_session_id = data.data?.survey_session;

          // Remove loading animation
          const aiMessages = document
            .querySelectorAll(".chat-message.ai");
          if (aiMessages.length > 0) {
            aiMessages[aiMessages.length - 1].remove();
          }

          data.data.response?.forEach((item) => {
            appendMessage(item, false, false, data.data.response_type);
          });
        }
      } catch (error) {
        console.error("Error fetching AI response (skip):", error);

        // Remove loading animation in case of error
        const aiMessages = document
          .querySelectorAll(".chat-message.ai");
        if (aiMessages.length > 0) {
          aiMessages[aiMessages.length - 1].remove();
        }

        appendMessage("Sorry, something went wrong skipping. Please try again.", false);
      }
    };

    // Function to initialize survey
    const initializeSurvey = async () => {
      // Show loading animation using the AI's appendMessage function
      appendMessage("", false, true); // Simulate AI message with loading animation

      try {
        const response = await fetch(
          "https://9yrts99ryd.execute-api.us-east-1.amazonaws.com/dev",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              "action": "initialize_survey",
              "survey_id": currentAssessmentId,
              "partner_token": currentToken
            }),
          }
        );

        const data = await response.json();

        survey_session_id = data.data?.survey_session;

        //If response type is error recall the intialsurvey
        if (data.data?.answer_type === "error") {
          clearChatMessages(); // Clear all previous messages
          appendMessage("An error occurred. Restarting assessment...", false, false, "error"); // Append an error message
          return;
        }

        const aiMessages = document
          .querySelectorAll(".chat-message.ai");
        if (aiMessages.length > 0) {
          aiMessages[aiMessages.length - 1].remove(); // Remove the last AI message
        }

        appendMessage(data.data?.response, false, false, data.data?.answer_type);
      } catch (error) {
        console.error("Error initializing survey:", error);

        const aiMessages = document
          .querySelectorAll(".chat-message.ai");
        if (aiMessages.length > 0) {
          aiMessages[aiMessages.length - 1].remove(); // Remove the last AI message
        }

        // Show error message in chat
        appendMessage("Failed to initialize survey. Please try again.", false);
      }
    };

    // Function to clear all chat messages
    const clearChatMessages = () => {
      const chatMessagesElement = document.getElementById("chatMessages");
      while (chatMessagesElement.firstChild) {
        chatMessagesElement.removeChild(chatMessagesElement.firstChild);
      }
    };
  };

  setupWidget();
};
