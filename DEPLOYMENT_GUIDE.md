# 🚀 Chatbot Widget Deployment Guide

This guide covers multiple deployment options to make your chatbot widget easily integrable across different websites.

## 📋 Table of Contents

1. [Quick Deployment Options](#quick-deployment-options)
2. [CDN Hosting](#cdn-hosting)
3. [GitHub Pages](#github-pages)
4. [Vercel Deployment](#vercel-deployment)
5. [Self-Hosting](#self-hosting)
6. [Integration Examples](#integration-examples)
7. [CORS Configuration](#cors-configuration)

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from project directory
vercel
```

### Option 2: GitHub Pages

1. Push code to GitHub repository
2. Go to Settings > Pages
3. Select source branch (main/master)
4. Your widget will be available at: `https://username.github.io/repository-name/embed.js`

### Option 3: Netlify

1. Drag and drop your project folder to [netlify.com/drop](https://netlify.com/drop)
2. Get instant deployment URL

## 🌐 CDN Hosting

### Using jsDelivr (GitHub)

```html
<!-- Replace 'username' and 'repo' with your GitHub details -->
<script src="https://cdn.jsdelivr.net/gh/username/repo@main/embed.js"></script>
```

### Using unpkg (npm)

```bash
# First publish to npm
npm publish
```

```html
<!-- Then use via unpkg -->
<script src="https://unpkg.com/your-package-name@latest/embed.js"></script>
```

## 📄 GitHub Pages Setup

### Step 1: Repository Structure

```
your-chatbot-widget/
├── embed.js              # Main widget file
├── demo.html            # Demo page
├── README.md            # Documentation
├── package.json         # Package info
└── .github/
    └── workflows/
        └── deploy.yml   # Auto-deployment
```

### Step 2: GitHub Actions (Optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./
```

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Scroll to "Pages" section
3. Select "Deploy from a branch"
4. Choose "main" branch and "/ (root)"
5. Save settings

## ⚡ Vercel Deployment

### Method 1: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project directory
vercel

# Follow prompts to configure
```

### Method 2: Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import from GitHub/GitLab/Bitbucket
4. Select your repository
5. Deploy with default settings

### Vercel Configuration

Create `vercel.json` for custom settings:

```json
{
  "public": true,
  "headers": [
    {
      "source": "/embed.js",
      "headers": [
        {
          "key": "Access-Control-Allow-Origin",
          "value": "*"
        },
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🏠 Self-Hosting

### Apache Configuration

Add to `.htaccess`:

```apache
# Enable CORS
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "GET, POST, OPTIONS"
Header always set Access-Control-Allow-Headers "Content-Type"

# Cache JavaScript files
<FilesMatch "\.(js)$">
    ExpiresActive On
    ExpiresDefault "access plus 1 year"
</FilesMatch>
```

### Nginx Configuration

Add to server block:

```nginx
location /embed.js {
    add_header Access-Control-Allow-Origin *;
    add_header Cache-Control "public, max-age=31536000, immutable";
    expires 1y;
}
```

### Node.js/Express Server

```javascript
const express = require("express");
const path = require("path");
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Serve embed.js with proper headers
app.get("/embed.js", (req, res) => {
  res.set({
    "Content-Type": "application/javascript",
    "Cache-Control": "public, max-age=31536000, immutable",
  });
  res.sendFile(path.join(__dirname, "embed.js"));
});

app.listen(3000, () => {
  console.log("Widget server running on port 3000");
});
```

## 🔗 Integration Examples

### Basic Integration

```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Website</title>
  </head>
  <body>
    <h1>Welcome to My Website</h1>

    <!-- Chatbot Widget -->
    <script src="https://your-domain.com/embed.js"></script>
  </body>
</html>
```

### Custom Configuration

```html
<script>
  window.ChatbotConfig = {
    webhookUrl: "https://your-webhook-endpoint.com/webhook",
    title: "Customer Support",
    position: "bottom-right",
    theme: {
      primaryColor: "#007bff",
      secondaryColor: "#6c757d",
      textColor: "#333",
      backgroundColor: "#fff",
    },
  };
</script>
<script src="https://your-domain.com/embed.js"></script>
```

### WordPress Integration

```php
// Add to functions.php
function add_chatbot_widget() {
    ?>
    <script>
        window.ChatbotConfig = {
            webhookUrl: '<?php echo get_option('chatbot_webhook_url'); ?>',
            title: '<?php echo get_option('chatbot_title', 'Support Chat'); ?>'
        };
    </script>
    <script src="https://your-domain.com/embed.js"></script>
    <?php
}
add_action('wp_footer', 'add_chatbot_widget');
```

### React Integration

```jsx
import { useEffect } from "react";

function App() {
  useEffect(() => {
    // Configure chatbot
    window.ChatbotConfig = {
      webhookUrl: process.env.REACT_APP_WEBHOOK_URL,
      title: "Support Assistant",
    };

    // Load script
    const script = document.createElement("script");
    script.src = "https://your-domain.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="App">
      <h1>My React App</h1>
    </div>
  );
}
```

## 🔒 CORS Configuration

### Why CORS Matters

Cross-Origin Resource Sharing (CORS) is essential for your widget to work on different domains.

### Server-Side CORS Headers

```javascript
// Express.js example
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});
```

### Webhook CORS

Ensure your webhook endpoint also supports CORS:

```javascript
// Webhook endpoint
app.post("/webhook", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  // Process chatbot message
  const { message, userId } = req.body;

  // Your logic here

  res.json({ response: "Bot reply message" });
});
```

## 📊 Analytics & Monitoring

### Usage Tracking

```javascript
// Add to embed.js for analytics
function trackWidgetUsage(event, data) {
  if (typeof gtag !== "undefined") {
    gtag("event", event, {
      event_category: "Chatbot Widget",
      event_label: data.userId,
      custom_map: { dimension1: data.userId },
    });
  }
}

// Track widget opens
trackWidgetUsage("widget_opened", { userId: this.userId });

// Track messages sent
trackWidgetUsage("message_sent", {
  userId: this.userId,
  messageLength: message.length,
});
```

## 🔧 Troubleshooting Deployment

### Common Issues

**CORS Errors:**

- Ensure proper CORS headers on your server
- Check if webhook endpoint supports CORS
- Verify domain whitelist settings

**Script Loading Issues:**

- Check if CDN/hosting service is accessible
- Verify script URL is correct
- Ensure HTTPS if parent site uses HTTPS

**Widget Not Appearing:**

- Check browser console for JavaScript errors
- Verify script loads after DOM is ready
- Check CSS conflicts with parent site

### Testing Deployment

```html
<!-- Test page -->
<!DOCTYPE html>
<html>
  <head>
    <title>Widget Test</title>
  </head>
  <body>
    <h1>Testing Chatbot Widget</h1>
    <p>
      If you see a chat button in the bottom-right corner, the deployment is
      successful!
    </p>

    <script>
      window.ChatbotConfig = {
        webhookUrl: "https://httpbin.org/post", // Test endpoint
        title: "Test Bot",
      };
    </script>
    <script src="YOUR_DEPLOYED_SCRIPT_URL_HERE"></script>

    <script>
      // Test script loading
      setTimeout(() => {
        if (window.chatbotWidgetInstance) {
          console.log("✅ Widget loaded successfully!");
          console.log("User ID:", window.chatbotWidgetInstance.getUserId());
        } else {
          console.error("❌ Widget failed to load");
        }
      }, 2000);
    </script>
  </body>
</html>
```

## 🎯 Best Practices

1. **Use HTTPS**: Always serve your widget over HTTPS
2. **Enable Caching**: Set appropriate cache headers for better performance
3. **Minify Code**: Compress your JavaScript for faster loading
4. **Version Control**: Use versioned URLs for updates
5. **Monitor Usage**: Track widget performance and usage analytics
6. **Test Thoroughly**: Test on different domains and devices
7. **Documentation**: Provide clear integration instructions

## 📞 Support

For deployment issues:

1. Check the troubleshooting section above
2. Verify CORS configuration
3. Test with the provided test page
4. Check browser console for errors

Your widget is now ready for deployment and integration across multiple platforms! 🎉
