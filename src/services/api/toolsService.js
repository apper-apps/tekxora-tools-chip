import mockTools from '@/services/mockData/tools.json';

class ToolsService {
  async getAll() {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [...mockTools];
  }

  async getById(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const tool = mockTools.find(t => t.Id === id);
    if (!tool) {
      throw new Error('Tool not found');
    }
    return { ...tool };
  }

  async create(toolData) {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newTool = {
      Id: Math.max(...mockTools.map(t => t.Id)) + 1,
      ...toolData,
      created_at: new Date().toISOString()
    };
    mockTools.push(newTool);
    return { ...newTool };
  }

  async update(id, toolData) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = mockTools.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error('Tool not found');
    }
    mockTools[index] = { ...mockTools[index], ...toolData };
    return { ...mockTools[index] };
  }

  async delete(id) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const index = mockTools.findIndex(t => t.Id === id);
    if (index === -1) {
      throw new Error('Tool not found');
    }
    mockTools.splice(index, 1);
    return { success: true };
  }
}

export const toolsService = new ToolsService();