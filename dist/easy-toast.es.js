var u = (h, t) => () => (t || h((t = { exports: {} }).exports, t), t.exports);
var g = u((d, r) => {
  /**
   * Lightweight, accessible toast notification library
   * @version 2.0.1
   * @author awalhadi
   * @license MIT
   * @see https://github.com/awalhadi/easy-toast-js
   * @see https://portfolio.awalhadi.vercel.app
   *
   */
  class n {
    constructor(t = {}) {
      this.options = {
        position: (t == null ? void 0 : t.position) || "top-right",
        maxToasts: (t == null ? void 0 : t.maxToasts) || 8,
        duration: t.duration || 3e3,
        containerClass: (t == null ? void 0 : t.containerClass) || "toast-container",
        icon: (t == null ? void 0 : t.icon) || this.getIcon
      }, this.icons = this.getIcons(), this.toastQueue = [], this.init();
    }
    init() {
      this.createContainer();
    }
    /**
     * Create the container element to hold all toast notifications.
     * Will set the class to `this.options.containerClass` and append it to the body.
     * Then sets the position of the container to `this.options.position` by calling {@link setPosition}.
     * @returns {HTMLElement} The container element created.
     */
    createContainer() {
      this.container = document.createElement("div"), document.body.appendChild(this.container), this.setPosition(this.options.position);
    }
    /**
     * Sets the position of the container element by updating its className.
     * The allowed positions are:
     * - top-right
     * - top-left
     * - top-center
     * - bottom-right
     * - bottom-left
     * - bottom-center
     * @param {string} [position="top-right"] The position to set the container element to.
     * @returns {void}
     */
    setPosition(t = "top-right") {
      const e = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2"
      };
      this.container.className = `fixed z-50 pointer-events-none ${e[t]}`;
    }
    /**
     * Gets the SVG icon based on the status type.
     * @param {string} [statusType="info"] The status type to get the icon for.
     * @returns {string} The SVG icon for the given status type.
     */
    getIcon(t = "info") {
      return {
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
        </svg>`
      }[t];
    }
    /**
     * Get the icons for different status types.
     * @returns {Object.<string, string>} An object with the keys "success", "error", "warning", and "info" mapped to their respective SVG icons.
     */
    getIcons() {
      return {
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
        </svg>`
      };
    }
    show(t, e = "info") {
      this.cleanOldToasts();
      const a = this.getToastTheme(e), s = this.createToastElement(t, e, a);
      return this.setupToastEvents(s), this.container.appendChild(s), this.toastQueue.push(s), s;
    }
    // create toast element
    createToastElement(t, e, a) {
      const s = document.createElement("div"), { bg: i, text: o } = a, c = this.getIcon(e);
      return s.className = `toast flex items-center gap-2 mb-2 p-3 rounded-lg text-sm ${i} ${o} pointer-events-auto`, s.setAttribute("role", "alert"), s.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${c || ""}</span>
      <div class="toast-content">${t}</div>
      <button class="toast-close text-white hover:text-opacity-100 transition-opacity duration-150" aria-label="Close">&times;</button>
      <div class="toast-progress bg-white bg-opacity-30 h-1 absolute bottom-0 left-0 w-full"></div>
    `, s;
    }
    // setup events listener
    setupToastEvents(t) {
      const e = t.querySelector(".toast-close");
      let a;
      const s = () => {
        a = setTimeout(() => {
          this.removeToast(t);
        }, this.options.duration);
      }, i = () => {
        clearTimeout(a);
      };
      s(), t.addEventListener("click", (o) => {
        o.target === e ? (o.stopPropagation(), this.removeToast(t)) : (o.target === t || o.target.closest(".toast")) && this.removeToast(t);
      }), t.addEventListener("mouseenter", i), t.addEventListener("mouseleave", s);
    }
    // remove toast
    removeToast(t) {
      this.container.removeChild(t), this.toastQueue = this.toastQueue.filter((e) => e !== t);
    }
    // clean old toast if max limit is reached
    cleanOldToasts() {
      if (this.toastQueue.length >= this.options.maxToasts) {
        const t = this.toastQueue.shift();
        this.removeToast(t);
      }
    }
    // Get type-specific classes for toast background and text
    getToastTheme(t) {
      const e = {
        success: { bg: "bg-green-100", text: "text-green-800" },
        error: { bg: "bg-red-100", text: "text-red-800" },
        warning: { bg: "bg-orange-100", text: "text-yellow-800" },
        info: { bg: "bg-blue-100", text: "text-blue-800" }
      };
      return e[t] || e.info;
    }
    // easy toast trigger methods
    success(t = "") {
      if (t)
        return this.show(t, "success");
    }
    error(t = "") {
      if (t)
        return this.show(t, "error");
    }
    warning(t = "") {
      if (t)
        return this.show(t, "warning");
    }
    info(t = "") {
      if (t)
        return this.show(t, "info");
    }
  }
  const l = new n();
  typeof r < "u" && r.exports ? r.exports = { toast: l, ToastManager: n } : (window.ToastManager = n, window.toast = l);
});
export default g();
