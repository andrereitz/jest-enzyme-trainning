import { Fragment } from "react";
import PropTypes from 'prop-types';

function Congrats({ success }) {
    return (
        <Fragment>
            { 
                success
                ?
                <div data-test="component-congrats" className="alert alert-success">
                    <span data-test="congrats-message">
                        Congratulations! You guessed the word!
                    </span>
                </div>
                :
                <div data-test="component-congrats"></div>
            }
        </Fragment>
    )
}

Congrats.propTypes = {
    success: PropTypes.bool.isRequired
}

export default Congrats;