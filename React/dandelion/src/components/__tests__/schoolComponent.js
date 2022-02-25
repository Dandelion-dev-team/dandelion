import React from "react"
import renderer from "react-test-renderer"
import SchoolComponent from "../schoolComponent"


describe("School", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                "id": "GLA11",
                "authority_id": "GLA12049",
                "name": "Glasgow High School",
                "address_line_1": "27 Ledcameroch Road",
                "address_line_2": "Bearsden",
                "town": "Glasgow",
                "postcode": "G61 4AE",
                "latitude": 55.917572,
                "longitude": -4.341889,
                "telephone": "+44 302382478",
                "email": "testemail@emailserver.com",
                "school_image_link": "https://2.bp.blogspot.com/-VWruKBvqgb8/Vw-evXkKmLI/AAAAAAAAAAw/r-cPriFMcREBJaMPnZSI6WAQRrl3sqRuwCLcB/s1600/The%2BHigh%2BSchool%2Bof%2BGlasgow.jpg",
                "status": "active",
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
            .create(<SchoolComponent />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

