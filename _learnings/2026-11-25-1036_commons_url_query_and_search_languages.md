# Wikimedia Commons: file URLs now carry a ?utm query, and good photos hide under other languages' titles

**Symptom 1:** `fetch_commons.py get "File:Survivorship-bias.svg"` saved the PNG thumbnail but not the SVG original,
although the code checked `url.lower().endswith(".svg")`.

**Cause:** the API's `imageinfo.url` is now
`https://upload.wikimedia.org/.../Survivorship-bias.svg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&...`.
**Fix:** test `urllib.parse.urlparse(url).path`, not the whole URL.

**Finding 2:** the best photo for the Armenian fridge story, an old ZIL fridge standing in the Yerevan Zoo (portrait,
2592x4608, CC BY-SA 4.0), is titled in Esperanto: "Malnova fridujo ZIL en la Zoo en Erevano 01.jpg". The search
"ZIL refrigerator" found it because Commons also matches descriptions and categories; "Soviet refrigerator" did
not show it at all. The 1966 factory photo has a Russian description (Главархив Москвы).

**Consequences:** search Commons by brand or model name (ZIL, Saratov) and in Russian/Armenian as well as English;
check `credits.json` before publishing, because every file has its own licence (CC BY-SA needs author + licence in
the description: `fetch_commons.py credits <dir>` writes the lines).
