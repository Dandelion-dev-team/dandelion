import React from "react"
import Header from "../components/navigation/header"
import GlossaryItem from "../components/cards/glossaryItemCard";
import "../styles/App.scss"
import { Trans, useTranslation } from "gatsby-plugin-react-i18next"
import { graphql } from "gatsby"
import Alert from "../components/cards/alertCard";

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`

const Glossary = () => {
  return (
    <div className="dandelion">
      <Header />
      <div className="glossary page-container">
        <div className="panel">
          <div className="panel-title">
            <h2>
              <Trans>Glossary</Trans>
            </h2>
            <p>
              This alphabetic list of technical terms gives you a simple definition for each one.
            </p>
          </div>
          <div className="panel-content">
            <inner>
              <GlossaryItem term="Activity" definition="A catch-all term for a range of experiments e.g. repeats of the same experiment or one class’s experiments."  />
              <GlossaryItem term="Allocated" definition="Student has logged in and updated their password."  />
              <GlossaryItem term="Condition" definition="The occurrence of each combination of an experiments’ treatment variables e.g. two different plant species undergoing 3 different watering treatments gives 6 conditions."  />
              <GlossaryItem term="Control" definition="One of the conditions whereby nothing is changed or affected by the variables. It allows the researcher to gauge whether the treatment variables have caused a change or affected the response variables."  />
              <GlossaryItem term="Cotyledon" definition="Also called seed leaf. A food reserve within the seed that emerges as the new plant’s first leaf, after germination and before the true leaves appear."  />
              <GlossaryItem term="Data" definition="Information, observations, facts etc gathered for research, analysis or reference. Data can be qualitative e.g. if you are asked to provide an opinion; or quantitative. If quantitative, the data is then either continuous e.g. height, weight, or temperature which can be of any value; or discrete whereby the numbers must be whole or of a fixed value."  />
              <GlossaryItem term="EC" definition="Electrical Conductivity – an indicator of nutrient salt concentration and electrolytes in a nutrient solution."  />
              <GlossaryItem term="Germination" definition="When a seed sprouts. This is followed by the first set of leaves."  />
              <GlossaryItem term="GrowCube" definition="Dandelion’s 750mm2 vertical farm."  />
              <GlossaryItem term="Growing medium" definition="This refers to the thing in which a seed/plant grows. It can be soil, water, paper towel, or in the case of the grow cubes – a fibrous matting called growfelt."  />
              <GlossaryItem term="Humidity" definition="The volume of moisture in the air. Plants lose moisture from their leaves so air humidity can have a significant impact on their ability to grow."  />
              <GlossaryItem term="Hydroponic" definition="A method of growing plants in water – without soil"  />
              <GlossaryItem term="Hypothesis" definition="An idea or an assumption that accounts for why something changes or is different. We start with the null hypothesis – that our experiments will effect no change. Then we consider the alternative hypothesis e.g. that tickling the plants will improve their growth."  />
              <GlossaryItem term="IoT/ Internet of Things Node" definition="A set of sensors connected to a microprocessor which sends sensor data to Dandelion’s central database via the internet. The node automatically and continuously collects data from the GrowCubes’ sensors, and sends this by wifi over the internet to the Dandelion App." url="https://dandelion.sruc.ac.uk/reference"  />
              <GlossaryItem term="Nutrients" definition="Needed by plants for growth and development. Nitrogen, Phosphorus and Potassium are the primary macro-nutrients, and there are other macro- and micro-nutrients too."  />
              <GlossaryItem term="pH" definition="A quantitative measure of how acidic or alkaline a substance is: 1 being very acidic, 7 being neutral and 14 being very alkaline. Plants generally tolerate slightly acidic to neutral soils."  />
              <GlossaryItem term="Photoperiod" definition="The length of time each day in which plant receives light. It acts as a cue to the plants’ growth and development."  />
              <GlossaryItem term="Plant health" definition="The condition of the plant; affects growth, development and yield. Generally, a healthy plant will be well-formed, not straggly; have good, uniformly green colour; and a well-developed root system. Plants in poor health are more susceptible to pests and disease."  />
              <GlossaryItem term="Response variables" definition="Also called dependent variables. The focus of your experiment; what you expect to change or differ because of the different treatments you have applied. Some may be visible differences which can be measured e.g. height, weight or colour."  />
              <GlossaryItem term="Seed leaves" definition="These are the first leaves to appear after germination and do not look like the other leaves which come after. Seed leaves all look relatively similar."  />
              <GlossaryItem term="Sensors" definition="The GrowCube will have sensors measuring temperature, soil moisture, water depth, EC, pH and humidity,"  />
              <GlossaryItem term="Substrate" definition="This is what plants grow in or anchor themselves onto – usually soil in the ground, or compost for house plants. In the GrowCubes, you’ll have fibrous felt patches possibly made from wool, plant or mineral fibres."  />
              <GlossaryItem term="Thigmomorphogenesis" definition="A plant’s physiological and morphological growth in response to the stresses of mechanical stimulation e.g. strong wind or animals brushing past."  />
              <GlossaryItem term="Thigmotropism" definition="A plant’s directional growth in response to what it touches e.g. twining tendrils of peas that help it climb up to reach light."  />
              <GlossaryItem term="Treatment variables" definition="Also called the independent variables. These are the things you do or apply to the plants to cause a change or difference i.e. to effect a response variable."  />
              <GlossaryItem term="Unallocated" definition="Student account has been created but the password has not yet been changed."  />
              <GlossaryItem term="Vigour" definition="The plants’ strength or vitality; affected by its genetics and its environment e.g. soil, weather and nutrients. Seed vigour is the potential of a seed for its germination and growth into a normal seedling."  />
            </inner>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Glossary
