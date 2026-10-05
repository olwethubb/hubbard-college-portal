import { useEffect } from "react";
import { SITE_DESCRIPTION, SITE_URL } from "@/lib/site";

interface SeoOptions {
  title: string;
  description?: string;
  /** Path for the canonical URL, e.g. "/courses". */
  path?: string;
  noindex?: boolean;
  /** Optional JSON-LD object injected for this page only. */
  jsonLd?: object;
}

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/** Per-route document title, description, canonical, OG tags and optional JSON-LD. */
export function useSeo({ title, description = SITE_DESCRIPTION, path, noindex, jsonLd }: SeoOptions) {
  const jsonLdString = jsonLd ? JSON.stringify(jsonLd) : "";

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");

    if (path !== undefined) {
      const url = SITE_URL + path;
      let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!link) {
        link = document.createElement("link");
        link.rel = "canonical";
        document.head.appendChild(link);
      }
      link.href = url;
      setMeta("property", "og:url", url);
      setMeta("name", "twitter:url", url);
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLdString) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.page = "true";
      script.textContent = jsonLdString;
      document.head.appendChild(script);
    }
    return () => script?.remove();
  }, [title, description, path, noindex, jsonLdString]);
}
