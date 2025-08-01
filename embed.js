(function () {
  "use strict";

  // Prevent multiple initializations
  if (window.ChatbotWidgetEmbedded) {
    return;
  }
  window.ChatbotWidgetEmbedded = true;

  // Configuration
  const config = {
    webhookUrl:
      "https://maheliacruz.app.n8n.cloud/webhook/45f37933-155d-49a7-ab0a-c55c936942fa",
    title: "Chat Assistant",
    position: "bottom-right", // bottom-right, bottom-left, top-right, top-left
    theme: {
      primaryColor: "#2563eb",
      secondaryColor: "#1e40af",
      textColor: "#1f2937",
      backgroundColor: "#ffffff",
    },
  };

  // Merge user config if provided
  if (window.ChatbotConfig) {
    Object.assign(config, window.ChatbotConfig);
  }

  // CSS Styles
  const styles = `
        .chatbot-embed-widget {
            position: fixed;
            width: 380px;
            height: 600px;
            background: #ffffff;
            border: 1px solid #e5e7eb;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
            display: none;
            flex-direction: column;
            z-index: 999999;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Inter', sans-serif;
            transition: all 0.2s ease-out;
            transform: translateY(10px) scale(0.98);
            opacity: 0;
            ${getPositionStyles(config.position)}
        }

        .chatbot-embed-widget.open {
            display: flex;
            transform: translateY(0) scale(1);
            opacity: 1;
        }

        .chatbot-embed-toggle {
            position: fixed;
            width: 56px;
            height: 56px;
            background: ${config.theme.primaryColor};
            border-radius: 50%;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000000;
            transition: all 0.2s ease;
            ${getPositionStyles(config.position, true)}
        }

        .chatbot-embed-toggle:hover {
            transform: scale(1.05);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.2);
        }

        .chatbot-embed-toggle:active {
            transform: scale(0.95);
        }

        .chatbot-embed-toggle svg {
            width: 28px;
            height: 28px;
            fill: white;
            transition: transform 0.3s ease;
        }

        .chatbot-embed-toggle:hover svg {
            transform: scale(1.1);
        }

        .chatbot-embed-header {
            background: ${config.theme.primaryColor};
            color: white;
            padding: 20px 24px;
            border-radius: 16px 16px 0 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .chatbot-embed-title {
            font-weight: 600;
            font-size: 16px;
            letter-spacing: -0.01em;
        }

        .chatbot-embed-close {
            background: rgba(255, 255, 255, 0.15);
            border: none;
            color: white;
            cursor: pointer;
            font-size: 16px;
            padding: 0;
            width: 28px;
            height: 28px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 6px;
            transition: all 0.2s ease;
        }

        .chatbot-embed-close:hover {
            background: rgba(255, 255, 255, 0.25);
        }

        .chatbot-embed-close:active {
            transform: scale(0.95);
        }

        .chatbot-embed-messages {
            flex: 1;
            padding: 20px;
            overflow-y: auto;
            background: #f9fafb;
        }

        .chatbot-embed-messages::-webkit-scrollbar {
            width: 3px;
        }

        .chatbot-embed-messages::-webkit-scrollbar-track {
            background: transparent;
        }

        .chatbot-embed-messages::-webkit-scrollbar-thumb {
            background: rgba(0, 0, 0, 0.1);
            border-radius: 2px;
        }

        .chatbot-embed-messages::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 0, 0, 0.15);
        }

        .chatbot-embed-message {
            margin-bottom: 12px;
            display: flex;
            align-items: flex-start;
            animation: messageSlideIn 0.2s ease-out;
        }

        @keyframes messageSlideIn {
            from {
                opacity: 0;
                transform: translateY(8px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .chatbot-embed-message.user {
            justify-content: flex-end;
        }

        .chatbot-embed-message-content {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 12px;
            font-size: 14px;
            line-height: 1.5;
            font-weight: 400;
            word-wrap: break-word;
        }

        .chatbot-embed-message-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 8px 0;
            display: block;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .chatbot-embed-message-content a {
            color: ${config.theme.primaryColor};
            text-decoration: none;
            font-weight: 500;
        }

        .chatbot-embed-message-content a:hover {
            text-decoration: underline;
        }

        .chatbot-embed-message-content strong {
            font-weight: 600;
            color: inherit;
        }

        .chatbot-embed-message-content .product-item {
            margin: 16px 0;
            padding: 12px 0;
            border-bottom: 1px solid rgba(0, 0, 0, 0.05);
        }

        .chatbot-embed-message-content .product-item:last-child {
            border-bottom: none;
        }

        .chatbot-embed-message.user .chatbot-embed-message-content {
            background: ${config.theme.primaryColor};
            color: white;
            border-radius: 12px 12px 2px 12px;
            margin-left: auto;
        }

        .chatbot-embed-message.bot .chatbot-embed-message-content {
            background: white;
            color: #374151;
            border: 1px solid #e5e7eb;
            border-radius: 12px 12px 12px 2px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }

        .chatbot-embed-input {
            padding: 16px 20px 20px;
            border-top: 1px solid #e5e7eb;
            background: white;
            border-radius: 0 0 16px 16px;
        }

        .chatbot-embed-input-container {
            display: flex;
            align-items: center;
            gap: 8px;
            background: #f9fafb;
            border-radius: 12px;
            padding: 10px 16px;
            border: 1px solid #e5e7eb;
            transition: all 0.2s ease;
        }

        .chatbot-embed-input-container:focus-within {
            border-color: ${config.theme.primaryColor};
            background: white;
            box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
        }

        .chatbot-embed-message-input {
            flex: 1;
            border: none;
            outline: none;
            background: transparent;
            font-size: 14px;
            padding: 6px 0;
            color: #374151;
            font-weight: 400;
        }

        .chatbot-embed-message-input::placeholder {
            color: #9ca3af;
        }

        .chatbot-embed-voice-button, .chatbot-embed-send-button {
            background: #f3f4f6;
            border: none;
            cursor: pointer;
            padding: 8px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        }

        .chatbot-embed-voice-button:hover, .chatbot-embed-send-button:hover {
            background: #e5e7eb;
        }

        .chatbot-embed-voice-button:active, .chatbot-embed-send-button:active {
            transform: scale(0.95);
        }

        .chatbot-embed-voice-button.recording {
            background: #ef4444;
            animation: pulse 2s infinite;
        }

        @keyframes pulse {
            0%, 100% {
                box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3);
            }
            50% {
                box-shadow: 0 0 0 6px rgba(239, 68, 68, 0);
            }
        }

        .chatbot-embed-voice-button svg, .chatbot-embed-send-button svg {
            width: 18px;
            height: 18px;
            fill: #6b7280;
            transition: all 0.2s ease;
        }

        .chatbot-embed-voice-button.recording svg {
            fill: white;
        }

        .chatbot-embed-send-button:hover svg {
            fill: ${config.theme.primaryColor};
        }

        .chatbot-embed-typing-indicator {
            display: none;
            align-items: center;
            gap: 6px;
            padding: 12px 16px;
            background: white;
            border-radius: 12px 12px 12px 2px;
            border: 1px solid #e5e7eb;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
            max-width: 80%;
        }

        .chatbot-embed-typing-indicator.show {
            display: flex;
            animation: messageSlideIn 0.2s ease-out;
        }

        .chatbot-embed-typing-dot {
            width: 8px;
            height: 8px;
            background: #6b7280;
            border-radius: 50%;
            animation: chatbot-typing 1.6s infinite ease-in-out;
        }

        .chatbot-embed-typing-dot:nth-child(2) {
            animation-delay: 0.2s;
        }

        .chatbot-embed-typing-dot:nth-child(3) {
            animation-delay: 0.4s;
        }

        @keyframes chatbot-typing {
            0%, 60%, 100% {
                transform: translateY(0) scale(1);
                opacity: 0.4;
            }
            30% {
                transform: translateY(-8px) scale(1.1);
                opacity: 1;
            }
        }

        @media (max-width: 480px) {
            .chatbot-embed-widget {
                width: calc(100vw - 24px);
                height: calc(100vh - 24px);
                bottom: 12px !important;
                right: 12px !important;
                left: 12px !important;
                border-radius: 16px;
            }

            .chatbot-embed-toggle {
                bottom: 20px;
                right: 20px;
                width: 52px;
                height: 52px;
            }

            .chatbot-embed-toggle svg {
                width: 22px;
                height: 22px;
            }

            .chatbot-embed-header {
                padding: 16px 20px;
                border-radius: 16px 16px 0 0;
            }

            .chatbot-embed-title {
                font-size: 15px;
            }

            .chatbot-embed-messages {
                padding: 16px;
            }

            .chatbot-embed-input {
                padding: 12px 16px 16px;
                border-radius: 0 0 16px 16px;
            }

            .chatbot-embed-input-container {
                padding: 8px 12px;
            }

            .chatbot-embed-message-content {
                font-size: 13px;
                padding: 10px 14px;
            }
        }
    `;

  function getPositionStyles(position, isToggle = false) {
    const offset = isToggle ? "24px" : "24px";

    switch (position) {
      case "bottom-left":
        return `bottom: ${offset}; left: ${offset};`;
      case "top-right":
        return `top: ${offset}; right: ${offset};`;
      case "top-left":
        return `top: ${offset}; left: ${offset};`;
      case "bottom-right":
      default:
        return `bottom: ${offset}; right: ${offset};`;
    }
  }

  // Inject styles
  const styleSheet = document.createElement("style");
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);

  // Create widget HTML
  const widgetHTML = `
        <button class="chatbot-embed-toggle" id="chatbotEmbedToggle">
            <svg viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
            </svg>
        </button>

        <div class="chatbot-embed-widget" id="chatbotEmbedWidget">
            <div class="chatbot-embed-header">
                <div class="chatbot-embed-title">${config.title}</div>
                <button class="chatbot-embed-close" id="chatbotEmbedClose">&times;</button>
            </div>

            <div class="chatbot-embed-messages" id="chatbotEmbedMessages">
                <div class="chatbot-embed-message bot">
                    <div class="chatbot-embed-message-content">
                        Hello! I'm here to help you. You can type your message or use the microphone to speak.
                    </div>
                </div>
            </div>

            <div class="chatbot-embed-input">
                <div class="chatbot-embed-input-container">
                    <input type="text" class="chatbot-embed-message-input" id="chatbotEmbedMessageInput" placeholder="Type your message...">
                    <button class="chatbot-embed-voice-button" id="chatbotEmbedVoiceButton">
                        <svg viewBox="0 0 24 24">
                            <path d="M12 14c1.66 0 2.99-1.34 2.99-3L15 5c0-1.66-1.34-3-3-3S9 3.34 9 5v6c0 1.66 1.34 3 3 3zm5.3-3c0 3-2.54 5.1-5.3 5.1S6.7 14 6.7 11H5c0 3.41 2.72 6.23 6 6.72V21h2v-3.28c3.28-.48 6-3.3 6-6.72h-1.7z"/>
                        </svg>
                    </button>
                    <button class="chatbot-embed-send-button" id="chatbotEmbedSendButton">
                        <svg viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    `;

  // Insert widget into page
  document.body.insertAdjacentHTML("beforeend", widgetHTML);

  // Initialize widget functionality
  class EmbeddedChatbotWidget {
    constructor() {
      this.webhookUrl = config.webhookUrl;
      this.isOpen = false;
      this.isRecording = false;
      this.recognition = null;
      this.synthesis = window.speechSynthesis;
      this.userId = this.generateOrGetUserId();
      this.chatHistory = this.loadChatHistory();

      this.initializeElements();
      this.initializeEventListeners();
      this.initializeSpeechRecognition();
      this.loadPreviousMessages();
    }

    initializeElements() {
      this.toggleButton = document.getElementById("chatbotEmbedToggle");
      this.widget = document.getElementById("chatbotEmbedWidget");
      this.closeButton = document.getElementById("chatbotEmbedClose");
      this.messagesContainer = document.getElementById("chatbotEmbedMessages");
      this.messageInput = document.getElementById("chatbotEmbedMessageInput");
      this.voiceButton = document.getElementById("chatbotEmbedVoiceButton");
      this.sendButton = document.getElementById("chatbotEmbedSendButton");
    }

    initializeEventListeners() {
      this.toggleButton.addEventListener("click", () => this.toggleWidget());
      this.closeButton.addEventListener("click", () => this.closeWidget());
      this.sendButton.addEventListener("click", () => this.sendMessage());
      this.voiceButton.addEventListener("click", () =>
        this.toggleVoiceRecording()
      );

      this.messageInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
          this.sendMessage();
        }
      });

      document.addEventListener("click", (e) => {
        if (
          this.isOpen &&
          !this.widget.contains(e.target) &&
          !this.toggleButton.contains(e.target)
        ) {
          this.closeWidget();
        }
      });
    }

    generateOrGetUserId() {
      let userId = localStorage.getItem("chatbot_user_id");
      if (!userId) {
        userId =
          "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
        localStorage.setItem("chatbot_user_id", userId);
      }
      return userId;
    }

    loadChatHistory() {
      const history = localStorage.getItem("chatbot_chat_history");
      return history ? JSON.parse(history) : [];
    }

    saveChatHistory() {
      localStorage.setItem(
        "chatbot_chat_history",
        JSON.stringify(this.chatHistory)
      );
    }

    loadPreviousMessages() {
      // Clear the default welcome message first
      this.messagesContainer.innerHTML = "";

      if (this.chatHistory.length === 0) {
        // Add welcome message if no history
        this.addMessage(
          "Hello! I'm here to help you. You can type your message or use the microphone to speak.",
          "bot",
          false // Don't save to history
        );
      } else {
        // Load previous messages
        this.chatHistory.forEach((msg) => {
          this.addMessage(msg.content, msg.sender, false); // Don't save to history again
        });
      }
    }

    initializeSpeechRecognition() {
      if (
        "webkitSpeechRecognition" in window ||
        "SpeechRecognition" in window
      ) {
        const SpeechRecognition =
          window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = "en-US";

        this.recognition.onstart = () => {
          this.isRecording = true;
          this.voiceButton.classList.add("recording");
        };

        this.recognition.onend = () => {
          this.isRecording = false;
          this.voiceButton.classList.remove("recording");
        };

        this.recognition.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          this.messageInput.value = transcript;
          this.sendMessage();
        };

        this.recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error);
          this.isRecording = false;
          this.voiceButton.classList.remove("recording");
          this.addMessage(
            "Sorry, I couldn't understand your voice. Please try again.",
            "bot"
          );
        };
      } else {
        this.voiceButton.style.display = "none";
      }
    }

    toggleWidget() {
      if (this.isOpen) {
        this.closeWidget();
      } else {
        this.openWidget();
      }
    }

    openWidget() {
      this.isOpen = true;
      this.widget.classList.add("open");
      this.toggleButton.style.display = "none";
      this.messageInput.focus();
    }

    closeWidget() {
      this.isOpen = false;
      this.widget.classList.remove("open");
      this.toggleButton.style.display = "flex";
    }

    toggleVoiceRecording() {
      if (!this.recognition) {
        this.addMessage(
          "Voice recognition is not supported in your browser.",
          "bot"
        );
        return;
      }

      if (this.isRecording) {
        this.recognition.stop();
      } else {
        this.recognition.start();
      }
    }

    async sendMessage() {
      const message = this.messageInput.value.trim();
      if (!message) return;

      this.addMessage(message, "user");
      this.messageInput.value = "";
      this.showTypingIndicator();

      try {
        const response = await fetch(this.webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: message,
            timestamp: new Date().toISOString(),
            type: "text",
            userId: this.userId,
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        this.hideTypingIndicator();
        const botMessage =
          data.response ||
          data.message ||
          "I received your message, but I'm not sure how to respond right now.";
        this.addMessage(botMessage, "bot");
        // Voice playback removed as requested
      } catch (error) {
        console.error("Error sending message:", error);
        this.hideTypingIndicator();
        this.addMessage(
          "Sorry, I'm having trouble connecting right now. Please try again later.",
          "bot"
        );
      }
    }

    addMessage(content, sender, saveToHistory = true) {
      const messageDiv = document.createElement("div");
      messageDiv.className = `chatbot-embed-message ${sender}`;

      const messageContent = document.createElement("div");
      messageContent.className = "chatbot-embed-message-content";

      // Format the content to support markdown-like formatting
      const formattedContent = this.formatMessage(content);
      messageContent.innerHTML = formattedContent;

      messageDiv.appendChild(messageContent);
      this.messagesContainer.appendChild(messageDiv);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;

      // Save to chat history if requested
      if (saveToHistory) {
        const messageData = {
          content: content,
          sender: sender,
          timestamp: new Date().toISOString(),
        };
        this.chatHistory.push(messageData);

        // Keep only last 50 messages to prevent localStorage from getting too large
        if (this.chatHistory.length > 50) {
          this.chatHistory = this.chatHistory.slice(-50);
        }

        this.saveChatHistory();
      }
    }

    formatMessage(content) {
      // Convert markdown-like formatting to HTML
      let formatted = content
        // Convert **bold** to <strong>
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        // Convert image URLs with ! prefix to actual images
        .replace(
          /!\s*`([^`]+)`\s*/g,
          '<img src="$1" alt="Product Image" style="max-width: 100%; height: auto; border-radius: 8px; margin: 8px 0; display: block; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);"/>'
        )
        // Convert regular URLs to links (but not those already in img tags)
        .replace(
          /(^|[^"'])(https?:\/\/[^\s<>"']+)/g,
          '$1<a href="$2" target="_blank" rel="noopener noreferrer">$2</a>'
        );

      // Split content into lines for better processing
      const lines = formatted.split("\n");
      const processedLines = [];
      let inProductItem = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmedLine = line.trim();

        // Check if this is a numbered product item
        if (/^\d+\.\s+\*\*[^*]+\*\*/.test(trimmedLine)) {
          // Close previous product item if open
          if (inProductItem) {
            processedLines.push("</div>");
          }

          // Start new product item
          const match = trimmedLine.match(/^(\d+\.)\s+\*\*([^*]+)\*\*/);
          if (match) {
            processedLines.push(
              `<div class="product-item"><div style="font-weight: 600; color: ${config.theme.primaryColor}; margin-bottom: 8px;">${match[1]} <strong>${match[2]}</strong></div>`
            );
            inProductItem = true;

            // Add any remaining content on the same line
            const remaining = trimmedLine.replace(
              /^\d+\.\s+\*\*[^*]+\*\*\s*/,
              ""
            );
            if (remaining) {
              processedLines.push(
                `<div style="margin: 4px 0 4px 16px;">${remaining}</div>`
              );
            }
          }
          continue;
        }

        // Check if this is a product detail (indented with bullet and bold)
        if (/^\s*-\s+\*\*([^*]+)\*\*:\s*(.+)$/.test(trimmedLine)) {
          const match = trimmedLine.match(/^\s*-\s+\*\*([^*]+)\*\*:\s*(.+)$/);
          if (match) {
            processedLines.push(
              `<div style="margin: 4px 0 4px 16px; font-size: 14px;"><strong>${match[1]}:</strong> ${match[2]}</div>`
            );
          }
          continue;
        }

        // Check if this is a regular bullet point
        if (/^\s*-\s+([^*].*)$/.test(trimmedLine)) {
          const match = trimmedLine.match(/^\s*-\s+([^*].*)$/);
          if (match) {
            processedLines.push(
              `<div style="margin: 4px 0 4px 16px;">• ${match[1]}</div>`
            );
          }
          continue;
        }

        // Handle empty lines
        if (trimmedLine === "") {
          // Only add paragraph break if we're not in a product item
          if (!inProductItem) {
            processedLines.push("<br>");
          }
          continue;
        }

        // Regular text line
        if (inProductItem) {
          // Close product item if we encounter regular text
          processedLines.push("</div>");
          inProductItem = false;
        }

        processedLines.push(line);
      }

      // Close any remaining open product item
      if (inProductItem) {
        processedLines.push("</div>");
      }

      // Join lines and clean up excessive breaks
      formatted = processedLines
        .join("\n")
        // Convert double line breaks to paragraph breaks only for non-HTML content
        .replace(/\n\n+/g, "\n<br>\n")
        // Convert single line breaks to <br> only for plain text (not HTML tags)
        .replace(/\n(?![<\s])/g, "<br>")
        // Clean up any double <br> tags
        .replace(/<br>\s*<br>/g, "<br>")
        // Remove <br> tags that come right after div tags
        .replace(/(<\/div>)\s*<br>/g, "$1")
        .replace(/(<div[^>]*>)\s*<br>/g, "$1");

      return formatted;
    }

    showTypingIndicator() {
      const typingDiv = document.createElement("div");
      typingDiv.className = "chatbot-embed-message bot";
      typingDiv.id = "chatbotEmbedTypingIndicator";

      const typingContent = document.createElement("div");
      typingContent.className = "chatbot-embed-typing-indicator show";

      for (let i = 0; i < 3; i++) {
        const dot = document.createElement("div");
        dot.className = "chatbot-embed-typing-dot";
        typingContent.appendChild(dot);
      }

      typingDiv.appendChild(typingContent);
      this.messagesContainer.appendChild(typingDiv);
      this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
      const typingIndicator = document.getElementById(
        "chatbotEmbedTypingIndicator"
      );
      if (typingIndicator) {
        typingIndicator.remove();
      }
    }

    speakMessage(message) {
      if (this.synthesis && this.synthesis.speaking === false) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.rate = 0.9;
        utterance.pitch = 1;
        utterance.volume = 0.8;

        const voices = this.synthesis.getVoices();
        const preferredVoice = voices.find(
          (voice) =>
            voice.lang.startsWith("en") &&
            (voice.name.includes("Google") || voice.name.includes("Microsoft"))
        );

        if (preferredVoice) {
          utterance.voice = preferredVoice;
        }

        this.synthesis.speak(utterance);
      }
    }

    // Public methods for external access
    getUserId() {
      return this.userId;
    }

    getChatHistory() {
      return this.chatHistory;
    }

    clearChatHistory() {
      this.chatHistory = [];
      localStorage.removeItem("chatbot_chat_history");
      this.messagesContainer.innerHTML = "";
      // Add welcome message back
      this.addMessage(
        "Hello! I'm here to help you. You can type your message or use the microphone to speak.",
        "bot",
        false
      );
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      window.chatbotWidgetInstance = new EmbeddedChatbotWidget();
    });
  } else {
    window.chatbotWidgetInstance = new EmbeddedChatbotWidget();
  }

  // Add event listener for testing purposes
  document.addEventListener("addTestMessage", function (event) {
    if (window.chatbotWidgetInstance && event.detail) {
      window.chatbotWidgetInstance.addMessage(
        event.detail.content,
        event.detail.sender
      );
    }
  });
})();
