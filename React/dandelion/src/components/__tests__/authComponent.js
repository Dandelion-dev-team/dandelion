import React from "react"
import renderer from "react-test-renderer"
import AuthComponent from "../authComponent"


describe("Auth", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                authorities: [
                    {
                        "id": "FLK",
                        "name": "Stirlingshire",
                        "telephone": "07464787634",
                        "email": "stirling@authority.com"
                    },
                    {
                        "id": "GLA",
                        "name": "Glasgow",
                        "telephone": "07424387634",
                        "email": "glasgow@authority.com"
                    }
                ]
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<AuthComponent/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})