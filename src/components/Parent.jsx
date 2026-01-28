import React from 'react'
import PropRendering from './PropRendering'

function Parent() {
    // const [value,setValue] = useState(0)
    let value = 0;
  return (
    <div>
      <PropRendering prop={value}/>
      <button onClick={()=>{
        value++
        alert(value)
        
      }}>click</button>
    </div>
  )
}

export default Parent
