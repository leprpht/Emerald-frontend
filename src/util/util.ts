export function styleNumbers(value: number): string {
    const parts = value.toString().split('.');
    let integerPart = parts[0];
    let decimalPart = parts.length > 1 ? '.' + parts[1] : '';

    if (decimalPart.length === 2) {
        decimalPart += '0';
    } else if (decimalPart.length > 3) {
        decimalPart = decimalPart.slice(0, 3);
    }

    if (integerPart.length >= 4) {
        integerPart = integerPart.slice(0, integerPart.length - 3) + '.' + integerPart.slice(integerPart.length - 3);
    }
    return integerPart + decimalPart;
}