import { signal } from '@angular/core';

// Example: Counter state using signals
export const counter = signal(0);

export function increment() {
  counter.set(counter() + 1);
}

export function decrement() {
  counter.set(counter() - 1);
}

export function reset() {
  counter.set(0);
}
