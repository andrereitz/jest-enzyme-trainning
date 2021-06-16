import { Fragment } from "react"

export default function Congrats({ success }) {
    return (
        <Fragment>
            { 
                success
                ?
                <div data-test="component-congrats">
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