# Modern Portfolio Website - Amal Augustine

A sleek, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Modern Design**: Clean, minimalist design with attention to typography and spacing
- **Dark/Light Mode**: Automatic theme detection with manual toggle
- **Responsive Layout**: Optimized for all device sizes
- **Custom Animations**: Smooth, subtle animations using Framer Motion
- **Page Transitions**: Seamless transitions between pages
- **Accessibility**: ARIA attributes and keyboard navigation
- **SEO Friendly**: Optimized meta tags and semantic HTML
- **Custom Cursor**: Interactive custom cursor for desktop devices
- **Dynamic Background**: Animated gradient background with particles
- **Contact Form**: Functional contact form with validation
- **Optimized Performance**: Fast loading times and optimized assets

## Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Font**: Outfit (Sans) and Syne (Display)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/amalaugustineee/portfolio.git
   ```

2. Install dependencies
   ```
   npm install
   # or
   yarn install
   ```

3. Run the development server
   ```
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Customization

- **Color Scheme**: Edit the colors in `tailwind.config.ts`
- **Content**: Update the text in page components
- **Projects**: Add your projects in `src/pages/projects.tsx`
- **Contact**: Change contact information in `src/pages/contact.tsx`

## Deployment

This portfolio can be easily deployed to platforms like Vercel or Netlify with zero configuration.

### Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/amalaugustineee/portfolio)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Project Structure

```
portfolio/
├── src/
│   ├── components/     # React components
│   ├── pages/         # Next.js pages
│   ├── styles/        # Global styles
│   └── utils/         # Utility functions
├── public/            # Static assets
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── tsconfig.json      # TypeScript configuration
└── package.json       # Dependencies and scripts
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

### Adding New Features

1. Create new components in `src/components/`
2. Add new pages in `src/pages/`
3. Update styles in `src/styles/`
4. Add new utilities in `src/utils/`

## Acknowledgments

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Three.js Documentation](https://threejs.org/docs/)
