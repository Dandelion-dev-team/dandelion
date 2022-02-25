import React from "react"
import renderer from "react-test-renderer"
import ProjectPane from "../projectPane"

describe("Project Card", () => {
  it("renders correctly", () => {
    const testProp = { 'id': '1', 'title': 'Test Title', "start_date": "2022-02-22T00:08:17.028Z", "end_date": "2022-02-22T00:08:17.028Z", "partner": "Test school", "project_image_link": "test link" };
    const tree = renderer
      .create(<ProjectPane dataProp={testProp}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})