import { useState, useEffect } from 'react';

/*At the top of useFetch.js, outside the hook function, declare a Map. This is your cache. It survives every mount/unmount because it's not in React state.
Inside the hook's effect, before the fetch call: check if the cache has an entry for this URL. If yes — set the result directly from the cache, skip the fetch entirely. If no — proceed with the fetch.
After a successful fetch, write the data to the cache before setting state. */

const cache = new Map();

export function useFetch(url, { debounce = 0 } = {}) {
    // Result is stored together with the url it was fetched for, so
    // loading/data/error can be derived: a result for a different url
    // (or no result yet) means we are still loading the current one.
    const [result, setResult] = useState({
        url: null,
        data: null,
        error: null,
    });

    useEffect(() => {
        if (!url) return;
        const controller = new AbortController();

        async function fetchData() {
            try {
                const res = await fetch(url, { signal: controller.signal });
                if (!res.ok) {
                    if (res.status === 429)
                        throw new Error(
                            'Server is busy (rate limit). Please wait a moment.',
                        );
                    throw new Error(`Jikan request failed: ${res.status}`);
                }
                const data = await res.json();
                const next = { url, data, error: null };
                setResult(next);
                cache.set(url, next);
            } catch (err) {
                if (err.name !== 'AbortError')
                    setResult({ url, data: null, error: err });
            }
        }
        if (cache.has(url)) {
            setResult(cache.get(url));
            return;
        }

        if (debounce > 0) {
            const id = setTimeout(() => {
                fetchData();
            }, debounce);

            return () => {
                clearTimeout(id);
                controller.abort();
            };
        }
        fetchData();

        return () => controller.abort();
    }, [url, debounce]);

    const isCurrent = result.url === url;
    return {
        data: url && isCurrent ? result.data : null,
        error: url && isCurrent ? result.error : null,
        loading: Boolean(url) && !isCurrent,
    };
}
