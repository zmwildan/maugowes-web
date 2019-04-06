import React from "react"

class Disqus extends React.Component {
  componentDidMount() {
    this.renderDisqus()
  }

  renderDisqus() {
    var disqus_config = function() {
      this.page.url = this.props.url // Replace PAGE_URL with your page's canonical URL variable
      this.page.identifier = this.props.identifier // Replace PAGE_IDENTIFIER with your page's unique identifier variable
    }
    console.log("render disqus", this.props.url, this.props.identifier)
    if (!window.DISQUS) {
      /**
       *  RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
       *  LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables*/
      ;(function() {
        // DON'T EDIT BELOW THIS LINE
        var d = document,
          s = d.createElement("script")
        s.src = "https://maugowes.disqus.com/embed.js"
        s.setAttribute("data-timestamp", +new Date())
        ;(d.head || d.body).appendChild(s)
      })()
    }
  }

  render() {
    return <div id="disqus_thread" />
  }
}



export default Disqus
