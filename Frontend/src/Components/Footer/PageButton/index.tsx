import { usePageNavigation } from '@hooks/usePageNavigation'
import './PageButton.scss';

interface IPageButtonProps{
    type: 'back' | 'next'
};

export const PageButton: React.FC<IPageButtonProps> = ({ type }) => {
    const config = usePageNavigation(type);
    if (!config) return null;

    type buttonType = "button" | "submit" | "reset" | undefined;

    return (
        <button
            className={config.className}
            type={config.type as buttonType}
            onClick={config.onClick}
            form={config.form}
        >
            {config.text}
        </button>
    );
};
