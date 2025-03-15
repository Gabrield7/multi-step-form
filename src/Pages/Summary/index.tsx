import { BodyPage } from '@components/BodyPage';
import { SubscriptionList } from './SubscriptionList';
import { Service } from './Service';
import { useContext } from 'react';
import { SignatureContext } from '@contexts/SignatureContext';
import './Summary.scss'

export const Summary = () => {
    const { price, cycle } = useContext(SignatureContext);
    
    return(
        <BodyPage
            title={'Finishing up'}
            subtitle={'Double check everything looks OK before confirming.'}
        >
            <div className='summary__container'>
                <SubscriptionList />
                <Service type='total' name={`Total (per ${cycle})`} price={price}/>
            </div>
        </BodyPage>
    )
};