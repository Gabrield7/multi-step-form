import { BodyPage } from '../../Components/BodyPage';
import './Info.scss';

export const Info = () => {
    return(
        <BodyPage 
            title={'Personal info'}
            subtitle={'Please provide your name, email address and phone number.'}
        >
            <div className='info__container'></div>
            
        </BodyPage>
    )
};