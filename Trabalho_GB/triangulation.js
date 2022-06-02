// Dummy

function triangulation(P) {
    return [
        [rand(0, P.length), rand(0, P.length), rand(0, P.length)],
        [rand(0, P.length), rand(0, P.length), rand(0, P.length)],
        [rand(0, P.length), rand(0, P.length), rand(0, P.length)],
        [rand(0, P.length), rand(0, P.length), rand(0, P.length)]
    ]
}

function rand(lowerBound, upperBound) {
    return Math.floor(Math.random() * upperBound) + lowerBound
}