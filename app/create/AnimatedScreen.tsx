import {motion, AnimatePresence} from "framer-motion";
import {FC, PropsWithChildren} from "react";

interface IProps {
    isVisible: boolean
    onExitComplete?: () => void
}

const AnimatedScreen: FC<PropsWithChildren<IProps>> = ({ isVisible, onExitComplete, children }) => {
    return (
        <AnimatePresence onExitComplete={onExitComplete}>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AnimatedScreen;
