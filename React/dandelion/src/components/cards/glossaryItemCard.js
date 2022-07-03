import React from "react";
import "../../styles/App.scss";

export default function GlossaryItemCard(props) {
    return (
        <div className="glossaryItemContainer">
            <div className="row">
                <div className="text-content">
                    <h4>{props.term}</h4>
                    <p>
                        {props.definition}
                    </p>
                    {
                        props.url != "" &&
                        <p class="right"><a href={props.url} target='_blank'>More information</a></p>
                    }
                </div>
            </div>
            <div className="bottom-divider">
                <hr />
            </div>
        </div>
    )
}

GlossaryItemCard.defaultProps = {
    term: "???",
    definition: "???",
    url: ""
};
