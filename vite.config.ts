import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "node:path";

// Public routes that should be indexed. "/cart" is a private, per-visitor page.
const INDEXED_ROUTES = ["/", "/courses"];

function seoFiles(siteUrl: string): Plugin {
  const base = siteUrl.replace(/\/$/, "");
  const sitemap = () =>
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${INDEXED_ROUTES.map(
      (r) => `  <url><loc>${base}${r === "/" ? "/" : r}</loc><changefreq>weekly</changefreq></url>`,
    ).join("\n")}\n</urlset>\n`;
  const robots = () => `User-agent: *\nAllow: /\nDisallow: /cart\n\nSitemap: ${base}/sitemap.xml\n`;

  return {
    name: "hca-seo-files",
    // Serve in dev
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === "/sitemap.xml") {
          res.setHeader("Content-Type", "application/xml");
          return res.end(sitemap());
        }
        if (req.url === "/robots.txt") {
          res.setHeader("Content-Type", "text/plain");
          return res.end(robots());
        }
        next();
      });
    },
    // Emit on build
    generateBundle() {
      this.emitFile({ type: "asset", fileName: "sitemap.xml", source: sitemap() });
      this.emitFile({ type: "asset", fileName: "robots.txt", source: robots() });
    },
    transformIndexHtml(html) {
      return html.replace(/%SITE_URL%/g, base);
    },
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const siteUrl = env.VITE_SITE_URL || "http://localhost:5173";

  return {
    plugins: [react(), seoFiles(siteUrl)],
    resolve: { alias: { "@": path.resolve(__dirname, "src") } },
    server: { port: 5173 },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            react: ["react", "react-dom", "react-router-dom"],
            motion: ["framer-motion"],
          },
        },
      },
    },
  };
});
