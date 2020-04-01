import Styled from "styled-components"

// redux
import {
  fetchBikeDetail,
  fetchBikeBrands,
  fetchBikeTypes
} from "../../../redux/bikes/actions"

const BikeFormStyled = Styled.div`

`

class BikeForm extends React.Component {
  static async getInitialProps({ reduxStore, res, query }) {
    return {
      id: query.id
    }
  }

  state = {
    id: this.props.id
  }

  render() {
    const { id } = this.state
    return <BikeFormStyled>siap siap saja</BikeFormStyled>
  }
}

export default BikeForm
