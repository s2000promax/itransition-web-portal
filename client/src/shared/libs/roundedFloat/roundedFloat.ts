export const roundedFloat = (number?: number) => {
    if (number) {
        const roundedNumber = parseFloat(number.toFixed(1));

        return roundedNumber.toString(10);
    }

    return '0';
};
