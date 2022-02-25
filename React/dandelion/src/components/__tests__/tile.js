import React from "react"
import renderer from "react-test-renderer"
import Tile from "../tile"


describe("Tile", () => {
    it("renders correctly", () => {
        const tree = renderer
            .create(<Tile name="Map" tile_image="img" tile_color="#e3c3ca" link="/map"/>)
            .toJSON()
        expect(tree).toMatchSnapshot()
    })
})

