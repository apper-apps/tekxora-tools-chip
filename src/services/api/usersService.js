import mockUsers from '@/services/mockData/users.json';

class UsersService {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockUsers.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = mockUsers.find(u => u.Id === id);
    if (!user) {
      throw new Error('User not found');
    }
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  }

  async update(id, userData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers[index] = { ...mockUsers[index], ...userData };
    const { password, ...userWithoutPassword } = mockUsers[index];
    return userWithoutPassword;
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers.splice(index, 1);
    return { success: true };
  }

  async updateCredits(id, credits) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockUsers.findIndex(u => u.Id === id);
    if (index === -1) {
      throw new Error('User not found');
    }
    mockUsers[index].credits = credits;
    const { password, ...userWithoutPassword } = mockUsers[index];
    return userWithoutPassword;
  }
}

export const usersService = new UsersService();