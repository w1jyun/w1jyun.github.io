---
layout: home
profile_picture:
  src: /assets/img/3x4.jpg
  alt: website picture
---
<div class="home-main">
  <section class="home-intro">
    <h1 class="home-intro-name">JIYUN WON</h1>

    <p>
    I am a Ph.D. student at the POSTECH Computer Graphics Lab, advised by Prof. Sunghyun Cho.
    My research focuses on image restoration and camera ISP.
    </p>

    {% include home-contact.html %}
  </section>
</div>

<section class="section-block">
  <h2 class="section-heading"><strong>News</strong></h2>
  <div class="news-list">
    <article class="news-item">
      <p class="news-date">Feb, 2026</p>
      <p class="news-text">2 papers have been accepted to CVPR 2026 (1 main, 1 Findings)!</p>
    </article>

    <article class="news-item">
      <p class="news-date">May, 2025</p>
      <p class="news-text">A paper has been accepted to SIGGRAPH 2025!</p>
    </article>
  </div>
</section>

<section class="section-block section-block-spacious">
  <h2 class="section-heading"><strong>Publications</strong></h2>
  {% include publications-list.html %}
</section>
