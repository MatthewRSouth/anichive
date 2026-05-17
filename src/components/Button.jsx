export default function Button({
    children,
    height,
    width,
    color,
    size = 'small',
}) {
    const btnStyles = {
        height: { height },
        width: { width },
        backgroundColor: { color },
        padding: size === 'large' ? '20px' : '10px',
    };
    return <button style={btnStyles}>{children}</button>;
}
