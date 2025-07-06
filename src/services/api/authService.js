import mockUsers from '@/services/mockData/users.json';

class AuthService {
  async login(email, password) {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const user = mockUsers.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }

    const { password: _, ...userWithoutPassword } = user;
    
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + user.Id
    };
  }

  async signup(email, password, planId = 1) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const planCredits = { 1: 300, 2: 500, 3: 1000 };
    
    const newUser = {
      Id: Math.max(...mockUsers.map(u => u.Id)) + 1,
      email,
      password,
      plan_id: planId,
      credits: planCredits[planId] || 300,
      is_admin: false,
      created_at: new Date().toISOString()
    };

    mockUsers.push(newUser);
    
    const { password: _, ...userWithoutPassword } = newUser;
    
    return {
      user: userWithoutPassword,
      token: 'mock-jwt-token-' + newUser.Id
    };
  }

  async getCurrentUser() {
    await new Promise(resolve => setTimeout(resolve, 200));
    
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    const userId = parseInt(token.split('-').pop());
    const user = mockUsers.find(u => u.Id === userId);
    
    if (!user) {
      throw new Error('User not found');
    }

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }
}

export const authService = new AuthService();