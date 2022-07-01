import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import ChangingProgressProvider from "./ChangingProgressBar";

import React from 'react'

function Loading() {
  return (
    <div style={{width:'100vw',height:'50vw',display: 'flex',alignItems:'center', justifyContent:'center'}}>
        <div style={{ width:200,height: 200}}>
       <ChangingProgressProvider values={[0, 20, 40, 60, 80, 100]}>
        {percentage => (
          <CircularProgressbar value={percentage} text={`${percentage}%`} />
        )}
      </ChangingProgressProvider>
    </div>
    </div>
  )
}

export default Loading
