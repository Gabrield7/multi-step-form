import { FieldError, UseFormRegisterReturn } from 'react-hook-form';
import clsx from 'clsx';
import './FormField.scss';

interface IFormFieldProps{
    label: string
    placeholder: string
    register: UseFormRegisterReturn
    error?: FieldError
}

export const FormField: React.FC<IFormFieldProps> = (props) => {
    const fieldID = props.label.split(' ')[0].toLowerCase();
    const type = fieldID === 'phone-number'? 'number':'text';

    return (
        <fieldset className='form-filed'>
            <div className='labels'>
                <label htmlFor={fieldID}>{props.label}</label>
                {/* <span className='error-message'>{error}</span> */}
            </div>
            <input 
                id={fieldID}
                className={clsx({ 'error': props.error?.message })}
                placeholder={props.placeholder}
                {...props.register} 
                autoComplete='off'
                type={type}
            />
            <span className='error-message'>{props.error?.message}</span>
        </fieldset>
    )
};