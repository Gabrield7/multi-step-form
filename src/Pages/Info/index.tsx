import { BodyPage } from '../../Components/BodyPage';
import { FormField } from './FormField';
import './Info.scss';

export const Info = () => {
    return(
        <BodyPage 
            title={'Personal info'}
            subtitle={'Please provide your name, email address and phone number.'}
        >
            <form className='info__container'>
                <FormField label='Name' placeholder='e.g. Stephen King' />
                <FormField label='Email address' placeholder='e.g. stephenking@lorem.com'/>
                <FormField label='Phone Number' placeholder='e.g. +1 234 567 890'/>
            </form>
        </BodyPage>
    )
};