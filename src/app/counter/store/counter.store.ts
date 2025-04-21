import { computed } from '@angular/core';
import { patchState, signalStore, withState, withMethods, withComputed } from '@ngrx/signals';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0
};

export const CounterStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store) => ({
    increment() {
      patchState(store, (state: CounterState) => ({ count: state.count + 1 }));
    },
    decrement() {
      patchState(store, (state: CounterState) => ({ count: state.count - 1 }));
    },
    reset() {
      patchState(store, initialState);
    }
  })),
  withComputed((store) => ({
    doubleCount: computed(() => store.count() * 2)
  }))
);
