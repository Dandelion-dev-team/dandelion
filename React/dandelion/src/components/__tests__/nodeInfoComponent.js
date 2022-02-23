import React from "react"
import renderer from "react-test-renderer"
import NodeInfoComponent from "../nodeInfoComponent"


describe("Auth", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                node: {
                    "id": 1,
                    "school_id": "GLA11",
                    "growcube_code": "123.123.123",
                    "mac_address": "00:00:5e:00:53:af",
                    "last_communication_date": "2022-01-31T14:31:24.262Z",
                    "next_communication_expected": "2022-01-31T14:31:24.262Z",
                    "health_status": "online",
                    "status": "active",
                    "sensors": [
                        {
                            "id": 0,
                            "code": "LIQUID10212",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            "url": "https://gaslab.com/blogs/articles/what-is-a-liquid-level-sensor#:~:text=Liquid%20level%20sensors%2C%20also%20called,particular%20level%20in%20a%20container.",
                            "datasheet_link": "https://eu.mouser.com/c/ds/sensors/liquid-level-sensors/"
                        },
                        {
                            "id": 1,
                            "code": "TEMP1234",
                            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                            "url": "https://gaslab.com/blogs/articles/what-is-a-liquid-level-sensor#:~:text=Liquid%20level%20sensors%2C%20also%20called,particular%20level%20in%20a%20container.",
                            "datasheet_link": "https://eu.mouser.com/c/ds/sensors/liquid-level-sensors/"
                        }
                    ],
                    "alerts": {
                        "id": 0,
                        "node_id": {
                            "id": 0,
                            "last_communication_date": "2022-02-19T17:05:22.178Z",
                            "health_status": "green",
                            "status": "active"
                        },
                        "description": "string",
                        "created_date": "2022-02-19T17:05:22.178Z",
                        "updated_date": "2022-02-19T17:05:22.178Z",
                        "status": "active"
                    }

                }
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<NodeInfoComponent />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})