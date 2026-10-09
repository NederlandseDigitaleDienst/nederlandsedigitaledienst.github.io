#!/usr/bin/env python3
"""
Write a redirect page for every page of a site that moved off GitHub Pages.

GitHub Pages cannot answer with a real redirect. The 404 page of this site
sends visitors on, but a search engine only sees the 404. A real page with an
instant meta refresh is read as a permanent redirect, so each old address gets
one.

    python generate_redirects.py
    python generate_redirects.py NeRDS=https://example.org/sitemap.xml

Run it again when a moved site gets new pages. The list of pages comes from
the sitemap of the new site; the second form reads it from another address,
for a site whose new address does not answer yet.
"""

import re
import sys
import urllib.request
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# Old directory on nederlandsedigitaledienst.github.io -> new address.
#
#     "Site": {
#         "target": "https://site.example.org",
#         "sitemap": "https://site.example.org/sitemap.xml",
#     },
#
# A site without a sitemap takes "pages": ["", "about/"] instead.
MOVED_SITES: dict[str, dict] = {}

PAGE = """<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <title>Deze pagina is verhuisd</title>
    <link rel="canonical" href="{url}">
    <script>
        // Takes the query string and the anchor along; the meta refresh below cannot.
        window.location.replace("{url}" + window.location.search + window.location.hash);
    </script>
    <meta http-equiv="refresh" content="0; url={url}">
</head>
<body>
    <p>Deze pagina is verhuisd naar <a href="{url}">{url}</a>.</p>
</body>
</html>
"""


def pages_from_sitemap(sitemap_url: str) -> list[str]:
    """The paths below the directory the sitemap itself is in."""
    with urllib.request.urlopen(sitemap_url, timeout=30) as response:
        sitemap = response.read().decode("utf-8")
    base = sitemap_url.rsplit("/", 1)[0] + "/"
    locations = re.findall(r"<loc>([^<]+)</loc>", sitemap)
    return sorted(location.removeprefix(base) for location in locations if location.startswith(base))


def write_site(directory: str, site: dict, sitemap_url: str | None) -> int:
    pages = site.get("pages") or pages_from_sitemap(sitemap_url or site["sitemap"])
    for page in pages:
        url = f"{site['target']}/{page}"
        relative = page if page.endswith(".html") else f"{page}index.html"
        output = ROOT / directory / relative
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(PAGE.format(url=escape(url, quote=True)), encoding="utf-8")
    return len(pages)


def main() -> None:
    overrides = dict(argument.split("=", 1) for argument in sys.argv[1:])
    for directory, site in MOVED_SITES.items():
        print(f"{directory}: {write_site(directory, site, overrides.get(directory))} pages")


if __name__ == "__main__":
    main()
