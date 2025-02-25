import { BodyPage } from '../../Components/BodyPage';
import './Addons.scss';

export const Addons = () => {
    return(
        <BodyPage 
            title={'Pick add-ons'}
            subtitle={'Add-ons help enhance your game experience.'}
        >
            <div className='addons__container'></div>
        </BodyPage>
        
    )
};