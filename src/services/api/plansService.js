import mockPlans from '@/services/mockData/plans.json';

class PlansService {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 250));
    return [...mockPlans];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const plan = mockPlans.find(p => p.Id === id);
    if (!plan) {
      throw new Error('Plan not found');
    }
    return { ...plan };
  }

  async create(planData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newPlan = {
      Id: Math.max(...mockPlans.map(p => p.Id)) + 1,
      ...planData
    };
    mockPlans.push(newPlan);
    return { ...newPlan };
  }

  async update(id, planData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockPlans.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Plan not found');
    }
    mockPlans[index] = { ...mockPlans[index], ...planData };
    return { ...mockPlans[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockPlans.findIndex(p => p.Id === id);
    if (index === -1) {
      throw new Error('Plan not found');
    }
    mockPlans.splice(index, 1);
    return { success: true };
  }
}

export const plansService = new PlansService();