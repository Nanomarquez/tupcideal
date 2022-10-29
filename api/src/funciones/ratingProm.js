
const ratingProm = (reviewsArray) => {
    if(reviewsArray) {
    const scores = reviewsArray.map(r => r.rating);
    const ratingProm = scores.length && Number((scores.reduce((a,b) => a + b)/scores.length).toFixed(1));
    return ratingProm;
    }
    return 0;
};

module.exports = ratingProm;