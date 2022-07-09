import { useEffect, useState } from "react";

interface IProps {
    src?: string;
}

const DEFAULT_IMAGE = 'https://icon-library.com/images/no-image-icon/no-image-icon-5.jpg';

export function CustomImage({ src }: IProps) {
    const [currentSource, setCurrentSource] = useState(src);

    useEffect(() => {
        setCurrentSource(src);
    }, [src]);

    const handleOnError = () => {
        setCurrentSource(DEFAULT_IMAGE);
    }

    return (
        <img
            src={currentSource}
            onError={handleOnError}
        ></img>
    )
}