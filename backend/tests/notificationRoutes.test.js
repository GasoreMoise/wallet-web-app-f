describe('Notification Routes', () => {
    test('GET /notifications should fetch all notifications', async () => {
      const response = await request(app).get('/notifications').set('Authorization', `Bearer valid_token`);
      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('notifications');
    });
  
    test('POST /notifications should create a notification', async () => {
      const newNotification = { title: 'Test Notification', message: 'Test message' };
      const response = await request(app)
        .post('/notifications')
        .send(newNotification)
        .set('Authorization', `Bearer valid_token`);
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('notification');
      expect(response.body.notification.title).toBe('Test Notification');
    });
  });
  