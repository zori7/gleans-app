import {FC} from "react";
import {motion} from "framer-motion";

const LoadingSpinner: FC = () => {
    return (
        <motion.div
            className="w-16 h-16 rounded-full inline-block border-4 border-white/70 border-t-blue-500"
            animate={{
                rotate: 360
            }}
            transition={{
                ease: "linear",
                duration: 0.7,
                repeat: Infinity
            }}
        />
    );
};

export default LoadingSpinner;
