# Chatbot Widget Examples

This directory contains comprehensive examples demonstrating how to integrate the chatbot widget across different frameworks and environments. Each example showcases advanced features, best practices, and real-world implementation patterns.

## 🚀 Quick Start

Choose the example that matches your technology stack:

| Framework | File | Description |
|-----------|------|-------------|
| **React** | `react-example.jsx` | Modern React with hooks, state management, and analytics |
| **Vue.js** | `vue-example.vue` | Vue 3 Composition API with reactive features |
| **Angular** | `angular-example.component.ts` | TypeScript component with RxJS and services |
| **Vanilla JS** | `vanilla-example.html` | Pure JavaScript with modern Web APIs |

## 📁 File Structure

```
examples/
├── README.md                           # This file
├── react-example.jsx                   # React implementation
├── vue-example.vue                     # Vue.js implementation
├── angular-example.component.ts        # Angular TypeScript component
├── angular-example.component.scss      # Angular component styles
└── vanilla-example.html                # Vanilla JavaScript implementation
```

## 🔧 Setup Instructions

### React Example

1. **Prerequisites:**
   ```bash
   npm install react react-dom
   ```

2. **Usage:**
   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import App from './react-example';
   
   ReactDOM.render(<App />, document.getElementById('root'));
   ```

3. **Features:**
   - ✅ Real-time analytics dashboard
   - ✅ Dynamic theme switching
   - ✅ Message persistence with localStorage
   - ✅ Event tracking and analytics
   - ✅ Responsive design
   - ✅ Performance monitoring

### Vue.js Example

1. **Prerequisites:**
   ```bash
   npm install vue@next
   ```

2. **Usage:**
   ```javascript
   import { createApp } from 'vue';
   import App from './vue-example.vue';
   
   createApp(App).mount('#app');
   ```

3. **Features:**
   - ✅ Vue 3 Composition API
   - ✅ Reactive data binding
   - ✅ Watchers for auto-persistence
   - ✅ Computed properties
   - ✅ Auto-reply demo system
   - ✅ Lifecycle hooks integration

### Angular Example

1. **Prerequisites:**
   ```bash
   npm install @angular/core @angular/common rxjs
   ```

2. **Usage:**
   ```typescript
   import { Component } from '@angular/core';
   import { AngularExampleComponent } from './angular-example.component';
   
   @NgModule({
     declarations: [AngularExampleComponent],
     // ... other config
   })
   export class AppModule { }
   ```

3. **Features:**
   - ✅ TypeScript integration
   - ✅ RxJS observables and operators
   - ✅ Dependency injection
   - ✅ Angular animations
   - ✅ Change detection optimization
   - ✅ SCSS styling with mixins

### Vanilla JavaScript Example

1. **Prerequisites:**
   - Modern browser (ES6+ support)
   - No additional dependencies required

2. **Usage:**
   ```html
   <!DOCTYPE html>
   <html>
   <head>
       <title>Chatbot Widget</title>
   </head>
   <body>
       <!-- Include the example file -->
       <script src="vanilla-example.html"></script>
   </body>
   </html>
   ```

3. **Features:**
   - ✅ Zero dependencies
   - ✅ Modern Web APIs (Speech Recognition, Local Storage)
   - ✅ ES6+ features (async/await, modules)
   - ✅ Performance testing tools
   - ✅ Data import/export functionality
   - ✅ Accessibility features (WCAG compliant)

## 🎨 Customization Guide

### Theme Configuration

All examples support dynamic theming. Here's how to customize:

```javascript
const customTheme = {
  primaryColor: '#your-primary-color',
  secondaryColor: '#your-secondary-color',
  textColor: '#your-text-color',
  backgroundColor: '#your-background-color'
};
```

### Event Handling

Each example demonstrates comprehensive event handling:

```javascript
// Message events
onMessageSent: (message) => {
  console.log('User sent:', message);
  // Your custom logic here
},

onMessageReceived: (message) => {
  console.log('Bot replied:', message);
  // Your custom logic here
},

// Widget events
onWidgetToggle: (isOpen) => {
  console.log('Widget toggled:', isOpen);
  // Your custom logic here
}
```

### Analytics Integration

All examples include analytics tracking:

```javascript
// Google Analytics example
function trackEvent(eventName, data) {
  if (window.gtag) {
    window.gtag('event', eventName, data);
  }
}

// Custom analytics service
function trackEvent(eventName, data) {
  fetch('/api/analytics', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ event: eventName, data })
  });
}
```

## 📊 Features Comparison

| Feature | React | Vue.js | Angular | Vanilla JS |
|---------|-------|--------|---------|------------|
| **State Management** | ✅ Hooks | ✅ Reactive | ✅ Services | ✅ Objects |
| **Type Safety** | ⚠️ PropTypes | ⚠️ Optional | ✅ TypeScript | ❌ None |
| **Bundle Size** | Medium | Small | Large | Minimal |
| **Learning Curve** | Medium | Easy | Hard | Easy |
| **Performance** | Good | Excellent | Good | Excellent |
| **Ecosystem** | Huge | Growing | Mature | Native |
| **Mobile Support** | ✅ | ✅ | ✅ | ✅ |
| **SEO Friendly** | ⚠️ SSR | ⚠️ SSR | ✅ Universal | ✅ Native |

## 🔍 Advanced Features

### 1. Real-time Analytics

All examples include comprehensive analytics:

- Message count tracking
- Response time measurement
- User engagement metrics
- Session duration tracking
- Performance monitoring

### 2. Data Persistence

Examples demonstrate different persistence strategies:

- **localStorage** - Client-side storage
- **sessionStorage** - Session-based storage
- **IndexedDB** - Advanced client-side database
- **Server sync** - Real-time synchronization

### 3. Accessibility Features

- **ARIA labels** - Screen reader support
- **Keyboard navigation** - Full keyboard accessibility
- **High contrast mode** - Visual accessibility
- **Reduced motion** - Motion sensitivity support
- **Focus management** - Proper focus handling

### 4. Performance Optimization

- **Lazy loading** - Component lazy loading
- **Virtual scrolling** - Large message lists
- **Debounced inputs** - Optimized user input
- **Memory management** - Proper cleanup
- **Bundle splitting** - Code splitting strategies

## 🧪 Testing

### Unit Testing

Each framework example includes testing patterns:

```javascript
// React Testing Library
import { render, screen, fireEvent } from '@testing-library/react';
import ChatbotWidget from './react-example';

test('renders chatbot widget', () => {
  render(<ChatbotWidget />);
  expect(screen.getByText('Chat with us')).toBeInTheDocument();
});

// Vue Test Utils
import { mount } from '@vue/test-utils';
import ChatbotWidget from './vue-example.vue';

test('renders chatbot widget', () => {
  const wrapper = mount(ChatbotWidget);
  expect(wrapper.text()).toContain('Chat with us');
});

// Angular Testing
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularExampleComponent } from './angular-example.component';

describe('AngularExampleComponent', () => {
  let component: AngularExampleComponent;
  let fixture: ComponentFixture<AngularExampleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AngularExampleComponent]
    });
    fixture = TestBed.createComponent(AngularExampleComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
```

### E2E Testing

```javascript
// Cypress example
describe('Chatbot Widget', () => {
  it('should open and close widget', () => {
    cy.visit('/chatbot-example');
    cy.get('[data-testid="chatbot-toggle"]').click();
    cy.get('[data-testid="chatbot-widget"]').should('be.visible');
    cy.get('[data-testid="chatbot-close"]').click();
    cy.get('[data-testid="chatbot-widget"]').should('not.be.visible');
  });

  it('should send and receive messages', () => {
    cy.visit('/chatbot-example');
    cy.get('[data-testid="chatbot-toggle"]').click();
    cy.get('[data-testid="message-input"]').type('Hello, world!');
    cy.get('[data-testid="send-button"]').click();
    cy.get('[data-testid="message-list"]').should('contain', 'Hello, world!');
  });
});
```

## 🚀 Deployment

### Production Checklist

- [ ] **Environment Variables** - Configure webhook URLs
- [ ] **Error Handling** - Implement proper error boundaries
- [ ] **Performance** - Optimize bundle size and loading
- [ ] **Security** - Validate and sanitize user inputs
- [ ] **Analytics** - Set up tracking and monitoring
- [ ] **Accessibility** - Test with screen readers
- [ ] **Mobile** - Test on various devices
- [ ] **Browser Support** - Test cross-browser compatibility

### CDN Deployment

```html
<!-- Include from CDN -->
<script src="https://cdn.example.com/chatbot-widget.min.js"></script>
<script>
  new ChatbotWidget({
    webhookUrl: 'https://your-webhook-url.com',
    // ... other config
  });
</script>
```

### NPM Package

```bash
# Install as npm package
npm install @your-org/chatbot-widget

# Use in your project
import ChatbotWidget from '@your-org/chatbot-widget';
```

## 🐛 Troubleshooting

### Common Issues

1. **Widget not appearing**
   - Check console for JavaScript errors
   - Verify webhook URL is accessible
   - Ensure proper CSS loading

2. **Voice recognition not working**
   - Requires HTTPS in production
   - Check browser permissions
   - Verify microphone access

3. **Messages not sending**
   - Check network connectivity
   - Verify webhook endpoint
   - Check CORS configuration

4. **Styling issues**
   - Check CSS conflicts
   - Verify theme configuration
   - Test responsive breakpoints

### Debug Mode

```javascript
// Enable debug mode
const widget = new ChatbotWidget({
  debug: true,
  // ... other config
});

// This will log detailed information to console
```

## 📚 Additional Resources

- **[Main Documentation](../EMBEDDING_GUIDE.md)** - Complete integration guide
- **[API Reference](../API.md)** - Detailed API documentation
- **[Changelog](../CHANGELOG.md)** - Version history and updates
- **[Contributing](../CONTRIBUTING.md)** - How to contribute
- **[License](../LICENSE)** - License information

## 💬 Support

Need help? Here are your options:

1. **Documentation** - Check the comprehensive guides
2. **Examples** - Review the example implementations
3. **Issues** - Report bugs or request features
4. **Discussions** - Ask questions and share ideas
5. **Email** - Contact support directly

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Report Bugs** - Found an issue? Let us know!
2. **Suggest Features** - Have an idea? We'd love to hear it!
3. **Submit PRs** - Code contributions are always welcome
4. **Improve Docs** - Help make our documentation better
5. **Share Examples** - Show us how you're using the widget

---

**Happy coding! 🎉**

If you build something awesome with our chatbot widget, we'd love to see it. Share your implementations and help grow our community of developers!