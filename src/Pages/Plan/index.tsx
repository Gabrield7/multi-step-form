import { useState } from 'react'
import { BodyPage } from '../../Components/BodyPage';
import { PlanButton } from './PlanButton';
import { Switch } from './Switch';
import './Plan.scss'

export const Plan = () => {
    const [check, setCheck] = useState(false);
    console.log(check)
    
    return(
        <BodyPage
            title={'Select your plan'}
            subtitle={'You have the option of monthly or yearly billing.'}
        >
            <div className='plan__container'>
                <PlanButton iconPath='/assets/images/icon-arcade.svg' title='Arcade' price={9} yearly={check}/>
                <PlanButton iconPath='/assets/images/icon-advanced.svg' title='Advanced' price={12} yearly={check}/>
                <PlanButton iconPath='/assets/images/icon-pro.svg' title='Pro' price={15} yearly={check}/>

                <Switch check={check} setCheck={setCheck}/>
            </div>
        </BodyPage>
    )
};