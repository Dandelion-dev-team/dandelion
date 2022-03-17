import React from "react"
import renderer from "react-test-renderer"
import QuantityComponent from "../quantityComponent"


describe("Quantity", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                "quantities": [
                    {
                      "id": 0,
                      "name": "Temperature",
                      "unit": "ºC",
                      "help_url": "https://en.wikipedia.org/wiki/Celsius"
                    },
                    {
                      "id": 1,
                      "name": "Humidity",
                      "unit": "%",
                      "help_url": "https://en.wikipedia.org/wiki/Humidity"
                    }
                  ],
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<QuantityComponent/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

