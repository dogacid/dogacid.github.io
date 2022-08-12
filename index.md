---
title: Different Perspectives CV
layout: home
---

Prototype area - I'm experimenting with GitHub Pages directly, so no local build environment.

## [An Engineer's Perspective](/cv/engineering.html)
## A Consultant's Perspective
## A Manager / Leader's Perspective

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
