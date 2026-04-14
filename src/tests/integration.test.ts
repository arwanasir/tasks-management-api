import { buildApp } from '../server.js';

describe('Integration Test: Task API with Test DB', () => {
  let app: any;
  let token: string;

  beforeAll(async () => {
    app = await buildApp();
    await app.ready();
    
    token = app.jwt.sign({ id:'test-id', email: 'student@aau.edu' });
  });

  afterAll(async () => {
    await app.prisma.$disconnect();
    await app.close();
  });

  it('should save a formatted task to the actual test database', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      headers: {
        authorization: `Bearer ${token}` 
      },
      payload: {
        title: "   circuit design lab   "
       
      }
    });

    expect(response.statusCode).toBe(201); 
    
    const body = JSON.parse(response.payload);
    const savedTask = await app.prisma.task.findUnique({
      where: { id: body.id }
    });

    expect(savedTask?.title).toBe(" DESIGN LAB"); 
  });
});