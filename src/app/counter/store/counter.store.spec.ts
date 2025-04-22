import { TestBed } from '@angular/core/testing';
import { CounterStore } from './counter.store';

describe('CounterStore', () => {
  let store: InstanceType<typeof CounterStore>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CounterStore]
    });
    store = TestBed.inject(CounterStore);
  });

  it('should be created', () => {
    expect(store).toBeTruthy();
  });

  it('should have initial count of 0', () => {
    expect(store.count()).toBe(0);
  });

  it('should increment count', () => {
    store.increment();
    expect(store.count()).toBe(1);
  });

  it('should decrement count', () => {
    store.increment();
    store.decrement();
    expect(store.count()).toBe(0);
  });

  it('should reset count', () => {
    store.increment();
    store.increment();
    store.reset();
    expect(store.count()).toBe(0);
  });

  it('should compute double count', () => {
    store.increment();
    store.increment();
    expect(store.doubleCount()).toBe(4);
  });
});
