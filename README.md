# Resume Builder

A modern, production-ready Resume Builder web application built with React, Vite, and Tailwind CSS. Create professional resumes with a live preview and export them as PDF.

## Features

- **Personal Information** - Full name, email, phone, location, LinkedIn & GitHub URLs
- **Education** - Degree, institution, year, CGPA/percentage
- **Skills** - Dynamically add/remove skills with tag-style input
- **Experience** - Multiple entries with company, role, duration, and description
- **Projects** - Multiple entries with name, technologies, description, and GitHub link
- **Live Preview** - Instantly updates as you type with ATS-friendly layout
- **PDF Export** - Download your resume as a professionally formatted PDF
- **Mobile Responsive** - Fully responsive design that works on all devices
- **Modern UI** - Clean SaaS-style design with smooth animations

## Tech Stack

- **React 19** - UI library
- **Vite 8** - Build tool
- **Tailwind CSS 4** - Styling
- **html2canvas** - DOM-to-canvas rendering for PDF
- **jsPDF** - PDF generation
- **Lucide React** - Icons

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/resume-builder.git
cd resume-builder

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment

### Vercel

1. Push the repository to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Vercel will automatically detect Vite and configure the build settings
4. Click "Deploy" - no additional configuration needed

### Manual Deployment

The project builds static files to the `dist/` directory which can be served by any static hosting provider.

```bash
npm run build
# Serve the dist/ directory
```

## Project Structure

```
src/
├── components/
│   ├── ResumeForm/
│   │   ├── index.jsx       # Form container
│   │   ├── PersonalInfo.jsx
│   │   ├── Education.jsx
│   │   ├── Skills.jsx
│   │   ├── Experience.jsx
│   │   └── Projects.jsx
│   ├── ResumePreview/
│   │   └── index.jsx       # Live resume preview
│   └── Footer/
│       └── index.jsx       # Footer with branding
├── hooks/
│   └── useResumeData.js    # Resume state management
├── App.jsx                  # Main application
├── main.jsx                 # Entry point
└── index.css                # Global styles
```
# Resume-Builder
