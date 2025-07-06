class WebsitePromptService {
  async generatePrompt(formData, userId = null) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const creditsUsed = Math.floor(Math.random() * 21) + 40;

    const techStack = formData.techStack === 'Other' ? formData.customTech : formData.techStack;
    const pages = formData.pages.join(', ');
    const features = formData.features.join(', ');

    const prompt = `
**WEBSITE DEVELOPMENT PROMPT: ${formData.websiteName.toUpperCase()}**

**PROJECT OVERVIEW:**
${formData.websiteIdea}

**TECHNICAL SPECIFICATIONS:**
- Technology Stack: ${techStack}
- Development Type: ${this.getTechStackDetails(techStack)}
- Database: ${this.getRecommendedDatabase(techStack)}
- Hosting: ${this.getRecommendedHosting(techStack)}

**PAGES TO DEVELOP:**
${formData.pages.map(page => `- ${page} Page`).join('\n')}

**FEATURES TO IMPLEMENT:**
${formData.features.map(feature => `- ${feature}`).join('\n')}

**FOLDER STRUCTURE:**
${this.generateFolderStructure(techStack, formData.websiteName)}

**DEVELOPMENT PHASES:**

**Phase 1: Setup & Foundation**
- Set up development environment
- Initialize ${techStack} project
- Create basic folder structure
- Set up version control (Git)
- Configure development and production environments

**Phase 2: Database Design**
- Design database schema
- Create necessary tables/collections
- Set up relationships and constraints
- Implement data models

**Phase 3: Backend Development**
- Implement user authentication (if required)
- Create API endpoints
- Set up routing
- Implement business logic
- Database integration

**Phase 4: Frontend Development**
- Create responsive UI design
- Implement all required pages
- Add interactive features
- Optimize for mobile devices
- Cross-browser compatibility

**Phase 5: Integration & Testing**
- Frontend-backend integration
- User testing
- Performance optimization
- Security implementation
- Bug fixes and refinements

**Phase 6: Deployment**
- Production environment setup
- Domain configuration
- SSL certificate installation
- Performance monitoring
- Backup systems

**DESIGN REQUIREMENTS:**
- Mobile-first responsive design
- Modern, clean UI/UX
- Fast loading times (< 3 seconds)
- SEO-optimized structure
- Accessibility compliance (WCAG 2.1)
- Cross-browser compatibility

**SECURITY CONSIDERATIONS:**
- Input validation and sanitization
- SQL injection prevention
- XSS protection
- CSRF protection
- Secure authentication
- Data encryption

**PERFORMANCE OPTIMIZATION:**
- Image optimization
- Code minification
- Caching strategies
- CDN integration
- Database optimization
- Lazy loading implementation

**SEO OPTIMIZATION:**
- Meta tags optimization
- Structured data markup
- XML sitemap
- Robots.txt
- Page speed optimization
- Mobile-friendly design

${formData.additionalRequirements ? `**ADDITIONAL REQUIREMENTS:**\n${formData.additionalRequirements}` : ''}

**TESTING STRATEGY:**
- Unit testing
- Integration testing
- User acceptance testing
- Performance testing
- Security testing
- Cross-browser testing

**MAINTENANCE PLAN:**
- Regular updates and patches
- Performance monitoring
- Security audits
- Backup verification
- Content updates
- Feature enhancements

**ESTIMATED TIMELINE:**
- Planning & Design: 1-2 weeks
- Development: 4-8 weeks
- Testing & Refinement: 1-2 weeks
- Deployment: 1 week
- Total: 7-13 weeks

**BUDGET CONSIDERATIONS:**
- Development costs
- Hosting and domain
- Third-party integrations
- SSL certificates
- Ongoing maintenance
- Marketing and promotion
    `;

    return {
      prompt,
      creditsUsed
    };
  }

  getTechStackDetails(techStack) {
    const details = {
      'WordPress Theme': 'Custom WordPress theme development with PHP',
      'Core PHP': 'Native PHP development with MySQL database',
      'Laravel': 'PHP framework with MVC architecture',
      'Next.js': 'React-based full-stack framework',
      'React': 'Single-page application with React.js',
      'Vue.js': 'Progressive JavaScript framework',
      'Node.js': 'JavaScript runtime for server-side development',
      'Django': 'Python web framework with rapid development'
    };
    return details[techStack] || 'Custom development solution';
  }

  getRecommendedDatabase(techStack) {
    const databases = {
      'WordPress Theme': 'MySQL',
      'Core PHP': 'MySQL',
      'Laravel': 'MySQL/PostgreSQL',
      'Next.js': 'PostgreSQL/MongoDB',
      'React': 'API-based (Node.js backend)',
      'Vue.js': 'API-based (Node.js backend)',
      'Node.js': 'MongoDB/PostgreSQL',
      'Django': 'PostgreSQL/SQLite'
    };
    return databases[techStack] || 'MySQL';
  }

  getRecommendedHosting(techStack) {
    const hosting = {
      'WordPress Theme': 'WordPress hosting (WP Engine, Bluehost)',
      'Core PHP': 'Shared hosting or VPS',
      'Laravel': 'VPS or cloud hosting (DigitalOcean, AWS)',
      'Next.js': 'Vercel, Netlify, or AWS',
      'React': 'Netlify, Vercel, or CDN',
      'Vue.js': 'Netlify, Vercel, or CDN',
      'Node.js': 'Heroku, DigitalOcean, or AWS',
      'Django': 'Heroku, DigitalOcean, or AWS'
    };
    return hosting[techStack] || 'VPS or cloud hosting';
  }

  generateFolderStructure(techStack, siteName) {
    const structures = {
      'WordPress Theme': `
wp-content/
├── themes/
│   └── ${siteName.toLowerCase().replace(/\s+/g, '-')}/
│       ├── style.css
│       ├── index.php
│       ├── functions.php
│       ├── header.php
│       ├── footer.php
│       ├── single.php
│       ├── page.php
│       └── assets/
│           ├── css/
│           ├── js/
│           └── images/`,
      'Core PHP': `
${siteName.toLowerCase().replace(/\s+/g, '-')}/
├── index.php
├── config/
│   └── database.php
├── includes/
│   ├── header.php
│   ├── footer.php
│   └── functions.php
├── pages/
├── assets/
│   ├── css/
│   ├── js/
│   └── images/
└── uploads/`,
      'Laravel': `
${siteName.toLowerCase().replace(/\s+/g, '-')}/
├── app/
├── bootstrap/
├── config/
├── database/
├── public/
├── resources/
├── routes/
├── storage/
├── tests/
└── vendor/`,
      'Next.js': `
${siteName.toLowerCase().replace(/\s+/g, '-')}/
├── pages/
├── components/
├── public/
├── styles/
├── utils/
├── api/
├── package.json
└── next.config.js`
    };
    
    return structures[techStack] || `
${siteName.toLowerCase().replace(/\s+/g, '-')}/
├── src/
├── public/
├── assets/
├── components/
└── utils/`;
  }
}

export const websitePromptService = new WebsitePromptService();