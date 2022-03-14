import { FC } from "react";

interface DetailsSectionProps {
    header: string
}

export const DetailsSection:FC<DetailsSectionProps> = ({header, children}) => {
    return (
        <div className="m-2 border-b border-neutral-700">
            <h3 className="text-2xl m-2">{header}</h3>
            {children}
        </div>
    );
}