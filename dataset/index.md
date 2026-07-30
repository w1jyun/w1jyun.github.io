---
layout: default
title: WONPIC-M50
slug: /dataset
blurb: WONPIC-M50 is an in-the-wild travel photography dataset captured with a Canon EOS M50.
extra_css:
  - /dataset/page.css
extra_js:
  - /dataset/page.js
---

<div
  class="dataset-page"
  data-dataset-url="{{ '/webmap/data/photo-map-data.json' | relative_url }}"
  data-map-url="{{ '/webmap/index.html' | relative_url }}"
>
  <section class="dataset-hero">
    <div class="dataset-hero-copy">
      <p class="dataset-kicker">Dataset</p>
      <h1 class="dataset-title">WONPIC-M50</h1>
      <p class="dataset-subtitle">Won's Open-world Natural-scene Photographic Image Collection</p>
      <p class="dataset-description">
        An in-the-wild travel photography dataset captured with a Canon EOS M50. WONPIC-M50 brings together diverse
        natural-scene travel photographs with place labels, capture-time metadata, and an interactive world map for
        browsing the collection.
      </p>
      <div class="dataset-cta-row">
        <a
          class="dataset-download-button"
          href="https://huggingface.co/datasets/jiyunwon/WONPIC-M50"
          target="_blank"
          rel="noreferrer"
        >
          <span class="dataset-download-icon" aria-hidden="true">
            <svg viewBox="0 0 40 40" class="dataset-download-svg" focusable="false">
              <rect x="3" y="3" width="34" height="34" rx="12" fill="#FFCF33" />
              <circle cx="15.5" cy="16.5" r="2.2" fill="#2B2100" />
              <circle cx="24.5" cy="16.5" r="2.2" fill="#2B2100" />
              <path
                d="M13.4 24.1C15 26.3 17.3 27.4 20 27.4C22.7 27.4 25 26.3 26.6 24.1"
                fill="none"
                stroke="#2B2100"
                stroke-linecap="round"
                stroke-width="2.4"
              />
            </svg>
          </span>
          <span class="dataset-download-copy">
            <span class="dataset-download-label">Download on Hugging Face</span>
            <span class="dataset-download-meta">Browse files and request the dataset release</span>
          </span>
        </a>
      </div>
      <div class="dataset-inline-overview">
        <div id="datasetSummaryGrid" class="dataset-summary-grid" aria-live="polite"></div>
      </div>
    </div>

    <div class="dataset-hero-media">
      <div id="datasetHeroGallery" class="dataset-hero-gallery" aria-label="Dataset preview images"></div>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-heading"><strong>Rights &amp; Access</strong></h2>
    <div class="dataset-license-card">
      <p class="dataset-license-copyright">Copyright &copy; 2026 Jiyun Won.</p>
      <p class="dataset-license-lead">
        All images in this release were photographed by Jiyun Won, so reuse and permission requests can be handled directly by a single rights holder.
      </p>
      <ul class="dataset-license-list">
        <li>Research use is allowed with attribution.</li>
        <li>Commercial use requires direct permission from Jiyun Won.</li>
        <li>Contact: <a href="mailto:w1jyun@postech.ac.kr">w1jyun@postech.ac.kr</a></li>
      </ul>
    </div>
  </section>

  <section class="section-block">
    <div class="dataset-map-head">
      <div>
        <h2 class="section-heading"><strong>Interactive Map</strong></h2>
        <p class="dataset-map-copy">
          Explore the collection by location, inspect thumbnails, and open per-image metadata directly from the map.
        </p>
      </div>
      <a class="dataset-button" href="{{ '/webmap/index.html' | relative_url }}?v={{ site.version }}">Open full map</a>
    </div>

    <div class="dataset-map-shell">
      <iframe
        id="datasetMapFrame"
        class="dataset-map-frame"
        title="WONPIC-M50 world photo map"
        loading="lazy"
        src="{{ '/webmap/index.html' | relative_url }}?v={{ site.version }}"
      ></iframe>
    </div>
  </section>

  <section class="section-block">
    <div class="dataset-gallery-head">
      <div>
        <h2 class="section-heading"><strong>All Photos Gallery</strong></h2>
        <p class="dataset-gallery-copy">
          Scan every low-resolution preview image in one dense gallery below the map.
        </p>
      </div>
      <p id="datasetGalleryMeta" class="dataset-gallery-meta" aria-live="polite"></p>
    </div>

    <div class="dataset-gallery-controls" aria-label="Gallery filters">
      <label class="dataset-gallery-field dataset-gallery-field--search">
        <span>Search</span>
        <input id="datasetGallerySearch" type="search" placeholder="place, file, date" />
      </label>
      <label class="dataset-gallery-field">
        <span>Place</span>
        <select id="datasetGalleryPlace">
          <option value="all">All places</option>
        </select>
      </label>
      <label class="dataset-gallery-field">
        <span>Year</span>
        <select id="datasetGalleryYear">
          <option value="all">All years</option>
        </select>
      </label>
      <label class="dataset-gallery-field">
        <span>Time</span>
        <select id="datasetGalleryLight">
          <option value="all">All times</option>
          <option value="day">Day</option>
          <option value="night">Night</option>
        </select>
      </label>
      <button id="datasetGalleryReset" class="dataset-button dataset-button-secondary" type="button">Reset</button>
    </div>

    <div class="dataset-gallery-shell">
      <div id="datasetAllGallery" class="dataset-gallery-grid" aria-live="polite"></div>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-heading"><strong>Distribution</strong></h2>
    <div class="dataset-chart-grid">
      <article class="dataset-chart-card">
        <div class="dataset-card-head">
          <h3>Capture timeline</h3>
          <p>Photo count by year</p>
        </div>
        <div id="datasetYearChart" class="dataset-bar-chart" aria-live="polite"></div>
      </article>

      <article class="dataset-chart-card">
        <div class="dataset-card-head">
          <h3>Most photographed destinations</h3>
          <p>Top mapped place labels</p>
        </div>
        <div id="datasetDestinationChart" class="dataset-bar-chart" aria-live="polite"></div>
      </article>

      <article class="dataset-chart-card">
        <div class="dataset-card-head">
          <h3>Capture resolution families</h3>
          <p>Grouped by image width and height</p>
        </div>
        <div id="datasetResolutionChart" class="dataset-bar-chart" aria-live="polite"></div>
      </article>
    </div>
  </section>

  <section class="section-block">
    <h2 class="section-heading"><strong>Citation</strong></h2>
    <div class="dataset-citation-card">
      <p class="dataset-citation-meta">
        DOI: <a href="https://doi.org/10.5281/zenodo.21699418">10.5281/zenodo.21699418</a>
      </p>
      <pre class="dataset-bibtex"><code>@misc{won2026wonpicm50,
  author = {Won, Jiyun},
  title = {WONPIC-M50: Won's Open-world Natural-scene Photographic Image Collection},
  year = {2026},
  doi = {10.5281/zenodo.21699418},
  url = {https://doi.org/10.5281/zenodo.21699418},
  publisher = {Zenodo},
  note = {Version 2026-07-30}
}</code></pre>
    </div>
  </section>
</div>
