import mockUsage from '@/services/mockData/usage.json';

class UsageService {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockUsage];
  }

  async getUserUsage(userId) {
    await new Promise(resolve => setTimeout(resolve, 250));
    return mockUsage.filter(u => u.user_id === userId);
  }

  async recordUsage(userId, toolId, creditsUsed) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const newUsage = {
      Id: Math.max(...mockUsage.map(u => u.Id)) + 1,
      user_id: userId,
      tool_id: toolId,
      credits_used: creditsUsed,
      timestamp: new Date().toISOString()
    };
    mockUsage.push(newUsage);
    return { ...newUsage };
  }

  async getUsageStats() {
    await new Promise(resolve => setTimeout(resolve, 300));
    const totalUsage = mockUsage.reduce((sum, u) => sum + u.credits_used, 0);
    const totalSessions = mockUsage.length;
    const avgCreditsPerSession = totalSessions > 0 ? totalUsage / totalSessions : 0;
    
    return {
      totalUsage,
      totalSessions,
      avgCreditsPerSession: Math.round(avgCreditsPerSession)
    };
  }
}

export const usageService = new UsageService();