function dist(p0, p1) {
    return Math.sqrt(Math.pow(p1.x - p0.x, 2) + Math.pow(p1.y - p0.y, 2));
}
function formatDecimal(n) {
    return n.toFixed(20).match(/^-?\d*\.?0*\d{0,3}/)[0]
}