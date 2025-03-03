import {useState} from 'react'

const Toggleable = (props) => {

    const {labelVisible, labelInvisible, visibilityOnStart, children} = props
    const [visibility, setVisibility] = useState(visibilityOnStart)

    const handleClick = (evt) => setVisibility(!visibility)

    const visibilityStyle = {display:visibility?'':'none'}
    const button = () => <><button
        onClick={handleClick} > {visibility?labelVisible:labelInvisible}
    </button> </>
    return (
        <>
        <div style={visibilityStyle}>
            {children}
        </div>
    {button()}
   </>
)

}

export default Toggleable