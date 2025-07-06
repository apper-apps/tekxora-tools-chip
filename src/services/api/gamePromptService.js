class GamePromptService {
  async generatePrompt(gameName, gameIdea, userId = null) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const creditsUsed = Math.floor(Math.random() * 21) + 40; // 40-60 credits

    const omffPrompt = `
**OMFF ANALYSIS FOR ${gameName.toUpperCase()}**

**OVERVIEW:**
${gameIdea}

**MATERIALS NEEDED:**
- HTML5 Canvas or WebGL setup
- JavaScript game engine (Phaser.js, Three.js, or vanilla JS)
- Image assets:
  - player.png (32x32 or 64x64 pixels)
  - background.png (1920x1080 or tileable)
  - enemy.png (32x32 pixels)
  - collectible.png (16x16 pixels)
  - ui-elements.png (button sprites, health bars)
- Audio assets:
  - background-music.mp3
  - jump-sound.wav
  - collect-sound.wav
  - game-over.wav
- CSS stylesheet for UI elements

**FOLDER STRUCTURE:**
\`\`\`
${gameName.toLowerCase().replace(/\s+/g, '-')}/
│
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── game.js
│   ├── player.js
│   ├── enemy.js
│   └── utils.js
├── assets/
│   ├── images/
│   │   ├── player.png
│   │   ├── background.png
│   │   ├── enemy.png
│   │   └── collectible.png
│   └── sounds/
│       ├── background-music.mp3
│       ├── jump-sound.wav
│       └── collect-sound.wav
└── README.md
\`\`\`

**FEATURES TO IMPLEMENT:**
1. Player movement (WASD or arrow keys)
2. Collision detection system
3. Score tracking and display
4. Health/lives system
5. Level progression
6. Sound effects and background music
7. Game over and restart functionality
8. Local storage for high scores
9. Responsive design for mobile devices
10. Particle effects for enhanced visuals

**TECHNICAL SPECIFICATIONS:**
- Use HTML5 Canvas for rendering
- Implement game loop with requestAnimationFrame
- Object-oriented JavaScript structure
- Mobile-responsive touch controls
- 60 FPS target performance
- Progressive web app capabilities

**GAME MECHANICS:**
- Player spawns at designated start position
- Enemies follow patrol patterns or AI behavior
- Collectibles increase score and may provide power-ups
- Multiple levels with increasing difficulty
- Boss battles at certain intervals
- Power-up system with temporary abilities

**ADDITIONAL RECOMMENDATIONS:**
- Implement save/load game state
- Add achievements system
- Include tutorial/help section
- Optimize for different screen sizes
- Add accessibility features (keyboard navigation, screen reader support)
    `;

    const suggestions = [
      "Add multiplayer support with WebSocket integration",
      "Implement level editor for user-generated content",
      "Add weapon/upgrade system for enhanced gameplay",
      "Include social sharing features for high scores",
      "Add animated cutscenes between levels",
      "Implement achievements and unlock system",
      "Add different game modes (time attack, survival, etc.)",
      "Include customizable player skins/characters"
    ];

    return {
      prompt: omffPrompt,
      suggestions,
      creditsUsed
    };
  }

  async updatePrompt(originalPrompt, selectedSuggestions, userId = null) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const creditsUsed = Math.floor(Math.random() * 21) + 40;

    const suggestionsText = selectedSuggestions.map(s => `- ${s}`).join('\n');
    
    const updatedPrompt = originalPrompt + `\n\n**UPDATED FEATURES:**\n${suggestionsText}\n\n**IMPLEMENTATION NOTES:**\n${selectedSuggestions.map(s => `- ${s}: This feature will require additional development time and resources.`).join('\n')}`;

    return {
      prompt: updatedPrompt,
      creditsUsed
    };
  }
}

export const gamePromptService = new GamePromptService();