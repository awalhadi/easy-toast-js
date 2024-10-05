class ToastManager {
  constructor(t = {}) {
    (this.options = {
      position: t.position || "top-right",
      maxToasts: t.maxToasts || 10,
      duration: t.duration || 3e3,
      containerClass: "toast-container",
    }),
      (this.icons = {
        success:
          '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"/></svg>',
        error:
          '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M12 13.7C11.1 13.7 10.3 13 10.3 12C10.3 11.1 11 10.3 12 10.3C12.9 10.3 13.7 11 13.7 12C13.7 12.9 12.9 13.7 12 13.7M7.7 16.3C8.3 15.7 9.1 15.3 10 15.3H14C14.9 15.3 15.7 15.7 16.3 16.3L15.2 17.4C14.8 17 14.2 16.7 13.5 16.7H10.5C9.8 16.7 9.2 17 8.8 17.4L7.7 16.3M8.8 6.6L7.7 7.7C8.3 8.3 9.1 8.7 10 8.7H14C14.9 8.7 15.7 8.3 16.3 7.7L15.2 6.6C14.8 7 14.2 7.3 13.5 7.3H10.5C9.8 7.3 9.2 7 8.8 6.6Z"/></svg>',
        warning:
          '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2L1 21H23M12 6L19.53 19H4.47M11 10V14H13V10M11 16V18H13V16"/></svg>',
        info: '<svg viewBox="0 0 24 24" width="20" height="20"><path fill="currentColor" d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2M13 17H11V11H13V17M13 9H11V7H13V9Z"/></svg>',
        close:
          '<svg viewBox="0 0 24 24" width="18" height="18"><path fill="currentColor" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>',
      }),
      this.init();
  }
  init() {
    document.getElementById("toast-styles") || this.injectStyles(),
      this.createContainer();
  }
  createContainer() {
    (this.container = document.createElement("div")),
      (this.container.className = this.options.containerClass),
      document.body.appendChild(this.container);
    this.container.style.cssText = `\n      position:fixed;\n      z-index:9999;\n      pointer-events:none;\n      ${
      {
        "top-right": "top:1rem;right:1rem",
        "top-left": "top:1rem;left:1rem",
        "bottom-right": "bottom:1rem;right:1rem",
        "bottom-left": "bottom:1rem;left:1rem",
      }[this.options.position]
    }\n    `;
  }
  injectStyles() {
    const t = document.createElement("style");
    (t.id = "toast-styles"),
      (t.textContent =
        "\n      .toast-container{max-width:350px;width:100%}\n      .toast{\n        display:flex;\n        align-items:center;\n        gap:8px;\n        margin-bottom:0.5rem;\n        padding:0.80rem;\n        border-radius:0.375rem;\n        color:#fff;\n        font-family:system-ui,-apple-system,sans-serif;\n        font-size:0.875rem;\n        line-height:1.5;\n        pointer-events:auto;\n        position:relative;\n        overflow:hidden;\n        animation:toast-in .3s ease-in-out;\n        box-shadow:0 4px 6px -1px rgba(0,0,0,0.1),0 2px 4px -1px rgba(0,0,0,0.06);\n      }\n      .toast-content{flex-grow:1}\n      .toast-icon{flex-shrink:0}\n      .toast-close{\n        flex-shrink:0;\n        cursor:pointer;\n        opacity:0.7;\n        transition:opacity .15s ease;\n      }\n      .toast-close:hover{opacity:1}\n      .toast-progress{\n        position:absolute;\n        bottom:0;\n        left:0;\n        width:100%;\n        height:3px;\n        background-color:rgba(255,255,255,0.3);\n      }\n      .toast-progress-bar{\n        height:100%;\n        background-color:rgba(255,255,255,0.7);\n        animation:toast-progress .5s linear infinite;\n      }\n      .toast-success{background-color:#38d207}\n      .toast-error{background-color:#e82004}\n      .toast-warning{background-color:#e8d704}\n      .toast-info{background-color:#2563EB}\n      @keyframes toast-in{\n        from{transform:translateY(100%);opacity:0}\n        to{transform:translateY(0);opacity:1}\n      }\n    "),
      document.head.appendChild(t);
  }
  show(t, o = "info") {
    this.cleanOldToasts();
    const e = document.createElement("div");
    (e.className = `toast toast-${o}`),
      e.setAttribute("role", "alert"),
      e.setAttribute("aria-live", "polite"),
      (e.innerHTML = `\n      <span class="toast-icon" aria-hidden="true">${this.icons[o]}</span>\n      <div class="toast-content">${t}</div>\n      <button class="toast-close" aria-label="Close">${this.icons.close}</button>\n      <div class="toast-progress">\n        <div class="toast-progress-bar"></div>\n      </div>\n    `);
    e.querySelector(".toast-close").addEventListener("click", () =>
      this.remove(e)
    );
    const n = e.querySelector(".toast-progress-bar");
    (n.style.transition = `width ${this.options.duration}ms linear`),
      this.container.appendChild(e),
      e.offsetHeight,
      (n.style.width = "0%");
    const s = setTimeout(() => this.remove(e), this.options.duration);
    return (
      e.addEventListener("mouseenter", () => {
        clearTimeout(s), (n.style.transitionProperty = "none");
      }),
      e.addEventListener("mouseleave", () => {
        (n.style.transitionProperty = "width"),
          (n.style.width = "0%"),
          setTimeout(() => this.remove(e), this.options.duration);
      }),
      e
    );
  }
  remove(t) {
    (t.style.opacity = "0"),
      (t.style.transform = "translateY(100%)"),
      (t.style.transition = "all 0.3s ease-out"),
      setTimeout(() => this.container.removeChild(t), 300);
  }
  cleanOldToasts() {
    for (; this.container.children.length >= this.options.maxToasts; )
      this.container.removeChild(this.container.firstChild);
  }
  success(t) {
    return this.show(t, "success");
  }
  error(t) {
    return this.show(t, "error");
  }
  warning(t) {
    return this.show(t, "warning");
  }
  info(t) {
    return this.show(t, "info");
  }
}
const toast = new ToastManager();
"undefined" != typeof module && module.exports
  ? (module.exports = { ToastManager: ToastManager, toast: toast })
  : ((window.ToastManager = ToastManager), (window.toast = toast));
