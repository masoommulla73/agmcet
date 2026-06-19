# A.G.M College of Engineering & Technology

Production-grade college landing page built with Next.js App Router, TypeScript, and modern SEO/Performance standards.

## Project Structure
This is a responsive, frontend-only website architecture prepared for future backend/CMS integration.
- `src/app`: Next.js App Router structure, metadata, sitemaps.
- `src/components`: Clean, reusable, section-based UI components.
- `src/lib`: Extracted configuration and data to keep UI separated from content.

## Tech Stack
- Next.js (App Router)
- TypeScript
- TailwindCSS
- Lucide React (Icons)

## Local Development
To start the local development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Deployment Instructions

### Option A: Vercel (Recommended)
This project is natively configured for seamless deployment on Vercel.
1. Push your code to a GitHub repository.
2. Log into [Vercel](https://vercel.com/) and click "Add New Project".
3. Import your GitHub repository.
4. Leave the Framework Preset as "Next.js".
5. Click **Deploy**.

### Option B: Hostinger

**Method 1: Hostinger Node.js Hosting / VPS (Best for Next.js)**
If you are using Hostinger's VPS or Node.js hosting, you can run the full Next.js server (which supports Image Optimization and API routes):
1. Connect to your Hostinger server via SSH or use their terminal.
2. Clone your repository: `git clone your-repo-url`
3. Install dependencies: `npm install`
4. Build the project: `npm run build`
5. Start the server using PM2 (to keep it running in the background): 
   ```bash
   npm install -g pm2
   pm2 start npm --name "agm-frontend" -- start
   ```
6. Set up a reverse proxy (like Nginx) in Hostinger to route your domain to `localhost:3000`.

**Method 2: Hostinger Shared Hosting (Static HTML Export)**
If you are using basic Hostinger Shared Hosting (cPanel/hPanel), you cannot run a Node.js server. You must export the site as static HTML files:
1. Open `next.config.ts` and add `output: 'export'` to the `nextConfig` object.
2. Set images to unoptimized by adding `images: { unoptimized: true }` in `next.config.ts`.
3. Run `npm run build`. This creates an `out` folder containing all static HTML/CSS/JS files.
4. Compress the `out` folder into a `.zip` file.
5. Log into Hostinger hPanel -> File Manager -> `public_html`.
6. Upload and extract the `.zip` file directly into the `public_html` directory.

## POST-DEPLOYMENT SEO CHECKLIST
After the project is successfully deployed to production, please complete these steps:

1. [ ] Add website to [Google Search Console](https://search.google.com/search-console).
2. [ ] Verify domain ownership (via DNS TXT record or HTML file).
3. [ ] Submit `sitemap.xml` directly in Google Search Console (`https://www.yoursite.com/sitemap.xml`).
4. [ ] Request indexing for the homepage and other important pages.
5. [ ] Add website to [Bing Webmaster Tools](https://www.bing.com/toolbox/webmaster).
6. [ ] Submit sitemap to Bing.
7. [ ] Verify `robots.txt` is accessible (`https://www.yoursite.com/robots.txt`).
8. [ ] Test Open Graph preview (use tools like [HeyMeta](https://www.heymeta.com/) or Twitter Card Validator).
9. [ ] Test Mobile Usability in Google Search Console.
10. [ ] Run a Google Lighthouse Audit to ensure 95+ performance metrics.
11. [ ] Fix any Core Web Vitals issues reported over the next few weeks.
12. [ ] Monitor indexing status regularly in Search Console.
