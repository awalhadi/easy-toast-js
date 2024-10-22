# Toast Notification Library Documentation

A robust, object-oriented toast notification library with zero dependencies.

## Features

- 🎨 Four pre-styled types: success, error, warning, info
- ⚙️ Customizable options
- 🔄 Queue management for multiple toasts
- 🖱️ Click to dismiss
- 📱 Responsive and mobile-friendly
- 🔥 No dependencies
- 📝 TypeScript-friendly

## Quick Start

## Installation

you can ins directly in html and also initial npm package

### NPM installation

```js
npm i easy-toast-js
```

### 1. Include the Script

```html
<script src="
https://cdn.jsdelivr.net/npm/easy-toast-js@2.0.13/dist/easyToast.min.js
"></script>
```

- If not install Tailwind Css then add `easy-toast.min.css` or `import easy-toast.min.css`

### 2. Basic Usage

```javascript
// when install throw npm import like below
import { toast } from "easy-toast-js";

// Use the default instance
toast.success("Operation successful!");
toast.error("Something went wrong");
toast.warning("Be careful");
toast.info("Did you know?");

// Or create a custom instance
const myToast = new ToastManager({
  position: "bottom-right",
  maxToasts: 5,
});
myToast.show("Custom toast!");
```

## API Reference

### ToastManager Class

#### Constructor Options

```javascript
const options = {
  position: "top-right", // 'top-right', 'top-left', 'bottom-right', 'bottom-left'
  maxToasts: 3, // Maximum number of toasts shown at once
  animationDuration: 300, // Animation duration in milliseconds
  defaultDuration: 3000, // Default display duration
  containerClass: "toast-container", // CSS class for the container
};

const toastManager = new ToastManager(options);
```

#### Methods

##### show(message, type, duration)

Shows a toast notification.

- `message` (string): The message to display
- `type` (string, optional): 'success', 'error', 'warning', or 'info'. Default: 'info'
- `duration` (number, optional): Time in milliseconds. Default: 3000
- Returns: `{ element, removalPromise }`

##### success(message, duration)

Shows a success toast.

- `message` (string): The success message
- `duration` (number, optional): Custom duration

##### error(message, duration)

Shows an error toast.

- `message` (string): The error message
- `duration` (number, optional): Custom duration

##### warning(message, duration)

Shows a warning toast.

- `message` (string): The warning message
- `duration` (number, optional): Custom duration

##### info(message, duration)

Shows an info toast.

- `message` (string): The info message
- `duration` (number, optional): Custom duration

## Advanced Usage

### Custom Instance

```javascript
const customToast = new ToastManager({
  position: "bottom-left",
  maxToasts: 5,
  defaultDuration: 5000,
});

customToast.success("Custom positioned toast!");
```

### Promise-based Usage

```javascript
async function showSequentialToasts() {
  await toast.success("First toast").removalPromise;
  await toast.info("Second toast").removalPromise;
  console.log("All toasts have been shown and dismissed");
}
```

### TypeScript Support

```typescript
interface ToastOptions {
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  maxToasts?: number;
  animationDuration?: number;
  defaultDuration?: number;
  containerClass?: string;
}

declare class ToastManager {
  constructor(options?: ToastOptions);
  show(message: string, type?: string, duration?: number): ToastResult;
  success(message: string, duration?: number): ToastResult;
  error(message: string, duration?: number): ToastResult;
  warning(message: string, duration?: number): ToastResult;
  info(message: string, duration?: number): ToastResult;
}

interface ToastResult {
  element: HTMLElement;
  removalPromise: Promise<void>;
}

declare const toast: ToastManager;
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Examples

### Basic Usage

```javascript
toast.success("File uploaded successfully!");
toast.error("Failed to save changes");
```

### Custom Duration

```javascript
toast.warning("Server maintenance in 5 minutes", 10000);
```

### Sequential Toasts

```javascript
async function processForm() {
  await toast.info("Validating...").removalPromise;
  await toast.info("Sending data...").removalPromise;
  toast.success("Form submitted!");
}
```
