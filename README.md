# Aviatrix Research Group Website

A modern, professional website for Aviatrix Research Group (ARG) - a tech, aerospace, and defense research entity. This website showcases ARG's portfolio companies, research projects, and computational research capabilities.

## 🌟 Features

- **Modern Design**: Clean, professional dark theme with blue accents
- **Responsive Layout**: Fully responsive design that works on all devices
- **Interactive Elements**: Smooth animations, floating elements, and hover effects
- **Portfolio Showcase**: Dedicated sections for portfolio companies and research projects
- **GitHub Integration**: Direct links to research repositories and contributions
- **Contact Form**: Functional contact form with validation
- **Mobile-First**: Optimized for mobile devices with hamburger navigation
- **Performance Optimized**: Fast loading with optimized animations and scroll effects

## 🚀 Quick Start

1. **Clone or Download**: Get the website files to your local machine
2. **Open**: Simply open `index.html` in your web browser
3. **Deploy**: Upload the files to any web hosting service

No build process or dependencies required - this is a pure HTML, CSS, and JavaScript website.

## 📁 File Structure

```
aviatrixresearch-site/
├── index.html          # Main HTML file
├── styles.css          # All CSS styles
├── script.js           # JavaScript functionality
└── README.md          # This documentation
```

## 🎨 Design Features

### Color Scheme
- **Primary**: Dark slate background (#0f172a, #1e293b)
- **Accent**: Blue gradients (#3b82f6, #2563eb)
- **Secondary**: Purple accents (#8b5cf6)
- **Text**: Light grays for optimal readability

### Typography
- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear typographic scale for headers and body text

### Animations
- **Floating Elements**: Subtle parallax effect in hero section
- **Scroll Animations**: Elements fade in as they enter viewport
- **Hover Effects**: Interactive feedback on buttons and cards
- **Mobile Menu**: Smooth hamburger menu animation

## 📱 Sections Overview

### Hero Section
- Company introduction with animated elements
- Call-to-action buttons for navigation
- Responsive grid layout

### About Section
- Mission statement and company overview
- Expertise areas with icons:
  - Advanced Computing
  - Aerospace Technology
  - Defense Systems
  - System Integration

### Portfolio Section
- **Avindara**: Links to avindara.com
- **Future Holdings**: Placeholder for expansion
- Clean card-based layout

### Research Section
- **ZEPHYR Project**: GitHub repository showcase
- Open source contributions
- Technology tags and descriptions

### Contact Section
- Contact information and links
- Partnership inquiry form
- GitHub organization link

## 🛠️ Customization

### Adding New Portfolio Companies

1. Open `index.html`
2. Find the portfolio section
3. Add a new portfolio item:

```html
<div class="portfolio-item">
    <div class="portfolio-header">
        <h3>Company Name</h3>
        <a href="https://company-url.com" target="_blank" class="portfolio-link">
            <i class="fas fa-external-link-alt"></i>
        </a>
    </div>
    <p>Company description</p>
    <div class="portfolio-tags">
        <span class="tag">Tag1</span>
        <span class="tag">Tag2</span>
    </div>
</div>
```

### Adding New Research Projects

1. Open `index.html`
2. Find the research grid section
3. Add a new research item:

```html
<div class="research-item">
    <div class="research-header">
        <i class="fas fa-code"></i>
        <h3>Project Name</h3>
        <a href="https://github.com/aviatrixresearch/project" target="_blank" class="research-link">
            <i class="fab fa-github"></i>
        </a>
    </div>
    <p class="research-description">
        Project description
    </p>
    <div class="research-tech">
        <span class="tech-tag">Technology</span>
    </div>
</div>
```

### Modifying Colors

Update the CSS variables in `styles.css`:

```css
:root {
    --primary-blue: #3b82f6;
    --secondary-purple: #8b5cf6;
    --dark-bg: #0f172a;
    --light-text: #e2e8f0;
}
```

### Contact Form Integration

The contact form currently shows success/error notifications. To integrate with a backend:

1. Update the form action in `index.html`
2. Modify the JavaScript in `script.js` to submit to your endpoint
3. Add proper form handling on your server

## 🔧 Technical Details

### Dependencies
- **Google Fonts**: Inter font family
- **Font Awesome**: Icons (CDN)
- **No JavaScript frameworks**: Pure vanilla JS

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

### Performance
- Optimized images and assets
- Throttled scroll events
- Efficient CSS animations
- Minimal external dependencies

## 🚀 Deployment Options

### Static Hosting Services
- **Netlify**: Drag and drop deployment
- **Vercel**: GitHub integration available
- **GitHub Pages**: Free hosting for public repositories
- **AWS S3**: Static website hosting
- **Cloudflare Pages**: Fast global deployment

### Traditional Web Hosting
- Upload files to your web server's public directory
- Ensure all files maintain their relative paths

## 📞 Support

For questions about the website or customization:

1. Check the code comments in each file
2. Review this documentation
3. Modify the content to match your specific needs

## 📄 License

This website template is created for Aviatrix Research Group. Feel free to modify and adapt it for your organization's needs.

## 🔗 Links

- **Aviatrix Research GitHub**: [https://github.com/aviatrixresearch](https://github.com/aviatrixresearch)
- **Avindara**: [https://avindara.com](https://avindara.com)
- **ZEPHYR Project**: [https://github.com/aviatrixresearch/ZEPHYR](https://github.com/aviatrixresearch/ZEPHYR)

---

**Built for Aviatrix Research Group** - Advancing the Future of Technology 