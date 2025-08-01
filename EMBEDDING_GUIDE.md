# Chatbot Widget Embedding Guide

This guide provides comprehensive instructions for embedding the chatbot widget in various frameworks and environments.

## Table of Contents

1. [Vanilla JavaScript (Universal)](#vanilla-javascript-universal)
2. [React Integration](#react-integration)
3. [Vue.js Integration](#vuejs-integration)
4. [Angular Integration](#angular-integration)
5. [Configuration Options](#configuration-options)
6. [API Reference](#api-reference)
7. [Customization](#customization)
8. [Troubleshooting](#troubleshooting)

## Vanilla JavaScript (Universal)

The simplest way to add the chatbot to any website.

### Basic Integration

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Website</title>
</head>
<body>
    <!-- Your website content -->
    
    <!-- Chatbot Widget - Add before closing body tag -->
    <script src="https://your-domain.com/embed.js"></script>
</body>
</html>
```

### With Custom Configuration

```html
<script>
    // Configure before loading the widget
    window.ChatbotConfig = {
        webhookUrl: 'https://your-api.com/webhook',
        title: 'Customer Support',
        position: 'bottom-left',
        theme: {
            primaryColor: '#3498db',
            secondaryColor: '#2980b9',
            textColor: '#333333',
            backgroundColor: '#ffffff'
        },
        enableVoice: true,
        placeholder: 'How can I help you?',
        initialMessage: 'Welcome! How can I assist you today?'
    };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

### CDN Integration

```html
<!-- Option 1: Direct CDN -->
<script src="https://cdn.jsdelivr.net/gh/your-username/chatbot-widget@main/embed.js"></script>

<!-- Option 2: With configuration -->
<script>
    window.ChatbotConfig = {
        webhookUrl: 'https://your-webhook-url.com/webhook'
    };
</script>
<script src="https://cdn.jsdelivr.net/gh/your-username/chatbot-widget@main/embed.js"></script>
```

## React Integration

### Installation

1. Copy `react-chatbot-widget.jsx` to your React project
2. Import and use the component

### Basic Usage

```jsx
import React from 'react';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  return (
    <div className="App">
      {/* Your app content */}
      <h1>Welcome to My App</h1>
      
      {/* Chatbot Widget */}
      <ChatbotWidget />
    </div>
  );
}

export default App;
```

### Advanced Usage with Props

```jsx
import React from 'react';
import ChatbotWidget from './components/ChatbotWidget';

function App() {
  const handleMessageSent = (message) => {
    console.log('User sent:', message);
  };

  const handleMessageReceived = (message) => {
    console.log('Bot replied:', message);
  };

  const handleWidgetToggle = (isOpen) => {
    console.log('Widget is now:', isOpen ? 'open' : 'closed');
  };

  return (
    <div className="App">
      <ChatbotWidget
        webhookUrl="https://your-api.com/webhook"
        title="AI Assistant"
        position="bottom-left"
        theme={{
          primaryColor: '#667eea',
          secondaryColor: '#764ba2',
          textColor: '#2d3748',
          backgroundColor: '#ffffff'
        }}
        enableVoice={true}
        placeholder="Ask me anything..."
        initialMessage="Hi! I'm your AI assistant. How can I help?"
        onMessageSent={handleMessageSent}
        onMessageReceived={handleMessageReceived}
        onWidgetToggle={handleWidgetToggle}
      />
    </div>
  );
}

export default App;
```

### TypeScript Support

Create a TypeScript definition file `chatbot-widget.d.ts`:

```typescript
interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

interface Theme {
  primaryColor: string;
  secondaryColor: string;
  textColor: string;
  backgroundColor: string;
}

interface ChatbotWidgetProps {
  webhookUrl?: string;
  title?: string;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  theme?: Theme;
  enableVoice?: boolean;
  placeholder?: string;
  initialMessage?: string;
  onMessageSent?: (message: Message) => void;
  onMessageReceived?: (message: Message) => void;
  onWidgetToggle?: (isOpen: boolean) => void;
}

declare const ChatbotWidget: React.FC<ChatbotWidgetProps>;
export default ChatbotWidget;
```

## Vue.js Integration

### Installation

1. Copy `vue-chatbot-widget.vue` to your Vue project
2. Register and use the component

### Basic Usage

```vue
<template>
  <div id="app">
    <!-- Your app content -->
    <h1>Welcome to My Vue App</h1>
    
    <!-- Chatbot Widget -->
    <ChatbotWidget />
  </div>
</template>

<script>
import ChatbotWidget from './components/ChatbotWidget.vue';

export default {
  name: 'App',
  components: {
    ChatbotWidget
  }
};
</script>
```

### Advanced Usage with Props and Events

```vue
<template>
  <div id="app">
    <ChatbotWidget
      :webhook-url="webhookUrl"
      :title="chatTitle"
      :position="chatPosition"
      :theme="chatTheme"
      :enable-voice="true"
      :placeholder="chatPlaceholder"
      :initial-message="welcomeMessage"
      @message-sent="onMessageSent"
      @message-received="onMessageReceived"
      @widget-toggle="onWidgetToggle"
    />
  </div>
</template>

<script>
import ChatbotWidget from './components/ChatbotWidget.vue';

export default {
  name: 'App',
  components: {
    ChatbotWidget
  },
  data() {
    return {
      webhookUrl: 'https://your-api.com/webhook',
      chatTitle: 'Support Bot',
      chatPosition: 'bottom-right',
      chatTheme: {
        primaryColor: '#42b883',
        secondaryColor: '#369870',
        textColor: '#2c3e50',
        backgroundColor: '#ffffff'
      },
      chatPlaceholder: 'Type your question...',
      welcomeMessage: 'Hello! How can I assist you today?'
    };
  },
  methods: {
    onMessageSent(message) {
      console.log('User message:', message);
    },
    onMessageReceived(message) {
      console.log('Bot response:', message);
    },
    onWidgetToggle(isOpen) {
      console.log('Chat widget:', isOpen ? 'opened' : 'closed');
    }
  }
};
</script>
```

### Vue 3 Composition API

```vue
<template>
  <div id="app">
    <ChatbotWidget
      :webhook-url="config.webhookUrl"
      :title="config.title"
      :theme="config.theme"
      @message-sent="handleMessageSent"
      @widget-toggle="handleWidgetToggle"
    />
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ChatbotWidget from './components/ChatbotWidget.vue';

const config = reactive({
  webhookUrl: 'https://your-api.com/webhook',
  title: 'Vue 3 Assistant',
  theme: {
    primaryColor: '#4fc08d',
    secondaryColor: '#42b883',
    textColor: '#2c3e50',
    backgroundColor: '#ffffff'
  }
});

const handleMessageSent = (message) => {
  console.log('Message sent:', message);
};

const handleWidgetToggle = (isOpen) => {
  console.log('Widget toggled:', isOpen);
};
</script>
```

## Angular Integration

### Installation

1. Copy `angular-chatbot-widget.component.ts` to your Angular project
2. Import required modules and declare the component

### Module Setup

```typescript
// app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ChatbotWidgetComponent } from './components/chatbot-widget.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatbotWidgetComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Basic Usage

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <h1>Welcome to My Angular App</h1>
      
      <!-- Chatbot Widget -->
      <app-chatbot-widget></app-chatbot-widget>
    </div>
  `
})
export class AppComponent {
  title = 'my-angular-app';
}
```

### Advanced Usage with Configuration

```typescript
// app.component.ts
import { Component } from '@angular/core';

interface Message {
  content: string;
  sender: 'user' | 'bot';
  timestamp: number;
}

@Component({
  selector: 'app-root',
  template: `
    <div class="app">
      <app-chatbot-widget
        [webhookUrl]="chatConfig.webhookUrl"
        [title]="chatConfig.title"
        [position]="chatConfig.position"
        [theme]="chatConfig.theme"
        [enableVoice]="chatConfig.enableVoice"
        [placeholder]="chatConfig.placeholder"
        [initialMessage]="chatConfig.initialMessage"
        (messageSent)="onMessageSent($event)"
        (messageReceived)="onMessageReceived($event)"
        (widgetToggle)="onWidgetToggle($event)"
      ></app-chatbot-widget>
    </div>
  `
})
export class AppComponent {
  chatConfig = {
    webhookUrl: 'https://your-api.com/webhook',
    title: 'Angular Assistant',
    position: 'bottom-right' as const,
    theme: {
      primaryColor: '#dd0031',
      secondaryColor: '#c3002f',
      textColor: '#333333',
      backgroundColor: '#ffffff'
    },
    enableVoice: true,
    placeholder: 'Ask me anything...',
    initialMessage: 'Hello! I\'m your Angular assistant.'
  };

  onMessageSent(message: Message): void {
    console.log('User sent:', message);
  }

  onMessageReceived(message: Message): void {
    console.log('Bot replied:', message);
  }

  onWidgetToggle(isOpen: boolean): void {
    console.log('Widget is:', isOpen ? 'open' : 'closed');
  }
}
```

## Configuration Options

### Complete Configuration Object

```javascript
const config = {
  // Required: Your webhook endpoint
  webhookUrl: 'https://your-api.com/webhook',
  
  // Widget appearance
  title: 'Chat Assistant',
  position: 'bottom-right', // 'bottom-right', 'bottom-left', 'top-right', 'top-left'
  
  // Theme customization
  theme: {
    primaryColor: '#6366f1',     // Main brand color
    secondaryColor: '#8b5cf6',   // Secondary/gradient color
    textColor: '#374151',        // Text color
    backgroundColor: '#ffffff'   // Background color
  },
  
  // Features
  enableVoice: true,              // Enable voice recognition
  
  // Text customization
  placeholder: 'Type your message...',
  initialMessage: 'Hello! How can I help you?',
  
  // Advanced options
  autoOpen: false,                // Auto-open widget on page load
  showTypingIndicator: true,      // Show typing animation
  messageDelay: 1000,            // Delay before showing bot response (ms)
  maxMessages: 100,              // Maximum messages to keep in memory
  
  // Responsive behavior
  mobileBreakpoint: 768,         // Breakpoint for mobile layout (px)
  
  // Analytics and tracking
  trackEvents: true,             // Enable event tracking
  sessionId: null,               // Custom session ID
  
  // Custom styling
  customCSS: '',                 // Additional CSS to inject
  
  // Callbacks (for vanilla JS)
  onMessageSent: null,           // Function called when user sends message
  onMessageReceived: null,       // Function called when bot responds
  onWidgetToggle: null,          // Function called when widget opens/closes
  onError: null                  // Function called on errors
};
```

### Position Options

- `bottom-right` (default): Bottom right corner
- `bottom-left`: Bottom left corner
- `top-right`: Top right corner
- `top-left`: Top left corner

### Theme Customization

The theme object supports the following properties:

```javascript
theme: {
  primaryColor: '#6366f1',      // Buttons, headers, user messages
  secondaryColor: '#8b5cf6',    // Gradients, hover states
  textColor: '#374151',         // Main text color
  backgroundColor: '#ffffff',   // Widget background
  borderRadius: '24px',         // Widget border radius
  fontFamily: 'Inter, sans-serif' // Font family
}
```

## API Reference

### Methods (Vanilla JavaScript)

```javascript
// Get widget instance
const widget = window.ChatbotWidget;

// Open/close widget
widget.open();
widget.close();
widget.toggle();

// Send message programmatically
widget.sendMessage('Hello from code!');

// Add message to chat
widget.addMessage('Custom message', 'bot');

// Clear chat history
widget.clearMessages();

// Update configuration
widget.updateConfig({
  title: 'New Title',
  theme: { primaryColor: '#ff0000' }
});

// Get current state
const isOpen = widget.isOpen();
const messages = widget.getMessages();
```

### Events (Vanilla JavaScript)

```javascript
// Listen to widget events
widget.on('message-sent', (message) => {
  console.log('User sent:', message);
});

widget.on('message-received', (message) => {
  console.log('Bot replied:', message);
});

widget.on('widget-opened', () => {
  console.log('Widget opened');
});

widget.on('widget-closed', () => {
  console.log('Widget closed');
});

widget.on('error', (error) => {
  console.error('Widget error:', error);
});
```

### React Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `webhookUrl` | string | Required | Your webhook endpoint |
| `title` | string | 'Chat Assistant' | Widget title |
| `position` | string | 'bottom-right' | Widget position |
| `theme` | object | Default theme | Theme configuration |
| `enableVoice` | boolean | true | Enable voice recognition |
| `placeholder` | string | 'Type your message...' | Input placeholder |
| `initialMessage` | string | Default message | Initial bot message |
| `onMessageSent` | function | null | Message sent callback |
| `onMessageReceived` | function | null | Message received callback |
| `onWidgetToggle` | function | null | Widget toggle callback |

### Vue Props and Events

**Props:** Same as React props (kebab-case)

**Events:**
- `@message-sent`: User sends a message
- `@message-received`: Bot responds
- `@widget-toggle`: Widget opens/closes

### Angular Inputs and Outputs

**Inputs:** Same as React props (camelCase)

**Outputs:**
- `(messageSent)`: User sends a message
- `(messageReceived)`: Bot responds
- `(widgetToggle)`: Widget opens/closes

## Customization

### Custom Styling

#### CSS Variables

```css
:root {
  --chatbot-primary-color: #6366f1;
  --chatbot-secondary-color: #8b5cf6;
  --chatbot-text-color: #374151;
  --chatbot-background-color: #ffffff;
  --chatbot-border-radius: 24px;
  --chatbot-font-family: 'Inter', sans-serif;
  --chatbot-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}
```

#### Custom CSS Classes

```css
/* Override widget styles */
.chatbot-widget {
  /* Your custom styles */
}

.chatbot-toggle {
  /* Custom toggle button styles */
}

.chatbot-message.user .chatbot-message-content {
  /* Custom user message styles */
}

.chatbot-message.bot .chatbot-message-content {
  /* Custom bot message styles */
}
```

### Custom Icons

```javascript
// Replace default icons
window.ChatbotConfig = {
  icons: {
    toggle: '<svg>...</svg>',      // Toggle button icon
    send: '<svg>...</svg>',        // Send button icon
    voice: '<svg>...</svg>',       // Voice button icon
    close: '<svg>...</svg>'        // Close button icon
  }
};
```

### Custom Messages

```javascript
window.ChatbotConfig = {
  messages: {
    initial: 'Welcome! How can I help you today?',
    placeholder: 'Type your message here...',
    voiceNotSupported: 'Voice recognition is not supported.',
    connectionError: 'Connection error. Please try again.',
    typing: 'Bot is typing...',
    retry: 'Retry'
  }
};
```

## Troubleshooting

### Common Issues

#### 1. Widget Not Appearing

**Possible causes:**
- Script not loaded properly
- JavaScript errors in console
- CSS conflicts

**Solutions:**
```javascript
// Check if widget loaded
if (window.ChatbotWidget) {
  console.log('Widget loaded successfully');
} else {
  console.error('Widget failed to load');
}

// Force initialization
window.ChatbotWidget.init();
```

#### 2. Webhook Not Working

**Check webhook URL:**
```javascript
// Test webhook manually
fetch('https://your-webhook-url.com/webhook', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'test' })
})
.then(response => response.json())
.then(data => console.log('Webhook response:', data))
.catch(error => console.error('Webhook error:', error));
```

#### 3. Voice Recognition Not Working

**Requirements:**
- HTTPS connection (required for microphone access)
- Supported browser (Chrome, Edge, Safari)
- User permission granted

**Debug:**
```javascript
// Check browser support
if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
  console.log('Speech recognition supported');
} else {
  console.log('Speech recognition not supported');
}
```

#### 4. Styling Issues

**CSS Conflicts:**
```css
/* Increase specificity */
.chatbot-widget.chatbot-widget {
  /* Your styles with higher specificity */
}

/* Use !important sparingly */
.chatbot-widget {
  z-index: 999999 !important;
}
```

#### 5. Mobile Responsiveness

**Viewport meta tag required:**
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### Debug Mode

```javascript
// Enable debug mode
window.ChatbotConfig = {
  debug: true,
  logLevel: 'verbose' // 'error', 'warn', 'info', 'verbose'
};
```

### Performance Optimization

```javascript
// Lazy load widget
window.ChatbotConfig = {
  lazyLoad: true,           // Load widget on first interaction
  preloadDelay: 3000,       // Preload after 3 seconds
  enableServiceWorker: true // Enable caching
};
```

### Browser Compatibility

| Feature | Chrome | Firefox | Safari | Edge |
|---------|--------|---------|--------|---------|
| Basic Widget | ✅ | ✅ | ✅ | ✅ |
| Voice Recognition | ✅ | ❌ | ✅ | ✅ |
| Speech Synthesis | ✅ | ✅ | ✅ | ✅ |
| Backdrop Filter | ✅ | ✅ | ✅ | ✅ |

### Support

For additional support:

1. Check browser console for errors
2. Verify webhook endpoint is accessible
3. Test with minimal configuration first
4. Check network requests in browser dev tools
5. Ensure HTTPS for voice features

## Examples

Check out the `examples/` directory for complete implementation examples:

- **`react-example.jsx`** - Complete React integration with advanced features:
  - State management with hooks
  - Real-time analytics dashboard
  - Dynamic theming
  - Message persistence
  - Event tracking
  - Performance monitoring

- **`vue-example.vue`** - Vue.js implementation showcasing:
  - Composition API usage
  - Reactive data binding
  - Watchers for auto-persistence
  - Computed properties
  - Lifecycle hooks
  - Auto-reply demo system

- **`angular-example.component.ts`** - Angular component demonstrating:
  - TypeScript integration
  - RxJS observables
  - Dependency injection
  - Change detection
  - Angular animations
  - Service architecture
  - **`angular-example.component.scss`** - Comprehensive SCSS styling

- **`vanilla-example.html`** - Pure JavaScript implementation featuring:
  - Zero dependencies
  - Modern Web APIs
  - ES6+ features
  - Performance testing
  - Data import/export
  - Responsive design
  - Accessibility features

---

**Need help?** Create an issue in the repository or contact support with:
- Browser version
- Framework version
- Configuration used
- Console errors
- Steps to reproduce