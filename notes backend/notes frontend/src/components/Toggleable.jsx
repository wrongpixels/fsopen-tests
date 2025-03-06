import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef((props, refs) => {

  const { labelVisible, labelInvisible, visibilityOnStart, children } = props
  Toggleable.propTypes = {
    labelVisible: PropTypes.string.isRequired,
    labelInvisible: PropTypes.string.isRequired
  }
  Toggleable.displayName = 'Toggleable'
  const [visibility, setVisibility] = useState(visibilityOnStart)

  const handleClick = (evt) => toggleVisibility()

  const toggleVisibility = () => setVisibility(!visibility)

  const visibilityStyle = { display:visibility?'':'none' }

  useImperativeHandle(refs, () => ({
    toggleVisibility
  }))

  const button = () => <button
    onClick={handleClick} > {visibility?labelVisible:labelInvisible}
  </button>
  return (
    <>
      <div style={visibilityStyle}>
        {children}
      </div>
      {button()}
    </>
  )

})

export default Toggleable