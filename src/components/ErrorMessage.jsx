export default function ErrorMessage({ message }) {
    return (
        <div className="error label">
            <p>Sorry, there was an error: {message}</p>
        </div>
    );
}
