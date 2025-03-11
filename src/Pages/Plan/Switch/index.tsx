import { ToggleButton } from './ToggleButton'
import { SignatureContext } from '@contexts/SignatureContext';
import { useContext } from 'react';
import clsx from 'clsx';
import './Switch.scss'

export const Switch = () => {
    const { cycle } = useContext(SignatureContext);
    
    return (
        <div className='switch__container'>
            <p className={clsx({ 'checked': cycle === 'monthly' })}>Monthly</p>
            <ToggleButton />
            <p className={clsx({ 'checked': cycle === 'yearly' })}>Yearly</p>
        </div>
    )
}