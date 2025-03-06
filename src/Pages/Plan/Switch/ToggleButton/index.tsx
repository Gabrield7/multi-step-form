import './ToggleButton.scss';

interface IToggleButtonProps {
    check: boolean,
    setCheck: React.Dispatch<React.SetStateAction<boolean>>
}

export const ToggleButton: React.FC<IToggleButtonProps> = (props) => {   
    return(
        <label className='toggle'>
            <input 
                type='checkbox'
                checked={props.check}
                onChange={() => props.setCheck(!props.check)}
            />
            <span className='slider'></span>
        </label>
    )
}