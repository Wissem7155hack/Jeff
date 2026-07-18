import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Nexcore", short_name: "Nexcore", description: "The branded patient app and practice growth dashboard.", start_url: "/", display: "standalone", background_color: "#080808", theme_color: "#080808", icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" }] };
}
