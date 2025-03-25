import { BodyPage } from '@components/BodyPage';
import './Confirmation.scss';

export const Confirmation = () => {
    return(
        <BodyPage>
            <section className='confirmation__container'>
                <img src='assets/images/icon-thank-you.svg' alt='Thank you icon'/>
                <h1 className='thank-title'>Thank you!</h1>
                <p className='thank-description'>Thanks for confirming your subcription! We hope you have fun using our platform. if you ever need support, please feel free to email us at support@loremgaming.com.
                </p>
            </section>
        </BodyPage>
    )
}