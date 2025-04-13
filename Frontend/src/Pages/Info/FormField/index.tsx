import { useEffect, useState } from 'react';
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
    
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWidth(window.innerWidth);

        window.addEventListener('resize', handleResize);
        
        // Cleanup: removes the listener when the component is dismounted
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const onlyNumbers = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const allowedKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
      
        if ((e.key >= '0' && e.key <= '9') || allowedKeys.includes(e.key)) return;

        e.preventDefault();
    };

    return (
        <fieldset className='form-field'>
            <div className='labels'>
                <label htmlFor={fieldID}>{label}</label>
                <span className='error-message'>{width >= 480? error?.message : ''}</span>
            </div>
            <input 
                id={fieldID}
                className={clsx({ 'error': error?.message })}
                placeholder={placeholder}
                autoComplete='off'
                {...register}
                inputMode={fieldID === 'phone' ? 'numeric' : undefined}
                onKeyDown={(e) => fieldID === 'phone' ? onlyNumbers(e) : undefined}
            />
            <span className='error-message'>{width < 480? error?.message : ''}</span>
        </fieldset>
    )
};