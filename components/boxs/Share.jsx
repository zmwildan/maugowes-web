import Styled from "styled-components"

const ShareBoxStyled = Styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0;
    .box-share-title {
        margin-right: 20px;
    }
    .box-share-link {
        margin-right: 5px;
    }
`

export default ({ url }) => (
  <ShareBoxStyled className="share-box">
    <strong className="box-share-title">Bagikan ke: </strong>
    <br />
    {/* facebook share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${url}`,
          "Share Mau Gowes ke Facebook",
          "width=600,height=400"
        )
      }}>
      <img
        src="https://img.icons8.com/color/48/000000/facebook.png"
        alt="share ke Facebook"
      />
    </a>
    {/* end of facebook share */}

    {/* twitter share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://twitter.com/intent/tweet?status=${url}`,
          "Share Mau Gowes ke Twitter",
          "width=600,height=400"
        )
      }}>
      <img
        src="https://img.icons8.com/color/48/000000/twitter.png"
        alt="share ke Twitter"
      />
    </a>
    {/* end if twiter share */}

    {/* linkedin share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://www.linkedin.com/shareArticle?mini=true&url=${url}`,
          "Share Mau Gowes ke Linkedin",
          "width=600,height=400"
        )
      }}>
      <img
        style={{ width: 48 }}
        src="https://img.icons8.com/color/48/000000/linkedin.png"
        alt="share ke Linkedin"
      />
    </a>
    {/* end of linkedin share */}

    {/* sebangsa share */}
    <a
      className="box-share-link"
      href="javascript:;"
      onClick={() => {
        window.open(
          `https://sebangsa.com/post/create?text=${url}`,
          "Share Mau Gowes ke Sebangsa",
          "width=600,height=400"
        )
      }}>
      <img
        style={{ width: 48 }}
        src="https://sebangsanetwork.com/wp-content/uploads/2018/08/logo-green.svg"
        alt="share ke Sebangsa"
      />
    </a>
    {/* end of sebangsa share */}
  </ShareBoxStyled>
)
