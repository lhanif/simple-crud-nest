import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('E2E API Flow (Auth, Product, Order)', () => {
  let app: INestApplication;
  let token: string;
  let productIds: number[] = [];

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('✅ Register new user', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/register')
      .send({
        email: 'testuser@example.com',
        password: '123456',
        name: 'Test User',
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.email).toBe('testuser@example.com');
  });

  it('✅ Login user and get JWT', async () => {
    const res = await request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'testuser@example.com',
        password: '123456',
      })
      .expect(200);

    expect(res.body).toHaveProperty('access_token');
    token = res.body.access_token;
  });

  it('✅ Create first product', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Laptop Lenovo Legion 5',
        price: 18000000,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    productIds.push(res.body.id);
  });

  it('✅ Create second product', async () => {
    const res = await request(app.getHttpServer())
      .post('/products')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Keyboard Mechanical Keychron',
        price: 1200000,
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    productIds.push(res.body.id);
  });

  it('✅ Get all products', async () => {
    const res = await request(app.getHttpServer())
      .get('/products')
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(2);
  });

  it('✅ Create new order', async () => {
    const res = await request(app.getHttpServer())
      .post('/order')
      .set('Authorization', `Bearer ${token}`)
      .send({
        items: [
          { productId: productIds[0], quantity: 2 },
          { productId: productIds[1], quantity: 1 },
        ],
      })
      .expect(201);

    expect(res.body).toHaveProperty('id');
    expect(res.body.items.length).toBe(2);
    expect(res.body.total).toBeGreaterThan(0);
  });

  it('✅ Get all orders', async () => {
    const res = await request(app.getHttpServer())
      .get('/order')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThan(0);
  });
});
