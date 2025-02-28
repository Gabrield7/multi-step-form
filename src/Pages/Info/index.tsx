import { BodyPage } from '../../Components/BodyPage';
import { FormField } from './FormField';
import './Info.scss';

export const Info = () => {
    return(
        <BodyPage 
            title={'Personal info'}
            subtitle={'Please provide your name, email address and phone number.'}
        >
            <div className='info__container'>
                <FormField label='Name' placeholder='e.g. Stephen King' error='This field is required'/>
                <FormField label='Email address' placeholder='e.g. stephenking@lorem.com' error='This field is required'/>
                <FormField label='Phone Number' placeholder='e.g. +1 234 567 890' error='This field is required'/>
            </div>
            
        </BodyPage>
    )
};