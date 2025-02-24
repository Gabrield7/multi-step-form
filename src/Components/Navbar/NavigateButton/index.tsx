//import { Link } from 'react-router';
import React from 'react';
import './NavigateButton.scss';
import { Link } from 'react-router';

interface INavigateButtonProps{
    label: number,
    path: string
};

export const NavigateButton: React.FC<INavigateButtonProps> = (props) => {
    return (
        <Link className='navigate-button' to={props.path}>{props.label}</Link>
    )
};