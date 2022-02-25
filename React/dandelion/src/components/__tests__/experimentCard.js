import React from "react"
import renderer from "react-test-renderer"
import ExperimentCard from "../experimentCard"

jest.mock("../../auth");

describe("Experiment Card", () => {
  it("renders correctly", () => {
    const testProp = { 'id': '1', 'project_image_link': 'testlink', 'title': 'Test Title', "description": "Test description" };
    const tree = renderer
      .create(<ExperimentCard dataProp={testProp}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})