import './FormField.scss';

interface IFormFieldProps{
    label: string,
    placeholder: string,
    error?: string
}

export const FormField: React.FC<IFormFieldProps> = (props) => {
    const fieldID = props.label.toLocaleLowerCase().trim();

    return (
        <fieldset className='form-filed'>
            <div className='labels'>
                <label htmlFor={fieldID}>{props.label}</label>
                {/* <span className='error-message'>{props.error}</span> */}
            </div>
            <input id={fieldID} placeholder={props.placeholder} />
            <span className='error-message'>{props.error}</span>
        </fieldset>
    )
};