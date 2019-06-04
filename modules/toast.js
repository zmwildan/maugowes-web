export default (show = true, html, type = "success", autoclose = true) => {
  const ToastEl = document.getElementById("mg-toast")
  if (show) {
    ToastEl.innerHTML = html
    ToastEl.style.bottom = "20px"
    ToastEl.onclick = function() { return ToastEl.style.bottom = "-100px" }
  } else {
    return ToastEl.style.bottom = "-100px"
  }
  if (autoclose && show)
    setTimeout(() => {
      ToastEl.style.bottom = "-100px"
    }, 2500)
}
