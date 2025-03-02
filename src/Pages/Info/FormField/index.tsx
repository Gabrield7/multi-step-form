import { validation } from '../validation.tsx';
import clsx from 'clsx';
import { useState } from 'react';
import './FormField.scss';

interface IFormFieldProps{
    label: string,
    placeholder: string,
}

export const FormField: React.FC<IFormFieldProps> = (props) => {
    const fieldID = props.label.toLocaleLowerCase().trim().replace(/\s+/g, '-');

    const [error, setError] = useState('');

    return (
        <fieldset className='form-filed'>
            <div className='labels'>
                <label htmlFor={fieldID}>{props.label}</label>
                {/* <span className='error-message'>{error}</span> */}
            </div>
            <input 
                className={clsx({ 'error': error })}
                id={fieldID} 
                placeholder={props.placeholder} 
                onBlur={(e) => validation({e, setError}, fieldID)}
            />
            <span className='error-message'>{error}</span>
        </fieldset>
    )
};