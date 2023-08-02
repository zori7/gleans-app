import {FC, useContext, useEffect, useMemo, useState} from "react";
import Image from "next/image";
import {getEmojiAverageColor} from "@/utils/color";
import {CreateGleanContext} from "@/app/create/CreateGleanContext";
import Color from "color";
import MinusIcon from "@/icons/MinusIcon";
import PlusIcon from "@/icons/PlusIcon";
import DashboardIcon from "@/icons/DashboardIcon";

interface IProps {
    onSubmit: () => void
    onBack: () => void
}

const DetailsScreen: FC<IProps> = ({ onSubmit, onBack }) => {
    const {details} = useContext(CreateGleanContext);

    const [emojiColor, setEmojiColor] = useState<{
        red: number
        green: number
        blue: number
        alpha: number
    }>();

    const [emojiTopColor, setEmojiTopColor] = useState<string>();
    const [emojiBottomColor, setEmojiBottomColor] = useState<string>();
    const [tags, setTags] = useState<Array<string>>([]);

    useEffect(() => {
        if (details) {
            const color = getEmojiAverageColor(details.emoji);

            if (color) {
                setEmojiColor(color);
            }

            setTags(details.tags);
        }
    }, [details]);

    useEffect(() => {
        if (emojiColor) {
            const {red, green, blue, alpha} = emojiColor;
            const white = Color("#ffffff");

            const color = Color.rgb(red, green, blue).alpha(alpha);

            const hue = color.hue();
            const saturation = color.saturationl();

            const newHue = hue - (hue * 0.2);
            const newSaturation = saturation * 0.8;

            const topColor = color.hue(newHue).mix(white, 0.4);
            const bottomColor = color.mix(white, 0.2).saturationl(newSaturation);

            setEmojiTopColor(topColor.hex());
            setEmojiBottomColor(bottomColor.hex());
        }
    }, [emojiColor]);

    const switchTag = (tag: string) => {
        if (tags.includes(tag)) {
            setTags((tags) => tags.filter((v) => v !== tag));
        } else {
            setTags((tags) => [...tags, tag]);
        }
    }

    const renderedTags = useMemo(() => {
        return details?.tags.map((tag, index) => (
            <div key={index} className="base-tag" onClick={() => {
                switchTag(tag)
            }}>{tag} {
                tags.includes(tag) ? (
                    <MinusIcon />
                ) : (
                    <span className="text-green-300">
                        <PlusIcon />
                    </span>
                )
            }</div>
        ))
    }, [details?.tags, tags]);

    return (
        <>
            <div className="emoji-box mb-9" style={{
                background: `radial-gradient(121.3% 121.3% at 50.43% 0%, ${emojiTopColor} 0%, ${emojiBottomColor} 100%)`
            }}>
                <div className="text-7xl">
                    {details?.emoji}
                </div>
                <div className="flex items-center gap-4">
                    <div className="shrink-0">
                        <Image
                            width={23}
                            height={20}
                            src="/img/upload-image.png"
                            alt="upload icon"
                        />
                    </div>

                    <div className="opacity-50">
                        Paste or tap to change into an image or video.
                    </div>
                </div>
            </div>
            <div className="text-3xl mb-4 text-center font-medium">{details?.title}</div>
            <div className="text-sm text-center opacity-50 mx-4 mb-10 max-h-14 text-bottom-shadow">{details?.description}</div>

            <div className="flex flex-wrap justify-center gap-3 mb-14">
                {renderedTags}
            </div>

            <div className="text-center text-gray-300 flex gap-1 mb-10 justify-center items-center">Add to collection <DashboardIcon /></div>
            <div className="flex gap-4 justify-center items-center">
                <button className="base-button secondary" onClick={onBack}>Back</button>
                <button className="base-button" onClick={onSubmit}>Add Glean</button>
            </div>
        </>
    )
};

export default DetailsScreen;
