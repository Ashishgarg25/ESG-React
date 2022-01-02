import React,{ useState } from 'react'
import { Tooltip } from "reactstrap";

function TooltipComp({ message, openTooltipN, target }) {

    const [ tooltipOpen, setTooltipOpen ] = useState(false)
    const [ tooltipOpen1, setTooltipOpen1 ] = useState(false)

    return (
        <>
            <Tooltip 
                placement="top" 
                isOpen={ openTooltipN === 0 ? tooltipOpen : tooltipOpen1} 
                target={target}
                toggle={() => {
                    if(openTooltipN === 0){
                        setTooltipOpen(!tooltipOpen)
                    }
                    else{
                        setTooltipOpen1(!tooltipOpen1)
                    }
                }}
            >
                {message}
            </Tooltip>
        </>
    )
}

export default TooltipComp
