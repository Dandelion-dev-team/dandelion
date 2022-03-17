import React from "react"
import renderer from "react-test-renderer"
import SchoolUserPane from "../schoolUserPane"


describe("Project", () => {
    let originalFetch;
    const testProp = { 'school_id': '1', 'school_class': 'Test class', 'project': '1', "description": "test desc", "experiment": "Experiment", "hypotheses": "Test hypotheses", "variables": "test variables" };

    it("renders correctly", () => {
        const tree = renderer
            .create(<SchoolUserPane dataProp={testProp}/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

