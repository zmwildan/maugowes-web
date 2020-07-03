export const progressBar = {
  start() {
    if (typeof window == "undefined") return false
    const el = document.getElementById("progress-bar")
    if (el) {
      el.style.width = "0"
      el.style.display = "block"
      setTimeout(() => {
        el.style.width = "10%"
        setTimeout(() => {
          el.style.width = "30%"
          setTimeout(() => {
            el.style.width = 70 + Math.random() * 3 + "%"
          }, 200)
        }, 200)
      }, 200)
    }
  },
  stop() {
    if (typeof window == "undefined") return false
    const el = document.getElementById("progress-bar")
    if (el) {
      setTimeout(() => {
        el.style.width = "100%"
        setTimeout(() => {
          el.style.display = "none"
          el.style.width = "0"
        }, 300)
      }, 200)
    }
  },
}
