import { NavigateButton } from '../NavigateButton';
import './Topbar.scss';

export const Topbar = () => {
    return (
        <div className='topbar__container'>
            <NavigateButton label={1} path={'/info'} />
            <NavigateButton label={2} path={'/plan'} />
            <NavigateButton label={3} path={'/addons'} />
            <NavigateButton label={4} path={'/summary'} />
        </div>
    )
}