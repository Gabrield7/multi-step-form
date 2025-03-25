import { BodyPage } from '@components/BodyPage';
import { AddonButton } from './AddonButton';
import './Addons.scss';

export const Addons = () => {
    return(
        <BodyPage 
            title={'Pick add-ons'}
            subtitle={'Add-ons help enhance your game experience.'}
        >
            <section className='addons__container'>
                <AddonButton addonName='Online service'/>
                <AddonButton addonName='Larger storage'/>
                <AddonButton addonName='Customizable profile'/>
            </section>
        </BodyPage>
    )
};