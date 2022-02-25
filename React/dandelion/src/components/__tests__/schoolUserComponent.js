import React from "react"
import renderer from "react-test-renderer"
import SchoolUserComponent from "../schoolUserComponent"


describe("Project", () => {
    let originalFetch;

    beforeEach(() => {
        originalFetch = global.fetch;
        global.fetch = jest.fn(() => Promise.resolve({
            json: () => Promise.resolve({
                    "id": 1,
                    "school_id": "GLA11",
                    "school_class": "Class 1C",
                    "lastSeen": "Online",
                    "status": "Active",
                    "project": "Kohl Rabi",
                    "experiment": "Size",
                    "description": "An investigation into the relationship between physical interactions with the environment and plant growth. When they are growing outside, the wind blows plants about. They may also be pushed or squashed by people or animals. We hypothesise that increased physical interactions encourage plants to develop stronger stems and to increase the concentration of characteristic chemicals leading to greater weight at harvest, brighter colours and stronger flavour.",
                    "hypotheses": "Null hypothesis - Physical interactions have no effect on plant growth. Higher strength - Increased physical interaction is positively correlated with stem strength. Increased weight - Increased physical interaction is positively correlated with plant weight at harvest.",
                    "variables": "Length (mm) - Vertical height of the plant measured from the substrate surface to the highest point without touching the plant. Plant weight (g) - Harvested weight of an individual plant excluding those parts below the surface of the substrate."
            })
        }));
    });

    afterEach(() => {
        global.fetch = originalFetch;
    });

    it("renders correctly", () => {
        const tree = renderer
            .create(<SchoolUserComponent/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

