var c = (a, t) => () => (t || a((t = { exports: {} }).exports, t), t.exports);
var h = c((g, o) => {
  class i {
    constructor(t = {}) {
      this.options = {
        position: t.position || "top-right",
        maxToasts: t.maxToasts || 10,
        duration: t.duration || 3e3,
        containerClass: "toast-container"
      }, this.icons = {
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
      }, this.init();
    }
    init() {
      this.createContainer();
    }
    createContainer() {
      this.container = document.createElement("div"), this.container.className = this.options.containerClass, document.body.appendChild(this.container);
      const t = {
        "top-right": "top-4 right-4",
        "top-left": "top-4 left-4",
        "bottom-right": "bottom-4 right-4",
        "bottom-left": "bottom-4 left-4"
      };
      this.container.className = `fixed z-50 pointer-events-none ${t[this.options.position]}`;
    }
    getTypeWiseClass(t = "info") {
      const e = {
        bg: "bg-blue-100",
        text: "text-blue-800"
      };
      switch (t) {
        case "success":
          return e.bg = "bg-green-100", e.text = "text-green-800", e;
        case "error":
          return e.bg = "bg-red-100", e.text = "text-red-800", e;
        case "warning":
          return e.bg = "bg-yellow-100", e.text = "text-yellow-800", e;
        case "info":
          return e;
        default:
          return e;
      }
    }
    show(t, e = "info") {
      this.cleanOldToasts();
      const { bg: r, text: l } = this.getTypeWiseClass(e), s = document.createElement("div");
      return s.className = `toast flex items-center gap-2 mb-2 p-3 rounded-lg text-sm ${r} ${l}`, s.setAttribute("role", "alert"), s.setAttribute("aria-live", "polite"), s.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${this.icons[e]}</span>
      <div class="toast-content">${t}</div>
      <button class="toast-close text-white hover:text-opacity-100 transition-opacity duration-150" aria-label="Close">&times;</button>
      <div class="toast-progress bg-white bg-opacity-30 h-1 absolute bottom-0 left-0 w-full"></div>
    `, s.querySelector(".toast-close").addEventListener("click", () => this.remove(s)), this.container.appendChild(s), s.offsetHeight, setTimeout(() => this.remove(s), this.options.duration), s;
    }
    remove(t) {
      t.classList.add(
        "opacity-0",
        "translate-y-4",
        "transition",
        "duration-300"
      ), setTimeout(() => this.container.removeChild(t), 300);
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
  const n = new i();
  typeof o < "u" && o.exports ? o.exports = { ToastManager: i, toast: n } : (window.ToastManager = i, window.toast = n);
});
export default h();
