import './Footer.scss';
import { PageButton } from './PageButton';

export const Footer = () => {
    return (
        <div className='footer'>
            <PageButton type={'Go Back'}/>
            <PageButton type={'Next Step'}/>
        </div>
    )
};