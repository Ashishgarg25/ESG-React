import React from 'react'
import { Link, useHistory } from "react-router-dom";

function CommingSoon() {

    const history = useHistory();

    return (
        <div className={"wrapper"}>
            <div>
                <h3 className="label" style={{ fontSize: 72, fontWeight: "bold" }}>Comming Soon</h3>
            </div>
            <div className="btn commingSoonBtn mt-4 py-3 px-4" onClick={() => history.push("/")}>Back to Login</div>
        </div>
    )
}

export default CommingSoon
