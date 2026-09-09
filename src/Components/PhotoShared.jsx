import { Reveal } from './Reveal';

export const PhotoShared = ({ photo, alt, grid, index, className, onOpen }) => {
    return (
        <div className={`${grid} ${className || ''}relative group`}>
            <Reveal delay={index ? index * 0.5 : 0} scale={true} className="size-full">
                <div
                    className="overflow-hidden size-full cursor-pointer"
                    onClick={onOpen}
                >
                    <img
                        loading="lazy"
                        className="size-full object-cover border hover:scale-105 transition-all duration-500"
                        src={photo}
                        alt={alt}
                    />
                </div>
            </Reveal>
        </div>
    );
};