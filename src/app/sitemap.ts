import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://viesstudios.com.br";

  const routes = [
    "",
    "/servicos",
    "/processo",
    "/cases",
    "/sobre",
    "/contato",
    "/cases/vies-experience",
    "/cases/tsb-parts",
    "/cases/gigantes-nazare-rio-2023",
    "/cases/lic-mtr7-adriano-imperador",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/servicos" ? 0.9 : 0.8,
  }));
}
