(function () {
  const NUMBER_FORMATTER = new Intl.NumberFormat("en-US");
  const LOADING_MESSAGE = "Loading dataset summary...";
  const ERROR_MESSAGE = "Unable to load the dataset overview right now.";
  const LOADING_TARGET_IDS = [
    "datasetHeroStats",
    "datasetHeroGallery",
    "datasetSummaryGrid",
    "datasetAllGallery",
    "datasetYearChart",
    "datasetDestinationChart",
    "datasetResolutionChart",
  ];
  const HERO_GALLERY_FILE_NAMES = ["IMG_3352.JPG", "IMG_1465.JPG", "IMG_5637.JPG"];
  const galleryState = {
    allPhotos: [],
    filteredPhotos: [],
  };
  const EXACT_PLACE_LABELS = {
    "미국 로스앤젤레스 그리피스 천문대": "Griffith Observatory, Los Angeles, United States",
    "미국 로스앤젤레스 산타모니카 해변": "Santa Monica Beach, Los Angeles, United States",
    "대한민국 경상북도 포항시 남구": "Nam-gu, Pohang, North Gyeongsang, South Korea",
    "대한민국 경상북도 포항시 북구": "Buk-gu, Pohang, North Gyeongsang, South Korea",
    "대한민국 대구 이현공원": "Ihyeon Park, Daegu, South Korea",
    "경상북도 포항시 남구 도구해수욕장": "Dogu Beach, Nam-gu, Pohang, North Gyeongsang, South Korea",
    "체코 프라하": "Prague, Czech Republic",
    "스페인 마요르카": "Mallorca, Spain",
    "스페인 바르셀로나": "Barcelona, Spain",
    "포르투갈 포르토": "Porto, Portugal",
    "이탈리아 로마": "Rome, Italy",
    "서울 푸르지오 아트홀": "Seoul Prugio Art Hall",
    "부다페스트, Budapest, 헝가리": "Budapest, Hungary",
    "브뤼셀, Région de Bruxelles-Capitale - Brussels Hoofdstedelijk Gewest, 벨기에":
      "Brussels, Brussels-Capital Region, Belgium",
    "Chefchaouen ⴰⵛⵛⴰⵡⵏ شفشاون, Tanger-Tétouan-Al Hoceïma ⵟⴰⵏⵊ-ⵟⵉⵜⴰⵡⵉⵏ-ⵍⵃⵓⵙⵉⵎⴰ طنجة تطوان الحسيمة, 모로코":
      "Chefchaouen, Tanger-Tetouan-Al Hoceima, Morocco",
    "Rissani, Cercle d'Er-Rissani, Drâa-Tafilalet, 모로코":
      "Rissani, Cercle d'Er-Rissani, Draa-Tafilalet, Morocco",
    "Calvià, Serra de Tramuntana, 발레아레스 제도, 스페인":
      "Calvia, Serra de Tramuntana, Balearic Islands, Spain",
    "Nacka kommun, 스웨덴": "Nacka Municipality, Sweden",
    "코타키나발루（야비）, 사바, 말레이시아": "Kota Kinabalu, Sabah, Malaysia",
  };
  const TOKEN_REPLACEMENTS = [
    ["대한민국", "South Korea"],
    ["미국", "United States"],
    ["프랑스", "France"],
    ["독일", "Germany"],
    ["스페인", "Spain"],
    ["오스트리아", "Austria"],
    ["체코", "Czech Republic"],
    ["캐나다", "Canada"],
    ["벨기에", "Belgium"],
    ["스웨덴", "Sweden"],
    ["스위스", "Switzerland"],
    ["헝가리", "Hungary"],
    ["이탈리아", "Italy"],
    ["말레이시아", "Malaysia"],
    ["모로코", "Morocco"],
    ["경상북도", "North Gyeongsang"],
    ["서울특별시", "Seoul"],
    ["포항시", "Pohang-si"],
    ["강구면", "Ganggu-myeon"],
    ["강릉시", "Gangneung-si"],
    ["경주시", "Gyeongju-si"],
    ["대구", "Daegu"],
    ["이현공원", "Ihyeon Park"],
    ["덴버", "Denver"],
    ["콜로라도", "Colorado"],
    ["드레스덴", "Dresden"],
    ["작센", "Saxony"],
    ["로스앤젤레스", "Los Angeles"],
    ["캘리포니아", "California"],
    ["매화면", "Maehwa-myeon"],
    ["울진군", "Uljin-gun"],
    ["바르셀로나", "Barcelona"],
    ["카탈루냐", "Catalonia"],
    ["브리티시컬럼비아주", "British Columbia"],
    ["베르사유", "Versailles"],
    ["일드프랑스", "Ile-de-France"],
    ["브뤼셀", "Brussels"],
    ["빈", "Vienna"],
    ["샌타모니카", "Santa Monica"],
    ["서귀포시", "Seogwipo-si"],
    ["남원읍", "Namwon-eup"],
    ["속초시", "Sokcho-si"],
    ["슈투트가르트", "Stuttgart"],
    ["바덴뷔르템베르크", "Baden-Wurttemberg"],
    ["스톡홀름", "Stockholm"],
    ["마요르카", "Mallorca"],
    ["예테보리", "Gothenburg"],
    ["웁살라", "Uppsala"],
    ["이시레몰리노", "Issy-les-Moulineaux"],
    ["인터라켄", "Interlaken"],
    ["잘츠부르크", "Salzburg"],
    ["장크트 길겐", "Sankt Gilgen"],
    ["카를스루에", "Karlsruhe"],
    ["파리", "Paris"],
    ["팔마데", "Palma"],
    ["포르투갈", "Portugal"],
    ["포르토", "Porto"],
    ["구룡포읍", "Guryongpo-eup"],
    ["폼페이", "Pompeii"],
    ["프라하", "Prague"],
    ["하이델베르크", "Heidelberg"],
    ["발레아레스 제도", "Balearic Islands"],
    ["루체른", "Lucerne"],
    ["애리조나", "Arizona"],
    ["유타", "Utah"],
    ["네바다", "Nevada"],
    ["베른", "Bern"],
    ["사바", "Sabah"],
    ["남구", "Nam-gu"],
    ["북구", "Buk-gu"],
    ["도구해수욕장", "Dogu Beach"],
    ["그리피스 천문대", "Griffith Observatory"],
    ["산타모니카 해변", "Santa Monica Beach"],
  ];

  document.addEventListener("DOMContentLoaded", initDatasetPage);

  async function initDatasetPage() {
    const root = document.querySelector(".dataset-page");

    if (!root) {
      return;
    }

    LOADING_TARGET_IDS.forEach((targetId) => renderLoading(targetId, LOADING_MESSAGE));

    try {
      const response = await fetch(root.dataset.datasetUrl, { cache: "no-store" });

      if (!response.ok) {
        throw new Error("Failed to fetch dataset JSON.");
      }

      const data = await response.json();
      const photos = Array.isArray(data.photos) ? data.photos.filter(isValidPhoto) : [];
      const stats = buildStats(photos, data);

      renderHeroStats(stats);
      renderHeroGallery(photos);
      renderSummaryGrid(stats);
      initializeGalleryFilters(photos);
      renderCharts(photos, data);
    } catch (error) {
      console.error(error);
      LOADING_TARGET_IDS.forEach((targetId) => renderError(targetId, ERROR_MESSAGE));
    }
  }

  function isValidPhoto(photo) {
    return photo && typeof photo === "object" && photo.previewUrl && photo.placeLabel;
  }

  function buildStats(photos, data) {
    const mappedLocationCount = new Set(
      photos
        .map((photo) => photo.coordCluster || coordinateKey(photo.lat, photo.lng))
        .filter(Boolean)
    ).size;
    const mappedPlaceCount = new Set(photos.map((photo) => normalizePlaceLabel(photo.placeLabel))).size;
    const regionCount = new Set(
      photos
        .map((photo) => extractRegionBucket(photo.placeLabel))
        .filter(Boolean)
    ).size;

    return {
      photoCount: Number(data.photoCount) || photos.length,
      mappedLocationCount,
      mappedPlaceCount,
      regionCount,
    };
  }

  function renderHeroStats(stats) {
    const items = [
      { label: "Photos", value: formatNumber(stats.photoCount) },
      { label: "Map pins", value: formatNumber(stats.mappedLocationCount) },
      { label: "Regions", value: formatNumber(stats.regionCount) },
    ];

    renderSimpleCards("datasetHeroStats", items, {
      cardClassName: "dataset-mini-stat",
      labelClassName: "dataset-mini-stat-label",
      valueClassName: "dataset-mini-stat-value",
    });
  }

  function renderHeroGallery(photos) {
    const container = document.getElementById("datasetHeroGallery");

    if (!container) {
      return;
    }

    const samples = pickPreferredGallerySamples(photos, HERO_GALLERY_FILE_NAMES, 3);

    if (!samples.length) {
      renderError("datasetHeroGallery", "No preview images are available yet.");
      return;
    }

    container.innerHTML = samples
      .map((photo) => {
        const label = normalizePlaceLabel(photo.placeLabel);
        const caption = `${label} - ${photo.year || "Unknown"}`;

        return `
          <figure class="dataset-hero-gallery-item">
            <img src="${escapeAttribute(photo.previewUrl)}" alt="${escapeAttribute(label)} preview" loading="lazy" />
            <figcaption class="dataset-hero-gallery-caption">${escapeHtml(caption)}</figcaption>
          </figure>
        `;
      })
      .join("");
  }

  function renderSummaryGrid(stats) {
    const items = [
      {
        label: "Mapped photos",
        value: formatNumber(stats.photoCount),
        note: "EOS M50 JPG images with low-resolution preview links.",
      },
      {
        label: "Mapped locations",
        value: formatNumber(stats.mappedLocationCount),
        note: `${formatNumber(stats.mappedPlaceCount)} unique place labels are grouped into map pins.`,
      },
      {
        label: "Countries / regions",
        value: formatNumber(stats.regionCount),
        note: "Distinct terminal region labels extracted from place metadata.",
      },
    ];

    const container = document.getElementById("datasetSummaryGrid");

    if (!container) {
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
          <article class="dataset-summary-card">
            <span class="dataset-summary-label">${escapeHtml(item.label)}</span>
            <span class="dataset-summary-value">${escapeHtml(item.value)}</span>
            <p class="dataset-summary-note">${escapeHtml(item.note)}</p>
          </article>
        `
      )
      .join("");
  }

  function initializeGalleryFilters(photos) {
    galleryState.allPhotos = photos.filter((photo) => photo && photo.previewUrl);

    const placeSelect = document.getElementById("datasetGalleryPlace");
    const yearSelect = document.getElementById("datasetGalleryYear");
    const lightSelect = document.getElementById("datasetGalleryLight");
    const searchInput = document.getElementById("datasetGallerySearch");
    const resetButton = document.getElementById("datasetGalleryReset");

    if (placeSelect) {
      const places = countBy(
        galleryState.allPhotos
          .map((photo) => normalizePlaceLabel(photo.placeLabel))
          .filter(Boolean)
      ).sort((left, right) => left.label.localeCompare(right.label));

      placeSelect.innerHTML = [
        '<option value="all">All places</option>',
        ...places.map(
          (place) =>
            `<option value="${escapeAttribute(place.label)}">${escapeHtml(place.label)} (${formatNumber(place.count)})</option>`
        ),
      ].join("");
    }

    if (yearSelect) {
      const years = Array.from(
        new Set(
          galleryState.allPhotos
            .map((photo) => String(photo.year || "").trim())
            .filter(Boolean)
        )
      ).sort((left, right) => String(left).localeCompare(String(right)));

      yearSelect.innerHTML = [
        '<option value="all">All years</option>',
        ...years.map(
          (year) => `<option value="${escapeAttribute(year)}">${escapeHtml(year)}</option>`
        ),
      ].join("");
    }

    searchInput?.addEventListener("input", applyGalleryFilters);
    placeSelect?.addEventListener("change", applyGalleryFilters);
    yearSelect?.addEventListener("change", applyGalleryFilters);
    lightSelect?.addEventListener("change", applyGalleryFilters);
    resetButton?.addEventListener("click", resetGalleryFilters);

    applyGalleryFilters();
  }

  function resetGalleryFilters() {
    const placeSelect = document.getElementById("datasetGalleryPlace");
    const searchInput = document.getElementById("datasetGallerySearch");
    const yearSelect = document.getElementById("datasetGalleryYear");
    const lightSelect = document.getElementById("datasetGalleryLight");

    if (searchInput) {
      searchInput.value = "";
    }

    if (placeSelect) {
      placeSelect.value = "all";
    }

    if (yearSelect) {
      yearSelect.value = "all";
    }

    if (lightSelect) {
      lightSelect.value = "all";
    }

    applyGalleryFilters();
  }

  function applyGalleryFilters() {
    const placeSelect = document.getElementById("datasetGalleryPlace");
    const searchInput = document.getElementById("datasetGallerySearch");
    const yearSelect = document.getElementById("datasetGalleryYear");
    const lightSelect = document.getElementById("datasetGalleryLight");
    const query = String(searchInput?.value || "")
      .trim()
      .toLowerCase();
    const place = String(placeSelect?.value || "all");
    const year = String(yearSelect?.value || "all");
    const light = String(lightSelect?.value || "all");

    galleryState.filteredPhotos = galleryState.allPhotos.filter((photo) => {
      const normalizedPlace = normalizePlaceLabel(photo.placeLabel);

      if (place !== "all" && normalizedPlace !== place) {
        return false;
      }

      if (year !== "all" && String(photo.year || "") !== year) {
        return false;
      }

      if (light !== "all" && classifyCaptureTime(photo) !== light) {
        return false;
      }

      if (query && !buildGallerySearchText(photo).includes(query)) {
        return false;
      }

      return true;
    });

    renderAllGallery(galleryState.filteredPhotos, galleryState.allPhotos.length);
  }

  function renderAllGallery(photos, totalCount = photos.length) {
    const container = document.getElementById("datasetAllGallery");
    const meta = document.getElementById("datasetGalleryMeta");

    if (!container) {
      return;
    }

    const galleryPhotos = photos.filter((photo) => photo && photo.previewUrl);

    if (meta) {
      meta.textContent =
        totalCount > galleryPhotos.length
          ? `Showing ${formatNumber(galleryPhotos.length)} of ${formatNumber(totalCount)} preview images`
          : `${formatNumber(galleryPhotos.length)} preview images`;
    }

    if (!galleryPhotos.length) {
      container.innerHTML = `<div class="dataset-gallery-empty">${escapeHtml(
        totalCount ? "No images match the current gallery filters." : "No preview images are available yet."
      )}</div>`;
      return;
    }

    container.innerHTML = galleryPhotos
      .map((photo) => {
        const label = normalizePlaceLabel(photo.placeLabel);
        const dateLabel = [photo.date, photo.time].filter(Boolean).join(" ");
        const title = [photo.fileName, label, dateLabel].filter(Boolean).join(" | ");

        return `
          <a
            class="dataset-gallery-item"
            href="${escapeAttribute(photo.previewUrl)}"
            target="_blank"
            rel="noreferrer noopener"
            title="${escapeAttribute(title)}"
            aria-label="${escapeAttribute(title)}"
          >
            <img
              src="${escapeAttribute(photo.previewUrl)}"
              alt="${escapeAttribute(photo.fileName || label || "Dataset preview image")}"
              loading="lazy"
              decoding="async"
            />
            <span class="dataset-gallery-year">${escapeHtml(photo.year || "Unknown")}</span>
            <span class="dataset-gallery-overlay">
              <strong>${escapeHtml(label || photo.fileName || "Untitled image")}</strong>
              <span>${escapeHtml(dateLabel || photo.fileName || "")}</span>
            </span>
          </a>
        `;
      })
      .join("");
  }

  function classifyCaptureTime(photo) {
    const time = String(photo.time || "");
    const match = time.match(/^(\d{1,2}):(\d{2})/);

    if (!match) {
      return "unknown";
    }

    const hour = Number(match[1]);

    if (Number.isNaN(hour)) {
      return "unknown";
    }

    return hour >= 20 ? "night" : "day";
  }

  function buildGallerySearchText(photo) {
    return [
      photo.fileName,
      photo.id,
      photo.date,
      photo.time,
      [photo.date, photo.time].filter(Boolean).join(" "),
      photo.placeLabel,
      normalizePlaceLabel(photo.placeLabel),
      photo.cameraLabel,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
  }

  function renderCharts(photos, data) {
    const yearCounts = Object.entries(data.yearCounts || {})
      .sort((left, right) => String(left[0]).localeCompare(String(right[0])))
      .map(([label, count]) => ({ label, count: Number(count) || 0 }));

    const destinationCounts = countBy(
      photos.map((photo) => normalizePlaceLabel(photo.placeLabel)).filter(Boolean)
    )
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
      .slice(0, 5);

    const resolutionCounts = countBy(
      photos
        .map((photo) => {
          if (!photo.imageWidth || !photo.imageHeight) {
            return "";
          }

          return `${photo.imageWidth} x ${photo.imageHeight}`;
        })
        .filter(Boolean)
    )
      .sort((left, right) => right.count - left.count || left.label.localeCompare(right.label))
      .slice(0, 5);

    renderBarChart("datasetYearChart", yearCounts);
    renderBarChart("datasetDestinationChart", destinationCounts);
    renderBarChart("datasetResolutionChart", resolutionCounts);
  }

  function renderBarChart(targetId, entries) {
    const container = document.getElementById(targetId);

    if (!container) {
      return;
    }

    if (!entries.length) {
      renderError(targetId, "No chart data is available.");
      return;
    }

    const maxCount = Math.max(...entries.map((entry) => entry.count), 1);

    container.innerHTML = entries
      .map((entry) => {
        const width = Math.max(8, Math.round((entry.count / maxCount) * 100));

        return `
          <div class="dataset-bar-row">
            <div class="dataset-bar-labels">
              <span>${escapeHtml(entry.label)}</span>
              <span>${escapeHtml(formatNumber(entry.count))}</span>
            </div>
            <div class="dataset-bar-track">
              <span class="dataset-bar-fill" style="width: ${width}%"></span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  function renderSimpleCards(targetId, items, classNames) {
    const container = document.getElementById(targetId);

    if (!container) {
      return;
    }

    container.innerHTML = items
      .map(
        (item) => `
          <article class="${classNames.cardClassName}">
            <span class="${classNames.labelClassName}">${escapeHtml(item.label)}</span>
            <span class="${classNames.valueClassName}">${escapeHtml(item.value)}</span>
          </article>
        `
      )
      .join("");
  }

  function renderLoading(targetId, message) {
    renderState(targetId, "dataset-loading", message);
  }

  function renderError(targetId, message) {
    renderState(targetId, "dataset-error", message);
  }

  function renderState(targetId, className, message) {
    const container = document.getElementById(targetId);

    if (!container) {
      return;
    }

    container.innerHTML = `<div class="${className}">${escapeHtml(message)}</div>`;
  }

  function pickGallerySamples(photos, desiredCount) {
    if (!photos.length) {
      return [];
    }

    const picks = [];
    const usedIndices = new Set();
    const usedLabels = new Set();
    const anchorIndices = Array.from({ length: desiredCount }, (_, index) => {
      if (desiredCount === 1) {
        return 0;
      }

      return Math.round(((photos.length - 1) * index) / (desiredCount - 1));
    });

    anchorIndices.forEach((anchorIndex) => {
      const candidateIndex = findNearestUnusedIndex(photos, anchorIndex, usedIndices, usedLabels);

      if (candidateIndex === -1) {
        return;
      }

      const photo = photos[candidateIndex];
      const label = normalizePlaceLabel(photo.placeLabel);

      picks.push(photo);
      usedIndices.add(candidateIndex);
      usedLabels.add(label);
    });

    return picks;
  }

  function pickPreferredGallerySamples(photos, preferredFileNames, desiredCount) {
    const picks = preferredFileNames
      .map((fileName) =>
        photos.find(
          (photo) =>
            photo &&
            photo.previewUrl &&
            (String(photo.fileName || "") === fileName || String(photo.id || "") === fileName)
        )
      )
      .filter(Boolean);

    if (picks.length >= desiredCount) {
      return picks.slice(0, desiredCount);
    }

    const usedFileNames = new Set(
      picks.flatMap((photo) => [String(photo.fileName || ""), String(photo.id || "")].filter(Boolean))
    );
    const fallbackPhotos = photos.filter(
      (photo) =>
        photo &&
        photo.previewUrl &&
        !usedFileNames.has(String(photo.fileName || "")) &&
        !usedFileNames.has(String(photo.id || ""))
    );

    return picks.concat(pickGallerySamples(fallbackPhotos, desiredCount - picks.length));
  }

  function findNearestUnusedIndex(photos, anchorIndex, usedIndices, usedLabels) {
    for (let offset = 0; offset < photos.length; offset += 1) {
      const indices = offset === 0 ? [anchorIndex] : [anchorIndex - offset, anchorIndex + offset];

      for (const index of indices) {
        if (index < 0 || index >= photos.length || usedIndices.has(index)) {
          continue;
        }

        const photo = photos[index];
        const label = normalizePlaceLabel(photo.placeLabel);

        if (!label || !photo.previewUrl) {
          continue;
        }

        if (usedLabels.has(label)) {
          continue;
        }

        return index;
      }
    }

    return photos.findIndex((photo, index) => photo.previewUrl && !usedIndices.has(index));
  }

  function countBy(values) {
    const counts = new Map();

    values.forEach((value) => {
      counts.set(value, (counts.get(value) || 0) + 1);
    });

    return Array.from(counts.entries()).map(([label, count]) => ({ label, count }));
  }

  function normalizePlaceLabel(value) {
    const normalized = String(value || "")
      .replace(/\s+/g, " ")
      .replace(/\s+,/g, ",")
      .trim();

    if (!normalized) {
      return "";
    }

    if (Object.prototype.hasOwnProperty.call(EXACT_PLACE_LABELS, normalized)) {
      return EXACT_PLACE_LABELS[normalized];
    }

    let translated = normalized;

    TOKEN_REPLACEMENTS.forEach(([source, target]) => {
      translated = translated.replaceAll(source, target);
    });

    return translated
      .replace(/\s+/g, " ")
      .replace(/\s+,/g, ",")
      .trim();
  }

  function extractRegionBucket(placeLabel) {
    const normalized = normalizePlaceLabel(placeLabel);

    if (!normalized) {
      return "";
    }

    if (normalized.includes(",")) {
      const parts = normalized
        .split(",")
        .map((part) => part.trim())
        .filter(Boolean);

      return parts[parts.length - 1] || "";
    }

    return normalized.split(/\s+/)[0] || normalized;
  }

  function coordinateKey(lat, lng) {
    if (typeof lat !== "number" || typeof lng !== "number") {
      return "";
    }

    return `${lat.toFixed(2)},${lng.toFixed(2)}`;
  }

  function formatNumber(value) {
    return NUMBER_FORMATTER.format(Number(value) || 0);
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeAttribute(value) {
    return escapeHtml(value).replace(/`/g, "&#96;");
  }
})();
