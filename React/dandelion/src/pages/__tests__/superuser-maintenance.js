import React from "react"
import renderer from "react-test-renderer"

import superUser from "../superuser-maintenance"

jest.mock("../../auth");
jest.mock("../superuser-maintenance");


describe("Superuser Maintenance", () => {
  it("renders correctly", () => {
    const tree = renderer
    .create(<superUser />)
    .toJSON()
  expect(tree).toMatchSnapshot()
  })
})