export default function Empty({ query }) {
    return (
        <div className="empty label">
            <p>Sorry, we couldn't find: {query}, please try again</p>
        </div>
    );
}
