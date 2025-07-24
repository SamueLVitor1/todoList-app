/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StorageService } from './storage.service';

describe('Service: Storage', () => {
  let service: StorageService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StorageService]
    });
    service = TestBed.inject(StorageService);

    localStorage.clear();

    spyOn(localStorage, 'setItem').and.callThrough();
    spyOn(localStorage, 'getItem').and.callThrough();
    spyOn(localStorage, 'removeItem').and.callThrough();
    spyOn(localStorage, 'clear').and.callThrough();

  });

  it('should be created', inject([StorageService], (service: StorageService) => {
    expect(service).toBeTruthy();
  }));

  it('setItem() should call localStorage.setItem with JSON string', () => {
    const obj = { a: 1, b: 'x' };
    service.setItem('key1', obj);
    expect(localStorage.setItem).toHaveBeenCalledWith('key1', JSON.stringify(obj));
  });

  it('getItem() should return parsed object when key exists', () => {
    const stored = { foo: 'bar' };
    localStorage.setItem('key2', JSON.stringify(stored));

    const result = service.getItem<typeof stored>('key2');
    expect(localStorage.getItem).toHaveBeenCalledWith('key2');
    expect(result).toEqual(stored);
  })

  it('getItem() should return null when key does not exist', () => {
    localStorage.removeItem('nope');
    const result = service.getItem('nope');
    expect(localStorage.getItem).toHaveBeenCalledWith('nope');
    expect(result).toBeNull();
  });

  it('removeItem() should call localStorage.removeItem', () => {
    service.removeItem('key3');
    expect(localStorage.removeItem).toHaveBeenCalledWith('key3');
  });

  it('clear() should call localStorage.clear', () => {
    service.clear();
    expect(localStorage.clear).toHaveBeenCalled();
  });
});
