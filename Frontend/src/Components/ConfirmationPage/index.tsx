import { BodyPage } from "@components/BodyPage";
import './ConfirmationPage.scss';
import { useNavigate } from "react-router";

interface IConfirmationProps {
    success: boolean
    status: number
    message: string
    infoPage?: boolean
}

export const ConfirmationPage: React.FC<IConfirmationProps> = ({success, status, message, infoPage}) => {
    const navigate = useNavigate();
    
    const title = success
        ? 'Thank you!'
        : `ERROR ${status}`

    const messageContent = success
        ? 'Thanks for confirming your subcription! We hope you have fun using our platform. if you ever need support, please feel free to email us at support@loremgaming.com.'
        : message;
    
    
    const returnPage = () => {
        if (!success) {
            if (infoPage) {
                return (
                    <>
                        Please come back later or click{' '}
                        <button className='click-message' onClick={() => window.location.reload()}>here</button>{' '}
                        to try again.
                    </>
                );
            } else {
                return (
                    <>
                        Click{' '}
                        <button className='click-message' onClick={() => navigate('/info')}>here</button>{' '}
                        to return to the initial page.
                    </>
                );
            }
        }
    
        return null;
    };

    return(
        <BodyPage>
            <section className='confirmation__container'>
                <img src={`assets/images/${success? 'icon-thank-you.svg': 'icon-error.svg'}`} alt='response icon'/>
                <h1 className='message-title'>{title}</h1>
                <p className='message-description'>{messageContent}</p>
                <p className='message-description'>{returnPage()}</p>
                
            </section>
        </BodyPage>
    )
}