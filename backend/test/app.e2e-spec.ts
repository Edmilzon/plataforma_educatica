import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { App } from 'supertest/types';

import { AppModule } from './../src/app.module';
import AppDataSource from './../data-source';

describe('AppController (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const module_fixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module_fixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World the Nestjs');
  });
  afterAll(async () => {
    await app.close();
    if (AppDataSource.isInitialized) {
      await AppDataSource.destroy();
    }
  });
});
