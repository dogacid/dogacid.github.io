---
title: Blog
layout: home
nav_order: 1
---

Prototype area - I'm experimenting with GitHub Pages directly, so no local build environment.

{% for post in site.posts %}
  # [{{ post.url }}]({{ post.title }})
  {{ post.date | date_to_string }}
  {{ post.excerpt }}
{% endfor %}