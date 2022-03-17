import React from "react"
import renderer from "react-test-renderer"
import userComponent from "../userComponent"


describe("Tags", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(
                {
                    "id": 1,
                    "school_id": "GLA11",
                    "username": "newnewname",
                    "password_hash": "newpassword",
                    "is_sysadmin": true,
                    "is_superuser": true,
                    "status": "active",
                    "notes": "Took away admin powers "
                },
                {
                    "id": 3,
                    "school_id": "GLA11",
                    "username": "brian",
                    "password_hash": "asd",
                    "is_sysadmin": false,
                    "is_superuser": true,
                    "status": "active",
                    "notes": " "
                }
            )
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<userComponent />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

