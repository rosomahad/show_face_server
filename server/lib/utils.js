const defaultUnitCurrency = 10000;
module.exports = {
    defaultUnitCurrency,
    async wait(ms) {
        await new Promise(r => {
            setTimeout(() => {
                r();
            }, ms);
        });
    },
    convertToUsd(price, amount) {
        return Math.floor((defaultUnitCurrency / price) * amount);
    },
};
