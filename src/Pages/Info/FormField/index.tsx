import { useState } from 'react';
import { validation } from '../validation.ts';
import clsx from 'clsx';
import './FormField.scss';

interface IFormFieldProps{
    label: string,
    placeholder: string,
    onlyNumbers?: boolean
}

export const FormField: React.FC<IFormFieldProps> = (props) => {
    const fieldID = props.label.toLocaleLowerCase().trim().replace(/\s+/g, '-');
    const type = fieldID === 'phone-number'? 'number':'text';
    
    const [error, setError] = useState('');

    return (
        <fieldset className='form-filed'>
            <div className='labels'>
                <label htmlFor={fieldID}>{props.label}</label>
                {/* <span className='error-message'>{error}</span> */}
            </div>
            <input 
                id={fieldID} 
                className={clsx({ 'error': error })}
                placeholder={props.placeholder} 
                onBlur={(e) => validation({e, setError}, fieldID)}
                autoComplete='off'
                type={type}
            />
            <span className='error-message'>{error}</span>
        </fieldset>
    )
};