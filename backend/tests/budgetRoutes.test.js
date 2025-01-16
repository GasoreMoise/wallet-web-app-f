escribe('Budget Routes', () => {
    test('GET /budgets should fetch all budgets', async () => {
      const response = await request(app).get('/budgets').set('Authorization', `Bearer valid_token`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('budgets');
    });
  
    test('POST /budgets should create a new budget', async () => {
      const newBudget = { category: 'Test Category', amount: 500, duration: 'monthly' };
      const response = await request(app)
        .post('/budgets')
        .send(newBudget)
        .set('Authorization', `Bearer valid_token`);
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('budget');
      expect(response.body.budget.category).toBe('Test Category');
    });
  });