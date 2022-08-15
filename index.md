---
title: Blog
layout: home
nav_order: 1
---

Prototype area - I'm experimenting with GitHub Pages directly, so no local build environment.

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
