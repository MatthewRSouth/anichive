export default function Button({
    children,
    height,
    width,
    color,
    size = 'small',
    borderRadius = '25px',
    discover,
    onDiscoverChange,
}) {
    const btnStyles = {
        height: { height },
        width: { width },
        backgroundColor: { color },
        padding: size === 'large' ? '20px' : '10px',
        borderRadius: { borderRadius },
    };
    return (
        <button
            styles={btnStyles}
            value={discover}
            onClick={() => onDiscoverChange}
        >
            {children}
        </button>
    );
}
