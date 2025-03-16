//import React from 'react'
import './BodyPage.scss'

interface IBodyPageProps{
    title?: string,
    subtitle?: string
    children: React.ReactNode
}

export const BodyPage: React.FC<IBodyPageProps> = (props) => {
    return(
        <div className='page__container'>
            <h1>{props.title}</h1>
            <p className='subtitle'>{props.subtitle}</p>

            {props.children}
        </div>
    )
}