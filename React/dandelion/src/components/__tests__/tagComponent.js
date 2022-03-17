import React from "react"
import renderer from "react-test-renderer"
import TagComponent from "../TagComponent"


describe("Tags", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(
                {
                    "id": 1,
                    "label": "Caulifowler",
                    "status": "Active"
                },
                {
                    "id": 2,
                    "label": "Kohl Rabi",
                    "status": "Not Started"
                })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<TagComponent />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

