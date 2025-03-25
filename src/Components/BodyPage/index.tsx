import './BodyPage.scss'

interface IBodyPageProps{
    title?: string,
    subtitle?: string
    children: React.ReactNode
}

export const BodyPage: React.FC<IBodyPageProps> = (props) => {
    return(
        <main className='page__container'>
            {props.title && props.subtitle && 
            <header>
                <h1>{props.title}</h1>
                <p className='subtitle'>{props.subtitle}</p>
            </header>}

            {props.children}
        </main>
    )
}