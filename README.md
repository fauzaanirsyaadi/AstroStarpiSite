# Tech Studio Website

A modern full-stack company website built with **Astro** (frontend) and **Strapi CMS** (backend). Features a static website with dynamic blog content, SEO optimization, and Google Analytics integration.

## 🏗️ Architecture

```
tech-studio-website/
├── frontend/          # Astro static site
│   ├── src/
│   │   ├── components/    # Reusable components (Header, Footer)
│   │   ├── layouts/       # Layout templates
│   │   ├── lib/          # Utility functions (Strapi API client)
│   │   ├── pages/        # Site pages and routes
│   │   │   ├── blog/     # Blog listing and article pages
│   │   │   └── ...       # Home, Services, About, Contact
│   │   └── styles/       # Global CSS with Tailwind
│   └── public/           # Static assets
│
└── backend/           # Strapi CMS
    ├── src/
    │   └── api/
    │       └── article/  # Article content type
    ├── config/          # Strapi configuration
    └── database/        # SQLite database (dev)
```

## ✨ Features

### Frontend (Astro)
- 📄 **5 Core Pages**: Home, Services, About, Contact, Blog
- 🎨 **Responsive Design**: Tailwind CSS with mobile-first approach
- 📝 **Dynamic Blog**: Fetch articles from Strapi CMS via REST API
- 🏷️ **Category Filtering**: Browse articles by Technology, Development, Design, Business, Tutorial
- 🔍 **SEO Optimized**: Meta tags, Open Graph, Twitter Cards, automatic sitemap.xml
- 📊 **Google Analytics 4**: Integrated tracking script
- ⚡ **Static Site Generation**: Lightning-fast performance with Astro

### Backend (Strapi CMS)
- 📚 **Article Management**: Rich content editor with categories
- 🗃️ **SQLite Database**: Easy setup for development
- 🔒 **Admin Panel**: Secure content management interface
- 🌐 **REST API**: Automatic API generation for content
- 🔄 **CORS Configured**: Ready for frontend integration

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Git (optional)

### 1. Backend Setup (Strapi)

```bash
cd backend
npm install
npm run develop
```

The Strapi admin panel will open at **http://localhost:1337/admin**

**First-time setup:**
1. Create your admin account
2. Go to Content Manager → Article
3. Create and publish some blog articles
4. Go to Settings → Users & Permissions Plugin → Roles → Public
5. Enable permissions for Article: `find` and `findOne`

### 2. Frontend Setup (Astro)

```bash
cd frontend
npm install
npm run dev
```

The website will be available at **http://localhost:5000**

### 3. Environment Configuration

**Frontend (.env):**
```bash
cp .env.example .env
```

Edit `.env` and set:
```
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX  # Your Google Analytics ID
```

**Backend:**
The backend `.env` file is auto-generated. For production, you'll need to:
1. Generate secure random keys for APP_KEYS, JWT_SECRET, etc.
2. Configure PostgreSQL database credentials

## 📝 Content Management

### Creating Blog Articles in Strapi

1. Navigate to **http://localhost:1337/admin**
2. Go to **Content Manager → Article**
3. Click **Create new entry**
4. Fill in the fields:
   - **Title**: Your article title (slug auto-generates)
   - **Excerpt**: Short description (shown in listings)
   - **Content**: Full article content (supports rich text)
   - **Category**: Select from predefined categories
   - **Featured Image**: Image URL
   - **Author**: Author name
   - **Published Date**: Article publication date
5. Click **Save** and then **Publish**

### Making Articles Public

For the frontend to access articles via API:

1. Go to **Settings → Users & Permissions Plugin → Roles**
2. Click on **Public** role
3. Under **Permissions**, expand **Article**
4. Check: `find` and `findOne`
5. Click **Save**

## 🎨 Customization

### Adding New Pages
Create new `.astro` files in `frontend/src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
---

<Layout title="Your Page Title">
  <Header />
  <main>
    <!-- Your content -->
  </main>
  <Footer />
</Layout>
```

### Modifying Styles
Edit `frontend/src/styles/global.css` or use Tailwind classes directly in components.

### Changing Site Information
- Update site URL in `frontend/astro.config.mjs`
- Modify footer content in `frontend/src/components/Footer.astro`
- Change navigation in `frontend/src/components/Header.astro`

## 🚢 Deployment

### Frontend (Vercel)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure:
   - **Framework Preset**: Astro
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add environment variables:
   - `PUBLIC_STRAPI_URL`: Your Strapi production URL
   - `PUBLIC_GA_MEASUREMENT_ID`: Your GA4 tracking ID

### Backend (Render/Railway)

**Render:**
1. Create new Web Service
2. Connect your repository
3. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`
4. Add environment variables from `.env.example`
5. Create a PostgreSQL database and link it

**Railway:**
1. Create new project from GitHub repo
2. Add PostgreSQL database
3. Configure environment variables
4. Deploy

### GitHub Actions CI/CD

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          working-directory: ./frontend

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        # Add your Render deployment steps
```

## 📊 SEO Features

- ✅ Automatic sitemap.xml generation
- ✅ Meta descriptions on all pages
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card metadata
- ✅ Canonical URLs
- ✅ Semantic HTML structure
- ✅ Google Analytics 4 integration

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| Frontend Framework | Astro 5.x |
| Styling | Tailwind CSS 4.x |
| Language | TypeScript |
| CMS | Strapi 5.x |
| Database (Dev) | SQLite |
| Database (Prod) | PostgreSQL |
| Deployment | Vercel + Render |
| Analytics | Google Analytics 4 |

## 📦 Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

**Backend:**
- `npm run develop` - Start Strapi in development mode
- `npm run start` - Start Strapi in production mode
- `npm run build` - Build admin panel
- `npm run strapi` - Run Strapi CLI commands

## 🐛 Troubleshooting

**Articles not showing on frontend:**
- Ensure Strapi backend is running
- Check that articles are published (not draft)
- Verify Public role has `find` and `findOne` permissions for Article
- Check CORS configuration in `backend/config/middlewares.ts`

**Styles not loading:**
- Clear browser cache
- Restart the Astro dev server
- Check that Tailwind CSS is properly configured

**Database errors:**
- Delete `backend/.tmp` folder and restart Strapi
- For production, ensure PostgreSQL credentials are correct

## 📄 License

MIT License - feel free to use this project for your own websites!

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ using Astro and Strapi
