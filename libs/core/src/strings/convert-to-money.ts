export function convertToMoney(number: number): string {
  return number.toLocaleString('en-US', {style: 'currency', currency:'usd'});
}
