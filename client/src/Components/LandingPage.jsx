import React from 'react';
import {Link} from 'react-router-dom';
import s from "./LandingPage.module.css"

export default function LandingPage () {
    return (
        <div className={s.landing} >
            <h1 className={s.h1} >Welcome to the Dogs api!</h1>
            
            <Link to= "/Home" className={s.btn2}>Let's go ...</Link>
            
        </div>
    )
}

