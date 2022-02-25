import React from "react"
import renderer from "react-test-renderer"
import SideNav from "../sysSideNav"

describe("Project Card", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SideNav/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})