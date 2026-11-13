---
title: Home
layout: default
redirect_from:
  - /blogs/coding/
  - /blogs/consulting/
  - /blogs/organisations/
description: Marc Galbraith is an engineering leader and senior software engineer in Melbourne, writing about software, organisations and change.
---

<section class="intro">
  <img class="intro-photo" src="{{ '/assets/marc_2021_mono.jpg' | relative_url }}" alt="Portrait of Marc Galbraith" width="96" height="96">
  <h1>Marc Galbraith</h1>
  <p class="intro-tagline">Engineering leader and senior software engineer · Melbourne, Australia</p>
  <div class="prose">
    <p>I've spent more than 20 years working where software, organisations and change meet. My work has taken me from developer to architect, consultant and engineering manager, and back to hands-on engineering. Today I build data services for the Australian energy market.</p>
    <p>More <a href="{% link _resume/overview.md %}">about me</a>, or see my <a href="{% link _resume/experience.md %}">experience</a>.</p>
  </div>
</section>

<section class="writing">
  <h2>Writing</h2>
  <ul class="post-list">
    {%- for post in site.posts %}
    <li>
      <a href="{{ post.url | relative_url }}">
        <span class="post-list-title">{{ post.title }}</span>
        <time datetime="{{ post.date | date_to_xmlschema }}">{{ post.date | date: "%B %-d, %Y" }}</time>
      </a>
    </li>
    {%- endfor %}
  </ul>
</section>
