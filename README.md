# nederlandsedigitaledienst.github.io

De GitHub Pages-site van de organisatie NederlandseDigitaleDienst. Er staat
geen eigen inhoud op: de site stuurt bezoekers van oude Pages-adressen door
naar waar een website nu staat.

## Wat er doorgestuurd wordt

- De homepage gaat naar `https://digitaledienst.overheid.nl`.
- `/NeRDS/...` gaat naar dezelfde pagina op
  `https://nerds.digitaledienst.overheid.nl/...`. De NeRDS draait sinds
  oktober 2026 op ZAD.

GitHub Pages kan geen echte redirect geven. Daarom staat er per oude pagina een
doorstuurpagina in de map `NeRDS/`, met een directe `meta refresh` en een
canonical naar het nieuwe adres. Google leest dat als een permanente redirect.
`404.html` vangt de adressen op waar geen pagina voor is; een zoekmachine ziet
daar alleen een 404.

## Wanneer een doorverwijzing aan staat

Een repository met een eigen Pages-site gaat voor op deze site. Zolang
`NederlandseDigitaleDienst/NeRDS` nog Pages aan heeft staan, komt
`/NeRDS/...` daar uit en doet de map `NeRDS/` hier niets. De doorverwijzing
gaat aan op het moment dat Pages in die repository uitgaat:

```sh
gh api -X DELETE repos/NederlandseDigitaleDienst/NeRDS/pages
```

## Een verhuisde site toevoegen

1. Zet de site in `MOVED_SITES` in `generate_redirects.py` en draai
   `python generate_redirects.py`. De lijst met pagina's komt uit de sitemap
   van de nieuwe site.
2. Zet dezelfde site in de lijst `moved` in `404.html`.
3. Zet Pages uit in de repository van de oude site.

Draai het script opnieuw als een verhuisde site nieuwe pagina's krijgt.

## Licentie

[European Union Public License v1.2](./LICENSE.md)
