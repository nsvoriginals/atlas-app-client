import React from "react";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function AtsPage(){
    const percentage=89;
    return (
        <div className="w-screen h-screen flex items-center justify-center flex-col gap-10">

   
            <div className="flex items-center flex-col justify-between gap-14 ">
                <h1>ATS Score</h1>
            <CircularProgressbar value={percentage} text={`${percentage}/100`} />
            </div>
            <div className="flex items-center justify-center gap-2 h-2/3">
              <div className="flex flex-col items-center justify-center gap-2 w-screen border-2 border-black h-full">

<div id="1" className="w-full ">    
hi there
</div>

<div id="2" className="w-full">
hi there
</div>
              </div>
              <div className="h-full w-90% border-2 border-black">
               Missing Keywords
              </div>
            </div>

            

        </div>
    )
}