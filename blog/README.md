# Ausflüge & Reisetipps

Der Blog erweitert die bestehende statische Website ohne CMS, neue Node-Abhängigkeiten oder Änderungen am Buchungsablauf. Aktuell: **49 Artikel, 9 Kategorieseiten und eine Blogübersicht**.

## Wo der Blog sichtbar ist

- Navigation und Footer: «Ausflüge & Reisetipps» → `/blog/`.
- Startseite: Reise-Teaser vor den Partnerlogos mit Link zum Europa-Park-Artikel und zur gesamten Übersicht.
- Auf kleinen Bildschirmen liegt der Navigationspunkt im Hamburger-Menü.
- Jede Kategorie besitzt eine echte HTML-Seite unter `/blog/kategorie/<slug>/`. Alle Artikel und Kategorien sind auch ohne JavaScript erreichbar. Die Suche filtert auf der aktuellen Übersichts-/Kategorieseite und speichert den Begriff in `?q=`.

Die lokale Vorschau verwendet derzeit `http://127.0.0.1:8765/blog/`. Das ist keine Veröffentlichung auf swissrentacar.ch.

## Weitere Artikel hinzufügen

1. In `blog/articles.json` einen Artikelblock kopieren und individuell ausarbeiten.
2. Felder bearbeiten: `title`, eindeutiger `slug` (Kleinbuchstaben und Bindestriche), `category`, `categories`, `description`, `image`, `imageAlt`, `date`, `modified`, `seoTitle`, `metaDescription`, `vehicle` und `sections`.
3. `date` ist das tatsächliche Veröffentlichungsdatum, `modified` das Datum der letzten inhaltlichen Änderung; Format jeweils JJJJ-MM-TT. Der Generator erhöht diese Daten nicht bei jedem Build. Alle eingetragenen Artikel werden veröffentlicht; zukünftige Daten sind keine Zeitsteuerung.
4. Jeder Abschnitt enthält `title` und `html`. Absätze, H3 und interne Links sind möglich. H1 und Abschnitts-H2 erzeugt der Generator. Das HTML ist vertrauenswürdiger redaktioneller Inhalt, kein Eingabeformular für Besucher.
5. Optional: `related` mit bis zu drei passenden Artikel-Slugs, `sources` mit Objekten aus `title` und `url`, `faq` mit `question` und `answer`. Fehlen Empfehlungen, wählt der Generator drei Artikel nach gemeinsamer Kategorie aus.
6. Für fremde Fotos bei Bedarf `imageCredit` ergänzen: `author`, `source`, `license`, `licenseUrl`, `changes`. Nur Bilder mit geeigneten Nutzungsrechten verwenden. Symbolbilder ausdrücklich als solche kennzeichnen.
7. Im Projektordner `python3 scripts/build-blog.py` ausführen. Der Generator erzeugt alle Artikel und Kategorieseiten, pflegt die Blogeinträge in `sitemap.xml` und zeichnet seine Ausgaben in `blog/generated-pages.json` auf. Entfernte Artikel werden beim nächsten Build aus den aufgezeichneten Ausgaben entfernt; bei bereits veröffentlichten URLs zuerst ein Weiterleitungsziel planen.
8. `python3 scripts/check-blog.py` ausführen. Danach die erzeugten HTML-Dateien, CSS/JS, verwendete Bilder und `sitemap.xml` zusammen mit der bestehenden Website hochladen. JSON-Änderungen allein aktualisieren die Seiten nicht.

Voraussetzung: Python 3.10 oder neuer. Es sind keine zusätzlichen Python-Pakete erforderlich. Ein normaler Webserver muss Ordner mit `index.html` ausliefern; `/blog` wird üblicherweise auf `/blog/` weitergeleitet. Keine SPA-Fallback-Regel nötig.

## Fahrzeugboxen bearbeiten

Weitere Kategorien lassen sich zentral in `blog/categories.json` mit URL-Slug, Seitentitel und Einleitung pflegen.

`VehicleCTA(vehicle)` in `scripts/build-blog.py` rendert die wiederverwendbare Werbebox. Texte, Bilder, Vorteile und vorhandene Angebots-/Anfragelinks stehen zentral in `blog/vehicles.json`.

| Artikelthema | `vehicle` | Bestehendes Ziel |
| --- | --- | --- |
| Familienausflug | `staria` | `/minivan.html`, `/iframeminivan.html` |
| Europa-Park / Freizeitparks | `europapark` | 9-Plätzer unter `/minivan.html` |
| Skiferien und Gepäck | `ski` | Minivan-Angebot und passende Anfrage |
| Gruppenausflug | `group` | `/minibus.html`, `/iframeminibus.html`, zusätzlicher Minivan-Link |
| Wochenendtrip | `weekend` | `/vehicle.html`, `/iframe.html` |
| Mietwagenfragen | `car` | `/vehicle.html`, `/iframe.html` |
| Umzug / Waren | `cargo` | `/lieferwagen.html`, `/iframelieferwagen.html` |
| Hebebühne | `lift` | `/hebebuehne.html`, `/iframelieferwagen.html` |
| Flughafentransfer | `transfer` | `/airport-transfer.html`, `/contactlimo.html` |
| Airport Parking | `parking` | `/airport.html`, `/contact.html` |
| Hochzeit | `wedding` | `/wedding.html`, `/contactlimo.html` |
| Cabrio | `cabrio` | `/bmw440i.html`, `/iframeauto.html` |
| WEF | `wef` | `/wef-transfer.html`, `/contactlimo.html` |
| Reisebus mit Fahrer | `coach` | `/bus.html`, `/contact.html` |
| Lastwagen | `truck` | `/lkw.html`, `/contact.html` |
| Hoteltransfer | `hotel` | `/hotel-transfer.html`, `/contactlimo.html` |
| Ski-Transfer | `skitransfer` | `/skiresort-transfer.html`, `/contactlimo.html` |

Die Fahrzeugboxen versprechen keine zusätzlichen Angebote, Tarife, verfügbare Dachboxen oder feste Gepäckkapazitäten. Neun Plätze schliessen den Fahrerplatz ein. Bei grösseren Fahrzeugen müssen Fahrberechtigung und konkrete Konfiguration geklärt werden.

## Redaktion und SEO

Die bisherige Übersicht mit zehn Familienzielen bleibt als Einstieg erhalten und verlinkt für jedes Ziel einen eigenen Artikel. Es gibt keine zweite fast identische Europa-Park-Seite: Die bestehende URL deckt auch die Anreise mit dem Auto ab.

Die Seiten enthalten individuelle Meta-Titel und Beschreibungen, Canonicals, Open-Graph-/Twitter-Metadaten, genau eine H1, Bild-Alttexte und Breadcrumbs. Artikel haben `BlogPosting`-Daten mit Autororganisation, Veröffentlichungs-/Änderungsdatum und Bildangaben. Übersichten haben `Blog` bzw. `CollectionPage` mit `ItemList`. Sichtbare Fragen sind als barrierearme aufklappbare Abschnitte umgesetzt; es werden keine FAQ-Rich-Results versprochen.

Kategorien und Artikel sind statisch verlinkt und in der Sitemap. Suchparameter haben die Canonical-URL der jeweiligen Übersichtsseite, keine zusätzlichen Sitemap-Einträge. `robots.txt` lässt Indexierung zu. Ob und wann Google indexiert oder welche Position erreicht wird, entscheidet die Suchmaschine.

Die regionalen Hinweise auf Zürich, Kloten, Winterthur und Schlieren stehen dort, wo sie die Planung erklären. Veränderliche Preise, Öffnungszeiten und Betriebsinformationen werden beim offiziellen Anbieter verlinkt. Ein Teil der Reisebilder stammt aus dem bestehenden Projekt und ist als regionale Illustration oder Symbolbild bezeichnet. Die Europa-Park-Fotos haben sichtbare Lizenznachweise; Details in `img/blog/CREDITS.md`.

Später sinnvoll: nach Veröffentlichung Sitemap in der Search Console einreichen, Indexierung und Suchanfragen beobachten, Inhalte nach echten Fragen vertiefen, eigene Zielfotos ergänzen und Core Web Vitals unter realen Hostingbedingungen messen. Keine Rankinggarantie.

## Technische Pflege und Prüfungen

Header/Footer stammen beim Generieren aus `index.html`. Die Blog-Verlinkung wurde in 80 bestehenden HTML-Seiten ergänzt (`blog/navigation-files.json`). Englische Seiten verweisen vorerst auf den deutschsprachigen Blog.

Die Prüfung kontrolliert alle generierten Seiten, eindeutige Metadaten, Canonicals, H1, strukturierte Daten, interne Links und Anker, Bilder, Fahrzeugzuordnung, Sitemap und HTTP-Auslieferung. Sie startet dafür kurz einen lokalen Server. Das Layout verwendet drei Spalten über 1000 px, zwei Spalten bis 600 px und darunter eine Spalte. Browserprüfungen erfolgen für Desktop- und Smartphone-Breite; es gibt im ursprünglichen Projekt keine Build-/Lint-/Typprüfung mit Node.


## Informationsorientierte Überarbeitung

Alle 49 Artikel beantworten zuerst Leserfragen. Neu pflegbare Felder: `answer` (direkte Kurzantwort), `quickFacts` (drei Einträge mit `label` und `value`), `faq`, `sources`, `sourcesNote`, `reviewed` und `promotion` (kurzer Anbieterhinweis nach dem Inhalt). Die Übersichten enthalten keine Fahrzeugwerbung mehr. Die Anbieterbox ist kompakt und als Hinweis von Swiss Rent a Car erkennbar.

Externe Sachinformationen werden mit verlinkten Quellen versehen. Ablaufvorschläge und Rechenbeispiele sind redaktionelle Hilfen, keine zugesicherten Angebote. Die Lesezeit und `wordCount` werden aus Kurzantwort, Artikel, Fakten und Fragen berechnet, ohne Werbung und Empfehlungen. Strukturierte Daten enthalten Quellenverweise. Bei späteren Änderungen das tatsächliche Quellen- und Änderungsdatum pflegen; ein Build allein gilt nicht als neue inhaltliche Prüfung.

Eine Übersicht aller bearbeiteten Themen steht in `blog/REDAKTIONSPRUEFUNG.md`. Der WEF-Beitrag bleibt unter seiner bestehenden URL, behandelt aber jetzt Bedeutung, Termin, Teilnahme und Anreise statt ausschliesslich die Transferanfrage. Bestehende Blog-URLs wurden erhalten.


## Themenbilder und Bildnachweise

Alle 49 Artikel haben passend ausgewählte Titelbilder. Für Ausflugsziele werden echte Orts- und Museumsaufnahmen verwendet; Fahrzeugthemen verwenden geeignete Fotos aus dem vorhandenen Projektbestand. Die Artikel enthalten `image`, `imageAlt`, `imageWidth`, `imageHeight`, `imageCard` und deren Abmessungen. `imageCredit` enthält bei externen Bildern Urheber, Quellseite, Lizenz und Bearbeitung. `imageFit: "contain"` verhindert bei einzelnen Fahrzeugaufnahmen einen unpassenden Zuschnitt.

Titelbilder und Kartenvorschauen liegen als WebP in `img/blog/themen/`. Der Generator erstellt `srcset` und `sizes`, lädt Kartenvorschauen verzögert und das Titelbild priorisiert. `inlineImages` kann zusätzliche Bilder nach einem Abschnitt mit `afterSection` einfügen; die Bild- und Creditfelder entsprechen dem Titelbild. Der ursprüngliche Europa-Park-Eingang bleibt mit Bildnachweis im Artikel.

Bildnachweise: `img/blog/CREDITS.md`. Quelldaten und Lizenzen: `img/blog/themen/images.json`. Artikelzuordnung: `blog/image-map.json`. Bei einem Bildwechsel nicht nur die URL, sondern auch Alttext, Abmessungen, Vorschau und den passenden Urhebernachweis ändern.
