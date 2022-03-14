import { FC, MouseEvent, useRef } from "react";

interface BottomSheetProps {
    isOpen: boolean,
    onBackgroundClick?: () => void,
}

export const BottomSheet:FC<BottomSheetProps> = ({isOpen, children, onBackgroundClick = () => {}}) => {
    const backgroundRef = useRef(null);

    const onClick = (event: MouseEvent<HTMLElement>) => {
        if (event.target !== backgroundRef.current) return;
        onBackgroundClick();
    }

    return (
        <>
        { isOpen &&
            <div 
                className="fixed top-0 bottom-0 left-0 right-0 bg-opacity-60 bg-black flex flex-col justify-end items-center z-10"
                onClick={onClick}
                ref={backgroundRef}
            >
                <div className="bg-neutral-800 h-4/5 w-full lg:h-full lg:w-3/5 rounded-t-3xl lg:rounded-none overflow-hidden">
                    {children}
                </div>
            </div>
        }
        </>
    )
};