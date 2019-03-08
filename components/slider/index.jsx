import React, { Component } from "react"
import PropTypes from "prop-types"
import styled from "styled-components"

const SliderContainer = styled.div`
  position: relative;
  margin: 0 -8px !important;

  &.grid, .grid {
    margin: 0;
    padding : 0;
  }

  div.slider-items {
    width: 100%;
    display: -webkit-inline-box;
    transition: all 0.5s ease;
    overflow: hidden;
  }

  button {
    background: transparent;
    border: none;
  }

  .c-prev {
    position: absolute;
    cursor: pointer;
    top: 46%;
    left: 10px;
    z-index: 10;

    @media (max-width: 979px) {
      top: 41%;
    }

    /* img {
      height: 30px;
      width: 30px;
    } */
  }

  .c-next {
    position: absolute;
    cursor: pointer;
    top: 46%;
    right: 10px;
    z-index: 10;

    @media (max-width: 979px) {
      top: 41%;
    }

    /* img {
      height: 30px;
      width: 30px;
    } */
  }
`

const SliderDots = styled.ul`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: -35px;
  list-style: none;
  padding: 0;
  width: 100%;

  li {
    position: relative;
    display: inline-block;
    height: 20px;
    width: 20px;
    cursor: pointer;

    button {
      border: 0;
      background: 0 0;
      display: block;
      height: 20px;
      width: 20px;
      outline: 0;
      line-height: 0;
      font-size: 0;
      color: transparent;
      padding: 0;
      cursor: pointer;

      &:before {
        content: "";
        background-color: rgba(255, 255, 255, 0.75);
        border-radius: 50%;
        width: 8px;
        height: 8px;
        opacity: 1;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.72);
        position: absolute;
        top: 0;
        left: 0;
      }
    }
  }

  li.dots-active button:before {
    background-color: #7bb108 !important;
  }

  &.dots-landing li button:before {
    background-color: rgba(0, 0, 0, 0.2);
  }

  .landing-media.slick-dots {
    bottom: -20px !important;
    position: absolute;
    padding: 5px;
    margin-bottom: 0;
  }
`

class Slider extends Component {
  state = {
    active: 0,
    elSlider: null
  }

  static propTypes = {
    id: PropTypes.string,
    dots: PropTypes.bool,
    navigation: PropTypes.bool,
    infinite: PropTypes.bool,
    speed: PropTypes.number,
    slidesToShow: PropTypes.number,
    auto: PropTypes.bool
  }

  static defaultProps = {
    dots: false,
    navigation: false,
    navigationStyle: {},
    infinite: false,
    speed: 1000,
    slidesToShow: 2,
    id: "slider",
    auto: true,
    className: ""
  }

  componentDidMount() {
    this.setState({
      elSlider: document.querySelector(`#${this.props.id} .slider-items`)
    })
    this.elSlider = document.querySelector(`#${this.props.id} .slider-items`)
    if (this.props.auto) {
      this.sliderInterval = setInterval(() => {
        this.move("right")
      }, this.props.speed)
    }
  }

  componentWillUnmount() {
    clearInterval(this.sliderInterval)
  }

  move(target) {
    this.setState(
      {
        active: this.setActive(target)
      },
      () => {
        const width = this.getWidthChilds()
        this.state.elSlider.scroll({
          left: width * this.state.active,
          behavior: "smooth"
        })
      }
    )
  }

  setActive(scrollTarget) {
    const childCount = this.state.elSlider.childElementCount
    let { active } = this.state
    if (scrollTarget === "right") {
      if (active < childCount - 1) {
        active++
      } else {
        active = 0
      }
    } else {
      if (active > -1) {
        active--
      } else {
        active = childCount
      }
    }

    return active
  }

  getTotalChilds() {
    return this.elSlider.childElementCount
  }

  getWidthChilds() {
    let width = this.state.elSlider.offsetWidth

    return width
  }

  render() {
    return (
      <SliderContainer id={this.props.id} className={this.props.className}>
        {this.props.navigation ? (
          <a
            className="c-prev"
            href="javascript:;"
            onClick={() => this.move("left")}>
            <img src="/assets/img/icons/slick-arrow-prev.svg" alt="Sebangsa" />
          </a>
        ) : null}
        <div className="slider-items">{this.props.children}</div>
        {this.props.navigation ? (
          <a
            className="c-next"
            href="javascript:;"
            onClick={() => this.move("right")}>
            <img src="/assets/img/icons/slick-arrow-next.svg" alt="Sebangsa" />
          </a>
        ) : null}
        {this.props.dots && this.state.elSlider ? (
          <SliderDots
            style={this.props.navigationStyle}
            className={
              this.props.dots_type === "landing" ? "dots-landing" : ""
            }>
            {(() => {
              let Dots = []
              for (let n = 0; n < this.getTotalChilds(); n++) {
                Dots.push(
                  <li
                    key={n}
                    onClick={() => {
                      const oldActive = this.state.active
                      this.setState(
                        { active: this.state.active > n ? n + 1 : n - 1 },
                        () => {
                          // clearInterval(this.sliderInterval)
                          if (this.state.active > oldActive) this.move("right")
                          else this.move("left")
                        }
                      )
                    }}
                    className={this.state.active === n ? "dots-active" : ""}>
                    <button type="button" data-role="none" />
                  </li>
                )
              }
              return Dots
            })()}
          </SliderDots>
        ) : null}
      </SliderContainer>
    )
  }
}

export default Slider
