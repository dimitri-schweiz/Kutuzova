import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

export default function Quote({ quote, index }) {

    return (
        <div className={classNames("quote", "quote-" + (index + 1))}>
            <div className="quote-text">
                <div dangerouslySetInnerHTML={{ __html: quote.text }} />
            </div>
            <div className="quote-author">
                <div dangerouslySetInnerHTML={{ __html: quote.author }} />
            </div>
        </div>
    );
}


Quote.propTypes = {
    quote: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
};
