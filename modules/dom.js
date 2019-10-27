export function pushScript(src, args = {}) {
  if (!isScriptLoaded(src)) {
    const s = document.createElement("script")
    s.setAttribute("src", src)
    
    if (args.id) s.setAttribute("id", args.id)
    if (typeof args.integrity !== "undefined") s.integrity = args.integrity
    if (typeof args.crossorigin !== "undefined") s.setAttribute("crossorigin", args.crossorigin )
    if (args.cb) s.onload = args.cb
    
    return document.body.appendChild(s)
  }
}

export function pushStyle(href, args = {}) {
  if (!isStyleLoaded(href)) {
    const s = document.createElement("link")
    s.setAttribute("href", href)
    s.setAttribute("type", "text/css")
    s.setAttribute("rel", "stylesheet")

    if (typeof args.integrity !== "undefined") s.integrity = args.integrity
    if (typeof args.crossorigin !== "undefined") s.setAttribute("crossorigin", args.crossorigin )
    
    return document.body.appendChild(s)
  }
}

function isScriptLoaded(src) {
  const scripts = document.getElementsByTagName("script")
  // is script available
  for (let i = scripts.length; i--; ) {
    if (scripts[i].src == src) return true
  }

  return false
}

function isStyleLoaded(href) {
  const links = document.getElementsByTagName("link")
  // is style available
  for (let i = links.length; i--; ) {
    if (links[i].href == href) return true
  }

  return false
}
