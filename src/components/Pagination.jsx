function getPageNumbers(currentPage, totalPages) {
    const pages = new Set([1, totalPages]);
    for (let p = currentPage - 2; p <= currentPage + 2; p++) {
        if (p >= 1 && p <= totalPages) pages.add(p);
    }

    const items = [];
    let prev = 0;
    for (const page of [...pages].sort((a, b) => a - b)) {
        if (page - prev > 1) items.push('…');
        items.push(page);
        prev = page;
    }
    return items;
}

export default function Pagination({ currentPage, totalPages, onPageChange }) {
    const pageItems = getPageNumbers(currentPage, totalPages);

    return (
        <div className="flex justify-center">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="txt-xl mx-5"
            >
                Prev
            </button>
            {pageItems.map((item, i) =>
                item === '…' ? (
                    <span key={`gap-${i}`}>…</span>
                ) : (
                    <button
                        key={item}
                        onClick={() => onPageChange(item)}
                        className={
                            item === currentPage
                                ? 'active text-2xl mx-5'
                                : 'text-2xl mx-5'
                        }
                    >
                        {item}
                    </button>
                ),
            )}
            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
}
