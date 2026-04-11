import { buildApp } from '../server.js';

describe('Integration Test: Task API with Test DB', () => {
  let app: any;

  beforeAll(async () => {

    app = await buildApp();
    await app.ready();
    
  });

  afterAll(async () => {
    await app.prisma.$disconnect();
    await app.close();
  });

  it('should save a formatted task to the actual test database', async () => {
    const response = await app.inject({
      method: 'POST',
      url: '/tasks',
      payload: {
        title: "  circuit design lab  ",
        userId: "aau-student-1"
      }
    });

    const body = JSON.parse(response.payload);
    expect(response.statusCode).toBe(201);
    const savedTask = await app.prisma.task.findUnique({
      where: { id: body.id }
    });

    expect(savedTask?.title).toBe("CIRCUIT DESIGN LAB"); 
    expect(savedTask?.slug).toBe("circuit-design-lab");
  });
});