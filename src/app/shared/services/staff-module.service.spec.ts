import { TestBed } from '@angular/core/testing';

import { StaffModuleService } from './staff-module.service';

describe('StaffModuleService', () => {
  let service: StaffModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
