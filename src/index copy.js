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
      success: `<svg viewBox="0 0 24 24" class="text-green-600 w-5 h-5 mr-3">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z">
            </path>
        </svg>`,
      error: `<svg viewBox="0 0 24 24" class="text-red-600 w-5 h-5 mr-3">
            <path fill="currentColor"
                d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z">
            </path>
        </svg>`,
      warning: `<svg viewBox="0 0 24 24" class="text-yellow-600 w-5 h-5 mr-3">
            <path fill="currentColor"
                d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z">
            </path>
        </svg>`,
      info: `<svg viewBox="0 0 24 24" class="text-blue-600 w-5 h-5 mr-3">
            <path fill="currentColor"
                d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z">
            </path>
        </svg>`,
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

  getTypeWiseClass(type = "info") {
    const styleClass = {
      bg: "blue-200",
      text: "blue-800",
    };
    switch (type) {
      case "success":
        styleClass.bg = "green-200";
        styleClass.text = "green-800";
        return styleClass;
      case "error":
        styleClass.bg = "red-200";
        styleClass.text = "red-800";
        return styleClass;
      case "warning":
        styleClass.bg = "orange-200";
        styleClass.text = "yellow-800";
        return styleClass;
      case "info":
        return styleClass;
      default:
        return styleClass;
    }
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

    //======================= backup running toasts code=================>
    // const toast = document.createElement("div");
    // toast.className = `toast toast-${type}`;
    // toast.setAttribute("role", "alert");
    // toast.setAttribute("aria-live", "polite");

    // toast.innerHTML = `
    //   <span class="toast-icon" aria-hidden="true">${this.icons[type]}</span>
    //   <div class="toast-content">${message}</div>
    //   <button class="toast-close" aria-label="Close">${this.icons.close}</button>
    //   <div class="toast-progress">
    //     <div class="toast-progress-bar"></div>
    //   </div>
    // `;

    // const closeBtn = toast.querySelector(".toast-close");
    // closeBtn.addEventListener("click", () => this.remove(toast));

    // const progressBar = toast.querySelector(".toast-progress-bar");
    // progressBar.style.transition = `width ${this.options.duration}ms linear`;

    // this.container.appendChild(toast);

    // // Trigger reflow for animation
    // void toast.offsetHeight;

    // progressBar.style.width = "0%";

    // const timeoutId = setTimeout(
    //   () => this.remove(toast),
    //   this.options.duration
    // );

    // toast.addEventListener("mouseenter", () => {
    //   clearTimeout(timeoutId);
    //   progressBar.style.transitionProperty = "none";
    // });

    // toast.addEventListener("mouseleave", () => {
    //   progressBar.style.transitionProperty = "width";
    //   progressBar.style.width = "0%";
    //   setTimeout(() => this.remove(toast), this.options.duration);
    // });

    //======================= backup running toasts code=================>

    return toast;
  }

  remove(toast) {
    toast.style.opacity = "0";
    toast.style.transform = "translateY(100%)";
    toast.style.transition = "all 0.3s ease-out";
    // setTimeout(() => this.container.removeChild(toast), 300);
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
