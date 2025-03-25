import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import './FormField.scss';

interface IFormFieldProps{
    label: string
    placeholder: string
    register: UseFormRegisterReturn
    error?: FieldError
}

export const FormField: React.FC<IFormFieldProps> = ({ label, placeholder, register, error }) => {
    const fieldID = label.split(' ')[0].toLowerCase();

    return (
        <fieldset className='form-filed'>
            <div className='labels'>
                <label htmlFor={fieldID}>{label}</label>
                {/* <span className='error-message'>{error}</span> */}
            </div>
            <input 
                id={fieldID}
                className={clsx({ 'error': error?.message })}
                placeholder={placeholder}
                autoComplete='off'
                {...register}
            />
            <span className='error-message'>{error?.message}</span>
        </fieldset>
    )
};