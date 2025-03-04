import { validation } from '../validation.tsx';
import clsx from 'clsx';
import { useState } from 'react';
import './FormField.scss';

interface IFormFieldProps{
    label: string,
    placeholder: string,
    onlyNumbers?: boolean
}

export const FormField: React.FC<IFormFieldProps> = (props) => {
    const fieldID = props.label.toLocaleLowerCase().trim().replace(/\s+/g, '-');
    
    const [error, setError] = useState('');
    
    const [value, setValue] = useState('');
    const onlyNumbers = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value.replace(/\D/g, ''));

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
                type='text'
                autoComplete='off'
                {...(props.onlyNumbers ? { 
                    onChange: (e) => onlyNumbers(e), 
                    value
                } : {})}
            />
            <span className='error-message'>{error}</span>
        </fieldset>
    )
};