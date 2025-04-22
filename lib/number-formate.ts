export function formatNumberShort(n: number): string {
    if (n >= 1_000_000) {
        return `${Math.floor(n / 100_000) / 10}M+`;
    } else if (n >= 1_000) {
        return `${Math.floor(n / 100) / 10}k+`;
    } else {
        return `${n}`;
    }
}
