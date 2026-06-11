export function convertRating(rating) {
    const roundedRating = Math.ceil(rating * 10) / 10;
    return roundedRating.toFixed(1);
}
