import React from "react"
import renderer from "react-test-renderer"
import SensorComponent from "../sensorComponent"


describe("Sensor", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve(
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
            )
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<SensorComponent />)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

