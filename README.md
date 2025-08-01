# 🤖 Chatbot Widget

A beautiful, embeddable chatbot widget that supports both text and voice interactions. The widget sends user messages to a webhook endpoint and displays the responses in a modern, responsive interface.

## ✨ Features

- 💬 **Text Messaging**: Send and receive text messages through webhook integration
- 🎤 **Voice Input**: Speech-to-text functionality for hands-free interaction
- 🔊 **Voice Output**: Text-to-speech responses for accessibility
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Customizable**: Configurable themes, colors, and positioning
- ⚡ **Easy Integration**: Single script tag integration
- 🌐 **Cross-Browser**: Compatible with all modern browsers
- 👤 **User Identification**: Unique user IDs for tracking conversations
- 💾 **Chat History**: Messages persist across page refreshes using localStorage
- 🔄 **Context Awareness**: Chat history sent to webhook for better responses
- 🧹 **Auto Cleanup**: Automatically manages storage size (keeps last 50 messages)

## 🚀 Quick Start

### Method 1: Direct Integration (Recommended)

Add this single line to your website's HTML:

```html
<script src="https://your-domain.com/embed.js"></script>
```

### Method 2: Custom Configuration

For advanced customization, configure before loading:

```html
<script>
  window.ChatbotConfig = {
    webhookUrl: "https://your-webhook-endpoint.com/webhook",
    title: "Your Assistant Name",
    position: "bottom-right",
    theme: {
      primaryColor: "#667eea",
      secondaryColor: "#764ba2",
      textColor: "#333",
      backgroundColor: "#fff",
    },
  };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

## 📁 Files Overview

- **`embed.js`** - Main embeddable widget script (use this for integration)
- **`chatbot-widget.html`** - Standalone HTML version
- **`chatbot-widget.js`** - Standalone JavaScript functionality
- **`demo.html`** - Demo page showing the widget in action
- **`README.md`** - This documentation file

## ⚙️ Configuration Options

| Option                  | Type   | Default          | Description                           |
| ----------------------- | ------ | ---------------- | ------------------------------------- |
| `webhookUrl`            | string | Required         | Your webhook endpoint URL             |
| `title`                 | string | 'Chat Assistant' | Widget header title                   |
| `position`              | string | 'bottom-right'   | Widget position (see positions below) |
| `theme.primaryColor`    | string | '#667eea'        | Primary theme color                   |
| `theme.secondaryColor`  | string | '#764ba2'        | Secondary theme color                 |
| `theme.textColor`       | string | '#333'           | Text color                            |
| `theme.backgroundColor` | string | '#fff'           | Background color                      |

### Available Positions

- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

## 🔌 Webhook Integration

### Request Format

The widget sends POST requests to your webhook with this JSON structure:

```json
{
  "message": "User's message text",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "type": "text"
}
```

### Response Format

Your webhook should respond with JSON in this format:

```json
{
  "response": "Bot's reply message"
}
```

Alternatively, you can use:

```json
{
  "message": "Bot's reply message"
}
```

### Error Handling

If your webhook is unavailable or returns an error, the widget will display a friendly error message to the user.

## 👤 User Identification & Chat History

### User ID Generation

The widget automatically generates a unique user ID for each visitor:

- Format: `user_{timestamp}_{random_string}`
- Stored in localStorage as `chatbot_user_id`
- Persists across browser sessions
- Sent with every webhook request

### Chat History Persistence

- Messages are automatically saved to localStorage
- History persists across page refreshes
- Automatically loads previous conversations
- Keeps last 50 messages (auto-cleanup)
- Stored as `chatbot_chat_history`

### Enhanced Webhook Payload

Your webhook now receives additional context:

```json
{
  "message": "User's current message",
  "timestamp": "2024-01-01T12:00:00.000Z",
  "type": "text",
  "userId": "user_1704110400000_abc123def"
}
```

### JavaScript API

Access widget functionality programmatically:

```javascript
// Get the current user ID
const userId = window.chatbotWidgetInstance.getUserId();

// Get chat history
const history = window.chatbotWidgetInstance.getChatHistory();

// Clear chat history
window.chatbotWidgetInstance.clearChatHistory();

// Add a message programmatically
window.chatbotWidgetInstance.addMessage("Hello!", "user");
```

## 🎤 Voice Features

### Speech Recognition

- Automatically detects browser support
- Uses Web Speech API
- Supports multiple languages (default: English)
- Visual feedback during recording

### Text-to-Speech

- Reads bot responses aloud
- Automatically selects best available voice
- Configurable speech rate and volume

### Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Text-to-speech only
- Safari: Limited support
- Mobile browsers: Varies by device

## 📱 Responsive Design

- **Desktop**: 350px × 500px floating widget
- **Mobile**: Full-screen overlay (with margins)
- **Tablet**: Adaptive sizing
- **Touch-friendly**: Large tap targets

## 🛠️ Development

### Testing Locally

1. Open `demo.html` in your browser
2. Click the chat button to test functionality
3. Try both text and voice input

### Customization

1. Modify the CSS variables in `embed.js`
2. Update the configuration object
3. Test with your webhook endpoint

## 🔧 Troubleshooting

### Common Issues

**Widget not appearing:**

- Check browser console for JavaScript errors
- Ensure the script is loaded after the DOM
- Verify the script URL is accessible

**Voice not working:**

- Check browser permissions for microphone
- Ensure HTTPS connection (required for speech recognition)
- Test in a supported browser

**Webhook errors:**

- Verify webhook URL is correct and accessible
- Check CORS settings on your server
- Ensure webhook returns proper JSON format

### Browser Console

The widget logs helpful information to the browser console for debugging.

## 🌐 Browser Support

| Feature            | Chrome | Firefox | Safari | Edge |
| ------------------ | ------ | ------- | ------ | ---- |
| Basic Chat         | ✅     | ✅      | ✅     | ✅   |
| Speech Recognition | ✅     | ❌      | ⚠️     | ✅   |
| Text-to-Speech     | ✅     | ✅      | ✅     | ✅   |
| Responsive Design  | ✅     | ✅      | ✅     | ✅   |

✅ Full support | ⚠️ Partial support | ❌ Not supported

## 📄 License

This chatbot widget is provided as-is for integration into websites. Feel free to modify and customize according to your needs.

## 🤝 Support

For issues or questions:

1. Check the troubleshooting section above
2. Review browser console for error messages
3. Test with the demo page first
4. Verify webhook integration

---

**Happy chatting! 🎉**
