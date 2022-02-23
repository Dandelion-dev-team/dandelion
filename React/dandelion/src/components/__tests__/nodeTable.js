import React from "react"
import renderer from "react-test-renderer"
import NodeTable from "../nodeTable"


describe("Node Table", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                "nodes": {
                    "id": 1,
                    "last_communication_date": "2022-02-18T13:07:39.231Z",
                    "health_status": "green",
                    "status": "active"
                  }
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<NodeTable/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

