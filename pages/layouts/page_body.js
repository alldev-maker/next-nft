
import React from "react"
import Link from "next/link"
import { Nav, PageBody } from "../styles"

const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <div>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/page-two">
          <a>Page 2</a>
        </Link>
      </div>
      
    </React.Fragment>
  )
}

export default Layout