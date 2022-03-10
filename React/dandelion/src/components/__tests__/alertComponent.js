import React from "react"
import renderer from "react-test-renderer"
import AlertComponent from "../alertComponent"

describe("Alert", () => {
  it("renders correctly", () => {
    const testProp = { 'id': '1', 'description': 'Test', 'updated_date': '2022-02-19T17:05:22.178Z', "status": "amber" };
    const tree = renderer
      .create(<AlertComponent alert={testProp}/>)
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})