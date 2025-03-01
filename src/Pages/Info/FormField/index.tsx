import { validation } from '../validation.tsx';
import clsx from 'clsx';
import { useState } from 'react';
import './FormField.scss';

interface IFormFieldProps{
    label: string,
    placeholder: string,
    validation?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const FormField: React.FC<IFormFieldProps> = (props) => {
    const fieldID = props.label.toLocaleLowerCase().trim().replace(/\s+/g, '-');

    const [error, setError] = useState('');

    // const emailValidation = (e: React.ChangeEvent<HTMLInputElement>): void => {
    //     const email = e.target.value;

    //     try {
    //         const formattedEmail: string = email.trim();
    //         const emailRegex: RegExp = /\S+@\S+\.\S+/;
    
    //         if(formattedEmail === '' || !formattedEmail){
    //             throw new Error('This field is required')
    //         }
    //         if(!formattedEmail.match(emailRegex)){
    //             throw new Error('Invalid email address')
    //         }
    
    //         setError('');
    //     } catch (error) {
    //         if (error instanceof Error) {
    //             setError(error.message);
    //         } else {
    //             setError('An unexpected error occurred');
    //         }
    //     }
    // };

    return (
        <fieldset className='form-filed'>
            <div className='labels'>
                <label htmlFor={fieldID}>{props.label}</label>
                {/* <span className='error-message'>{props.error}</span> */}
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