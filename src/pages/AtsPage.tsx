import React from "react";

export default function AtsPage(){
    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            
        <textarea name="jobdescription" id="" placeholder="enter job description">

        </textarea>

        <input type="file" />

        <button>Submit</button>
        </div>
    )
}