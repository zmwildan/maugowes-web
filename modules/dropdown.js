export default function dropdown() {
  // var elements = document.getElementsByClassName("dropdown-btn")
  var dropdowns = document.getElementsByClassName("dropdown-content")

  // close all button if html click
  window.onclick = function(event) {
    if (event.target.className.indexOf("no-close") < 0) {
      if (!event.target.matches(".dropdown-btn")) {
        var target = event.target
        var parent = target.parentNode
        if (
          parent &&
          parent.className &&
          parent.className.indexOf("dropdown-btn") >= 0
        ) {
          showDropdown(parent, dropdowns)
        } else if (event.target.matches(".dropdown-btn-close")) {
          closeDropdown()
        } else {
          if (
            !event.target.closest(".no-close") ||
            (event.target.closest(".no-close") &&
              event.target.closest(".no-close").className.indexOf("no-close") <
                0)
          ) {
            closeDropdown()
          }
        }
      } else {
        showDropdown(event.target, dropdowns)
      }
    }
  }
}

function showDropdown(target, dropdowns) {
  var current = target.parentNode
  removeAllActive()
  if (current.className.indexOf("accept-active") >= 0) {
    var className = current.className
    current.className = `js-active ${className}`
  }
  // close all button if  dropdown click
  var child = []
  for (var i = 0; i < current.childNodes.length; i++) {
    if (current.childNodes[i].className.indexOf("dropdown-content") >= 0) {
      child[i] = current.childNodes[i].style.display
    }
  }
  for (i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i]
    openDropdown.style.display = "none"
  }

  //show dropdown by content
  for (var i = 0; i < current.childNodes.length; i++) {
    if (current.childNodes[i].className.indexOf("dropdown-content") >= 0) {
      if (child[i] === "none" || child[i] === "") {
        current.childNodes[i].style.display = "block"
      } else {
        current.childNodes[i].style.display = "none"
      }
      break
    }
  }
}

// function to close dropdown
export function closeDropdown(targetId = "") {
  removeAllActive()
  if (targetId) {
    document.getElementById(targetId).style.display = "none"
  } else {
    var dropdowns = document.getElementsByClassName("dropdown-content")
    var i
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i]
      openDropdown.style.display = "none"
    }
  }
}

function removeAllActive() {
  //remove all js-active
  var allDropdowns = document.getElementsByClassName("dropdown")
  var x
  for (x = 0; x < allDropdowns.length; x++) {
    allDropdowns[x].classList.remove("js-active")
  }
}
