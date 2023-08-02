import {createPortal} from "react-dom";
import clsx from "clsx";
import {FC, useContext, useEffect, useMemo, useState} from "react";
import "../createGlean.css"
import LinkScreen from "@/app/create/LinkScreen";
import {CreateGleanContext} from "@/app/create/CreateGleanContext";
import AnimatedScreen from "@/app/create/AnimatedScreen";
import DetailsScreen from "@/app/create/DetailsScreen";
import LoadingSpinner from "@/app/create/LoadingSpinner";

interface IProps {
    onClose: () => void
}

enum SCREEN {
    link,
    details
}

const CreateGlean: FC<IProps> = ({onClose}) => {
    const { isOpen, setIsOpen, setDetails } = useContext(CreateGleanContext);
    const [isScreenVisible, setIsScreenVisible] = useState(true);
    const [screen, setScreen] = useState<SCREEN>(SCREEN.link);
    const [loadingDetails, setLoadingDetails] = useState<boolean>(false);

    const onSubmitLink = () => {
        setIsScreenVisible(false);
        setScreen(SCREEN.details);
    };
    const onSubmitDetails = () => {
        setIsOpen(false);
    };
    const onBackDetails = () => {
        setIsScreenVisible(false);
        setScreen(SCREEN.link);
    };

    const enableScreen = () => {
        setIsScreenVisible(true);
    }
    
    const hasFullHeight = useMemo<boolean>(() => {
        return [SCREEN.details].includes(screen);
    }, [screen]);

    useEffect(() => {
        if (!isOpen) {
            setTimeout(() => {
                setScreen(SCREEN.link);
            }, 300);
        }
    }, [isOpen]);

    useEffect(() => {
        if (screen === SCREEN.details) {
            setLoadingDetails(true);
            fetch("/api/details").then((res) => res.json()).then(data => {
                setDetails(data);

                setTimeout(() => {
                    setLoadingDetails(false);
                }, 2000);
            });
        }
    }, [screen]);

    return createPortal(
        (
            <>
                <div className={clsx("w-full min-h-[300px] overflow-y-auto sm:rounded-b-[40px] sm:h-auto sm:max-w-[440px] bottom-0 sm:bottom-1/2 fixed left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white p-6 sm:p-9 pt-14 pb-12 shadow-lg transition-all duration-300 z-50 flex flex-col items-center", [
                    isOpen ? "opacity-100 translate-y-0 sm:translate-y-1/2" : "opacity-0 translate-y-full pointer-events-none",
                    hasFullHeight ? "sm:rounded-t-[40px]" : 'rounded-t-[40px]',
                    {
                        "h-screen": hasFullHeight
                    }
                ])}>
                    <AnimatedScreen isVisible={isScreenVisible && screen === SCREEN.link} onExitComplete={enableScreen}>
                        <LinkScreen onSubmit={onSubmitLink} />
                    </AnimatedScreen>
                    <AnimatedScreen isVisible={!loadingDetails && isScreenVisible && screen === SCREEN.details} onExitComplete={enableScreen}>
                        <DetailsScreen onSubmit={onSubmitDetails} onBack={onBackDetails} />
                    </AnimatedScreen>

                    {loadingDetails && isScreenVisible && (
                        <div className="grow flex items-center">
                            <LoadingSpinner />
                        </div>
                    )}
                </div>

                <div
                    className={clsx("fixed w-full h-full top-0 left-0 bg-black bg-opacity-80 z-40 backdrop-blur-xl transition-opacity duration-300", [
                        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    ])}
                    onClick={onClose}
                />
            </>
        ),
        document.body
    )
};

export default CreateGlean;
