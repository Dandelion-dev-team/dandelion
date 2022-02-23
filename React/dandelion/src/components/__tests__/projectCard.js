import React from "react"
import renderer from "react-test-renderer"
import ProjectCard from "../projectCard"

describe("Project Card", () => {
  it("renders correctly", () => {
    const tree = renderer
      .create(<ProjectCard id={1} image={'testlink'} title={'Test Title'} description={"Test description"}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})