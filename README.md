# Codeo - Transform Screenshots to Code

AI-powered tool that converts any UI screenshot into clean, production-ready code.

## 🚀 Features

- **Smart Recognition**: Advanced AI detects UI elements, layouts, and design patterns
- **Multiple Frameworks**: Support for React, Vue.js, HTML/CSS, Tailwind CSS, Bootstrap
- **Real-time Preview**: See your code generated instantly as you upload screenshots
- **Code Editor**: Built-in Monaco editor with syntax highlighting
- **Export Options**: Copy to clipboard or download generated code
- **Project Management**: Organize and track all your conversions
- **Team Collaboration**: Work together with your team (Pro plan)

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Shadcn/UI** - Modern React components
- **Monaco Editor** - Code editing experience
- **Lucide React** - Beautiful icons

### Backend (Planned)
- **NestJS** - Node.js framework
- **Supabase** - Database and authentication
- **Bull Queue** - Job processing for AI tasks
- **OpenCV + FastSAM** - Computer vision pipeline

## 📦 Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd codeo-ui
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🎯 Pages

- **/** - Landing page with hero, features, and CTA
- **/pricing** - Pricing plans (Free, Pro, Team)
- **/login** - User authentication
- **/signup** - User registration
- **/dashboard** - User dashboard with projects and stats
- **/workspace** - Main workspace for screenshot-to-code conversion

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# NextAuth.js
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000

# AI Pipeline (when implemented)
AI_SERVICE_URL=your_ai_service_url
```

## 🎨 Design System

The project uses a consistent design system based on:

- **Colors**: Blue primary palette with gray neutrals
- **Typography**: Inter font family
- **Spacing**: Tailwind's default spacing scale
- **Components**: Shadcn/UI component library
- **Responsive**: Mobile-first approach

## 📱 Responsive Design

All pages are fully responsive:
- **Mobile**: 320px and up
- **Tablet**: 768px and up  
- **Desktop**: 1024px and up

## 🔒 Authentication

Authentication is handled by NextAuth.js with support for:
- Email/password authentication
- Google OAuth
- GitHub OAuth

## 💾 Project Structure

```
codeo-ui/
├── app/                    # Next.js App Router
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── pricing/           # Pricing page
│   ├── dashboard/         # Dashboard page
│   └── workspace/         # Workspace page
├── components/            # Reusable components
│   └── ui/               # Shadcn/UI components
├── lib/                   # Utility functions
└── public/               # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS Amplify

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you have any questions or need help, please:
- Open an issue on GitHub
- Contact our support team
- Check our documentation

## 🗺️ Roadmap

- [ ] AI pipeline implementation
- [ ] Team collaboration features
- [ ] Advanced code customization
- [ ] Plugin system
- [ ] Mobile app
- [ ] API access
- [ ] Custom branding options

---

Built with ❤️ by the Codeo team
