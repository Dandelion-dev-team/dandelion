import React from "react"
import renderer from "react-test-renderer"
import SideNav from "../sideNav"

describe("Project Card", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<SideNav/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})