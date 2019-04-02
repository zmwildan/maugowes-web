import Styled from "styled-components"
import {connect} from "react-redux"
import GlobalLayout from "../../components/layouts/Global"
import DefaultLayout from "../../components/layouts/Default"
import Header from "../../components/boxs/FullWidthHeader"
import VideoBox from "../../components/boxs/VideoBox"

import config from "../../config/index"
import fetch from "isomorphic-unfetch"

const BlogStyled = Styled.div`
  
`

class VideosPage extends React.Component {
  static async getInitialProps() {
    const videosResponse = await fetch(`${config[process.env.NODE_ENV].host}/api/videos`)
    const videos = await videosResponse.json()
    return { videos }
  }

  state = {
    isLoading: false
  }

  loadmoreHandler() {
    if(!this.state.isLoading) {
      console.log("load more content...")
      this.setState({
        isLoading: true
      })
    }
  }

  render() {
    const { videos } = this.props
    console.log(this.props)
    return (
      <GlobalLayout>
        <DefaultLayout>
          <BlogStyled>
            <Header
              title="Mau Gowes Video"
              text="Nikmati tontonan Dari Mau Gowes. Semoga kamu semakin termotivasi setelah menonton ini ya."
              backgroundImage="/static/images/background/bg-bike-store.jpg"
            />
            <VideoBox
              data={videos}
              isLoading={this.state.isLoading}
              loadmoreHandler={() => this.loadmoreHandler()}
              noHeaderTitle
            />
          </BlogStyled>
        </DefaultLayout>
      </GlobalLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    videosStore: state.Videos
  }
}

export default connect(mapStateToProps)(VideosPage)