//import { useState } from 'react'
import { BodyPage } from '../../Components/BodyPage';
import { PlanButton } from './PlanButton';
import { Switch } from './Switch';
import { SwitchContextProvider } from './SwitchContext';
import './Plan.scss';

export const Plan = () => {
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <SwitchContextProvider>
                <div className='plan__container'>
                    <PlanButton iconPath='/assets/images/icon-arcade.svg' title='Arcade' price={9}/>
                    <PlanButton iconPath='/assets/images/icon-advanced.svg' title='Advanced' price={12}/>
                    <PlanButton iconPath='/assets/images/icon-pro.svg' title='Pro' price={15}/>

                    <Switch />
                </div>
            </SwitchContextProvider>
        </BodyPage>
    )
};