import { BodyPage } from '../../Components/BodyPage';
import './Summary.scss'

export const Summary = () => {
    return(
        <BodyPage
            title={'Finishing up'}
            subtitle={'Double check everything looks OK before confirming.'}
        >
            <div className='addons__container'></div>
        </BodyPage>
    )
};