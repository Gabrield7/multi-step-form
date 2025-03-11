import { BodyPage } from '@components/BodyPage';
import { AddonButton } from './AddonButton';
import './Addons.scss';

export const Addons = () => {
    return(
        <BodyPage 
            title={'Pick add-ons'}
            subtitle={'Add-ons help enhance your game experience.'}
        >
            <div className='addons__container'>
                <AddonButton 
                    title='Online service'
                    subtitle='Access to multiplayer games'
                    extra={1}
                />
                <AddonButton 
                    title='Larger storage'
                    subtitle='Extra 1TB of cloud save'
                    extra={2}
                />
                <AddonButton 
                    title='Customizable profile'
                    subtitle='Custom theme on your profile'
                    extra={2}
                />
            </div>
        </BodyPage>
        
    )
};