import { BodyPage } from '@components/BodyPage';
import './Confirmation.scss';
import { Navigate, useLocation } from 'react-router';

export const Confirmation = () => {
    const location = useLocation();

    if (!location.state) return <Navigate to='/summary' />;

    const { success, status, message } = location.state;
    
    const title = success
        ? 'Thank you!'
        : status ? `ERROR ${status}` : ''

    const messageContent = success
        ? 'Thanks for confirming your subcription! We hope you have fun using our platform. if you ever need support, please feel free to email us at support@loremgaming.com.'
        : message;
    
    return(
        <BodyPage>
            <section className='confirmation__container'>
                <img src={`assets/images/${success? 'icon-thank-you.svg': 'icon-error.svg'}`} alt='response icon'/>
                <h1 className='message-title'>{title}</h1>
                <p className='message-description'>{messageContent}</p>
            </section>
        </BodyPage>
    )
}