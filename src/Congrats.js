import React from 'react';
import { Fragment } from "react";
import PropTypes from 'prop-types';

import languageContext from "./contexts/languageContext";
import successContext from './contexts/successContext';
import stringsModule from './helpers/strings';

function Congrats() {
    const [success] = successContext.useSuccess();
    const language = React.useContext(languageContext);

    return (
        <Fragment>
            { 
                success
                ?
                <div data-test="component-congrats" className="alert alert-success">
                    <span data-test="congrats-message">
                        {stringsModule.getStringByLanguage(language, 'congrats')}
                    </span>
                </div>
                :
                <div data-test="component-congrats"></div>
            }
        </Fragment>
    )
}

export default Congrats;