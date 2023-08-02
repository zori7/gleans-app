import {FC, useContext, useEffect, useRef, useState} from "react";
import Image from "next/image";
import clsx from "clsx";
import {AnimatePresence, motion, useAnimation} from "framer-motion";
import {CreateGleanContext} from "@/app/create/CreateGleanContext";

interface IProps {
    onSubmit: () => void
}

const LinkScreen: FC<IProps> = ({ onSubmit }) => {
    const { isOpen } = useContext(CreateGleanContext);

    const [isInputVisible, setIsInputVisible] = useState<boolean>(false);
    const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [link, setLink] = useState<string>("");
    const [isLinkProcessing, setIsLinkProcessing] = useState<boolean>(false);
    const [isLinkProcessed, setIsLinkProcessed] = useState<boolean>(false);

    const onInputBlur = () => {
        setIsInputFocused(false);

        if (!link.length) {
            setIsInputVisible(false)
        }
    };

    const controls = useAnimation();

    const addLink = () => {
        setIsInputVisible(true);

        setTimeout(() => {
            inputRef.current && inputRef.current.focus();
        });
    };

    const processLink = async () => {
        setIsLinkProcessing(true);

        await controls.start({ left: '0' });

        controls.set({ left: '-100%' });
        setIsLinkProcessed(true);
        setIsLinkProcessing(false);

        setTimeout(() => {
            onSubmit();
        }, 500);
    };

    useEffect(() => {
        if (isOpen) {
            setLink("");
            setIsInputVisible(false);
        }
    }, [isOpen]);

    useEffect(() => {
        setIsLinkProcessed(false);
    }, [link]);

    return (
        <>
            <div className="text-3xl opacity-50 mb-16">Add content</div>
            <div className="flex justify-center w-full gap-2 sm:gap-16 mb-9">
                <div className="content-item" onClick={onSubmit}>
                    <div className="relative w-full h-24 mb-3">
                        <Image
                            fill
                            sizes="200px"
                            className="object-contain"
                            src={"/img/create-pic.png"}
                            alt={"create a glean"}
                        />
                    </div>

                    <div className="content-item__title">Create a Glean</div>
                    <div className="content-item__description">Add content, links & descriptive text</div>
                </div>
                <div className="content-item" onClick={onSubmit}>
                    <div className="flex gap-1 mb-3">
                        <div>
                            <Image
                                width={90}
                                height={90}
                                src={"/img/collection-1.png"}
                                alt={"collection img 1"}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <Image
                                width={42}
                                height={42}
                                src={"/img/collection-2.png"}
                                alt={"collection img 2"}
                            />
                            <div className="flex gap-1">
                                <Image
                                    width={19}
                                    height={19}
                                    src={"/img/collection-3.png"}
                                    alt={"collection img 3"}
                                />
                                <Image
                                    width={19}
                                    height={19}
                                    src={"/img/collection-4.png"}
                                    alt={"collection img 4"}
                                />
                            </div>
                            <div className="flex gap-1">
                                <Image
                                    width={19}
                                    height={19}
                                    src={"/img/collection-5.png"}
                                    alt={"collection img 5"}
                                />
                                <Image
                                    width={19}
                                    height={19}
                                    src={"/img/collection-6.png"}
                                    alt={"collection img 6"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="content-item__title">Collection</div>
                    <div className="content-item__description">Organise gleans & direct links</div>
                </div>
            </div>

            <div className={clsx("w-full relative flex items-center gap-2 mb-4 p-4 bg-gray-300 bg-opacity-10 rounded-3xl", {
                "pr-16": !!link.length && !isInputFocused
            })}>
                <div>🔗</div>
                <div onClick={addLink} className={clsx("whitespace-nowrap overflow-hidden", {
                    hidden: isInputVisible
                })}>
                    Add a Link<span className="text-white/50">, title or collection name</span>
                </div>
                <div className={clsx("grow", {
                    hidden: !isInputVisible
                })}>
                    <input
                        className="base-input"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onFocus={() => setIsInputFocused(true)}
                        onBlur={onInputBlur}
                        ref={inputRef}
                        type="text"
                    />
                </div>
                <AnimatePresence>
                    {!!link.length && !isInputFocused && (
                        <motion.div
                            className="absolute right-1"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.button
                                className={clsx("shadow-[-10px_0_40px_0_rgba(0,0,0,0.8)] base-button", {
                                    success: isLinkProcessed
                                })}
                                onClick={processLink}
                                whileTap={{ scale: 0.95 }}
                                whileHover={{ scale: 1.05 }}
                                disabled={isLinkProcessing || isLinkProcessed}
                            >
                                <motion.div
                                    className="slider"
                                    animate={controls}
                                    initial={{ left: '-100%' }}
                                    transition={{
                                        duration: 3
                                    }}
                                />
                                <AnimatePresence>
                                    {isLinkProcessed && (
                                        <motion.div
                                            initial={{ scale: 5 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 1 }}
                                            transition={{
                                                duration: 0.3
                                            }}
                                        >
                                            ✓
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                {!isLinkProcessed && "Add"}
                            </motion.button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <div className="text-sm text-center text-white/70">
                <b>Powered by Gleans Ai</b> <span className="text-white">✨</span> Create content automatically and make changes if needed.
            </div>
        </>
    )
};

export default LinkScreen;
