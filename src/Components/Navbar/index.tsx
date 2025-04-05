import { NavigateButton } from './NavigateButton';
import './Navbar.scss';

export const Navbar = () => {
    return (
        <nav className='navbar__container'>
            <NavigateButton label={1} name={'YOUR INFO'} path={'/info'} />
            <NavigateButton label={2} name={'SELECT PLAN'} path={'/plan'} />
            <NavigateButton label={3} name={'ADD-ONS'} path={'/addons'} />
            <NavigateButton label={4} name={'SUMMARY'} path={'/summary'} />
        </nav>
    )
};