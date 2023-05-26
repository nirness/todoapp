module.exports = function (seconds) {
    return function (req, res, next) {
        setTimeout(next, seconds * 1000)
    }
}
