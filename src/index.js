/**
 * Lightweight, accessible toast notification library
 * @version 1.1.0
 */
class ToastManager {
  constructor(options = {}) {
    this.options = {
      position: options.position || "top-right",
      maxToasts: options.maxToasts || 10,
      duration: options.duration || 3000,
      containerClass: "toast-container",
    };

    this.icons = {
      success:
        '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/></svg>',
      error:
        '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 13.7C11.1 13.7 10.3 13 10.3 12C10.3 11.1 11 10.3 12 10.3C12.9 10.3 13.7 11 13.7 12C13.7 12.9 12.9 13.7 12 13.7M7.7 16.3C8.3 15.7 9.1 15.3 10 15.3H14C14.9 15.3 15.7 15.7 16.3 16.3L15.2 17.4C14.8 17 14.2 16.7 13.5 16.7H10.5C9.8 16.7 9.2 17 8.8 17.4L7.7 16.3M8.8 6.6L7.7 7.7C8.3 8.3 9.1 8.7 10 8.7H14C14.9 8.7 15.7 8.3 16.3 7.7L15.2 6.6C14.8 7 14.2 7.3 13.5 7.3H10.5C9.8 7.3 9.2 7 8.8 6.6Z"/></svg>',
      warning:
        '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2L1 21H23M12 6L19.53 19H4.47M11 10V14H13V10M11 16V18H13V16"/></svg>',
      info: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M13 17H11V11H13V17M13 9H11V7H13V9Z"/></svg>',
      close:
        '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',
    };

    this.init();
  }

  init() {
    if (!document.getElementById("toast-styles")) {
      this.injectStyles();
    }
    this.createContainer();
  }

  createContainer() {
    this.container = document.createElement("div");
    this.container.className = this.options.containerClass;
    document.body.appendChild(this.container);

    const positions = {
      "top-right": "top:1rem;right:1rem",
      "top-left": "top:1rem;left:1rem",
      "bottom-right": "bottom:1rem;right:1rem",
      "bottom-left": "bottom:1rem;left:1rem",
    };

    this.container.style.cssText = `
      position:fixed;
      z-index:9999;
      pointer-events:none;
      ${positions[this.options.position]}
    `;
  }

  injectStyles() {
    const style = document.createElement("style");
    style.id = "toast-styles";
    style.textContent = `
      .toast-container{max-width:350px;width:100%}
      .toast{
        display:flex;
        align-items:center;
        gap:8px;
        margin-bottom:0.5rem;
        padding:0.80rem;
        border-radius:0.375rem;
        color:#fff;
        font-family:system-ui,-apple-system,sans-serif;
        font-size:0.875rem;
        line-height:1.5;
        pointer-events:auto;
        position:relative;
        overflow:hidden;
        animation:toast-in .3s ease-in-out;
        box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);
      }
      .toast-content{flex-grow:1}
      .toast-icon{flex-shrink:0}
      .toast-close{
        flex-shrink:0;
        cursor:pointer;
        opacity:0.7;
        transition:opacity .15s ease;
      }
      .toast-close:hover{opacity:1}
      .toast-progress{
        position:absolute;
        bottom:0;
        left:0;
        width:100%;
        height:3px;
        background-color:rgba(255,255,255,0.3);
      }
      .toast-progress-bar{
        height:100%;
        background-color:rgba(255,255,255,0.7);
        animation:toast-progress .5s linear infinite;
      }
      .toast-success{background-color:#38d207}
      .toast-error{background-color:#e82004}
      .toast-warning{background-color:#e8d704}
      .toast-info{background-color:#2563EB}
      @keyframes toast-in{
        from{transform:translateY(100%);opacity:0}
        to{transform:translateY(0);opacity:1}
      }
    `;
    document.head.appendChild(style);
  }

  show(message, type = "info") {
    this.cleanOldToasts();

    const toast = document.createElement("div");
    toast.className = `toast toast-${type}`;
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "polite");

    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${this.icons[type]}</span>
      <div class="toast-content">${message}</div>
      <button class="toast-close" aria-label="Close">${this.icons.close}</button>
      <div class="toast-progress">
        <div class="toast-progress-bar"></div>
      </div>
    `;

    const closeBtn = toast.querySelector(".toast-close");
    closeBtn.addEventListener("click", () => this.remove(toast));

    const progressBar = toast.querySelector(".toast-progress-bar");
    progressBar.style.transition = `width ${this.options.duration}ms linear`;

    this.container.appendChild(toast);

    // Trigger reflow for animation
    void toast.offsetHeight;

    progressBar.style.width = "0%";

    const timeoutId = setTimeout(
      () => this.remove(toast),
      this.options.duration
    );

    toast.addEventListener("mouseenter", () => {
      clearTimeout(timeoutId);
      progressBar.style.transitionProperty = "none";
    });

    toast.addEventListener("mouseleave", () => {
      progressBar.style.transitionProperty = "width";
      progressBar.style.width = "0%";
      setTimeout(() => this.remove(toast), this.options.duration);
    });

    return toast;
  }

  remove(toast) {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(100%)";
    toast.style.transition = "all 0.3s ease-out";
    setTimeout(() => this.container.removeChild(toast), 300);
  }

  cleanOldToasts() {
    while (this.container.children.length >= this.options.maxToasts) {
      this.container.removeChild(this.container.firstChild);
    }
  }

  success(message) {
    return this.show(message, "success");
  }
  error(message) {
    return this.show(message, "error");
  }
  warning(message) {
    return this.show(message, "warning");
  }
  info(message) {
    return this.show(message, "info");
  }
}

// Create default instance
const toast = new ToastManager();

// Export both class and default instance
if (typeof module !== "undefined" && module.exports) {
  module.exports = { ToastManager, toast };
} else {
  window.ToastManager = ToastManager;
  window.toast = toast;
}
