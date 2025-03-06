//import { useState } from 'react'
import { ToggleButton } from './ToggleButton'
import { SwitchContext } from '../SwitchContext';
import { useContext } from 'react';
import clsx from 'clsx';
import './Switch.scss'

export const Switch = () => {
    const { check } = useContext(SwitchContext);
    
    return (
        <div className='switch__container'>
            <p className={clsx({ 'checked': !check })}>Monthly</p>
            <ToggleButton />
            <p className={clsx({ 'checked': check })}>Yearly</p>
        </div>
    )
}