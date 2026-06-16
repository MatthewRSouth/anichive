const BASE_URL = 'https://api.jikan.moe/v4';

export function searchAnimeUrl(query, page, limit) {
    return `${BASE_URL}/anime?q=${encodeURIComponent(query)}&page=${page}&limit=${limit}`;
}

export function animeFullUrl(id) {
    return `${BASE_URL}/anime/${id}/full`;
}

export function animeRecommendationsUrl(id) {
    return `${BASE_URL}/anime/${id}/recommendations`;
}

export function topAnimeUrl(limit) {
    return `${BASE_URL}/top/anime?limit=${limit}`;
}

export function currentSeasonUrl() {
    return `${BASE_URL}/seasons/now`;
}
