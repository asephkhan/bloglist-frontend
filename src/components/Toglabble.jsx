import React, {useState} from 'react'

const Toglabble = (props) => {
    const [visible, setVisible] = useState(false)

    const hideWhenVisible = {display: visible? 'none' : ''}
    const showWhenVisible = {display: visible? '' : 'none'}

 const visibility = () => {
    setVisible(!visible)
} 
  return (
    <div>
        <div style={hideWhenVisible} >
            <button type='onSubmit' onClick={visibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {props.children}
            <button type='onSubmit' onClick={visibility}>cancel</button>
        </div>
    </div>
  )
}

export default Toglabble
