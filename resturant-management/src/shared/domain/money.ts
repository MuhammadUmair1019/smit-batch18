import { AppError } from '../errors/app-error';

export function toPaisa(amount: number): number {
  const paisa = Math.round(amount * 100);
  if (!Number.isSafeInteger(paisa) || Math.abs(amount * 100 - paisa) > 1e-7) {
    throw new AppError('Amounts must have at most two decimal places', 422, 'INVALID_MONEY_AMOUNT');
  }
  return paisa;
}

export function fromPaisa(amount: number): number {
  return amount / 100;
}
