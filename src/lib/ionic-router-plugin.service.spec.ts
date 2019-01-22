import { TestBed } from '@angular/core/testing';

import { IonicRouterPluginService } from './ionic-router-plugin.service';

describe('IonicRouterPluginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IonicRouterPluginService = TestBed.get(IonicRouterPluginService);
    expect(service).toBeTruthy();
  });
});
