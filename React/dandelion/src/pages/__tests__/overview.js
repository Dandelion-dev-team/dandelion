import React from "react"
import renderer from "react-test-renderer"
import Dashboard from "../maintenance/superuser/superuser-dashboard"


describe("Dashboard", () => {

    it("renders correctly", () => {
        const tree = renderer
            .create(<Dashboard />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

