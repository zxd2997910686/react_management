import React from "react";

import style from './Child.module.scss'

import test from './Child.module.scss'


export default function Child(){
    return (
        <div>
            <ul>
                <li className={style.item}>111</li>
                <li className={test.item}>222</li>
            </ul>
        </div>
    )
}