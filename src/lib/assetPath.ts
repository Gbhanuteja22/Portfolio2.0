/**
 * Returns the correct asset base path depending on environment.
 * On GitHub Actions (production), assets are served under /Portfolio2.0/.
 * Locally, they are served from the root /.
 */
const basePath =
    typeof window !== "undefined"
        ? "" // resolved at runtime — Next.js injects __NEXT_DATA__ with basePath
        : "";

export function assetPath(path: string): string {
    // In static export, Next.js does NOT rewrite plain <img src> paths.
    // We read the basePath that was injected by Next.js into the page at build time.
    if (typeof window !== "undefined") {
        // __next_data__.basePath is set by Next.js
        const nextData = (window as unknown as { __NEXT_DATA__?: { basePath?: string } }).__NEXT_DATA__;
        const base = nextData?.basePath ?? "";
        return `${base}${path}`;
    }
    return path;
}
