import Styled from "styled-components"
import Link from "next/link"

const BreadcrumbStyled = Styled.div`
  text-align: center;
  &.breadcrumb {
    .breadcrumb-child {
      color: blue;
    }
  }
`

const Breadcrumb = (props) => {
  const BreadcrumbChild = [
    {
      link: "/bikes",
      title: "Bikes",
    },
    {
      link: "/bikes/builder",
      title: "Bikes Builder",
    },
  ]

  return (
    <BreadcrumbStyled className="breadcrumb">
      {BreadcrumbChild.map((n, key) => (
        <div class="breadcrumb-child">
          <Link>{n.title}</Link>
          {n.length > key - 1 ? ">" : null}
        </div>
      ))}
    </BreadcrumbStyled>
  )
}

export default Breadcrumb
