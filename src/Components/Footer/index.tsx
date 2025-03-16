import { PageButton } from './PageButton';
import './Footer.scss';

export const Footer = () => {   
    return (
        <div className='footer'>
            <PageButton type='left'/>
            <PageButton type='right'/>
        </div>
    )
};