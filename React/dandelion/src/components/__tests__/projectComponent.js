import React from "react"
import renderer from "react-test-renderer"
import ProjectComponent from "../projectComponent"


describe("Project", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                "projects": [
                    {
                      "id": 0,
                      "title": "Lemon Balm",
                      "owner": "GLA42012",
                      "type": "Internal",
                      "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                      "project_image_link": "https://cdn.britannica.com/77/124177-004-FEB6DB88/Balm-lemon-balm.jpg",
                      "project_text": "string",
                      "start_date": "2022-01-31T14:31:24.262Z",
                      "end_date": "2022-01-31T14:31:24.262Z",
                      "status": "active"
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
            .create(<ProjectComponent/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

