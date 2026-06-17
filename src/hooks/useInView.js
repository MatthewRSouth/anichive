import { useState, useEffect, useRef } from 'react';

// Returns [ref, inView]. inView flips to true the first time the element
// scrolls into (or near) the viewport, then we disconnect so it stays true
// — sections fetch once on approach and never refetch when scrolled away.
export function useInView({ rootMargin = '200px' } = {}) {
    const ref = useRef(null);
    const [inView, setInView] = useState(
        () => typeof IntersectionObserver === 'undefined',
    );

    useEffect(() => {
        if (inView) return;
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { rootMargin },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, [inView, rootMargin]);

    return [ref, inView];
}
