---
title: Blog
layout: home
nav_order: 1
---

Prototype area - I'm experimenting with GitHub Pages directly, so no local build environment.

{% for post in site.posts %}
  <div class=“post”>
    <h1 class=“post-title”>
      <a href=“{{ post.url | absolute_url }}”>
        {{ post.title }}
      </a>
    </h1>
    <span class=“post-date”>{{ post.date | date_to_string }}</span>
    {{ post.excerpt }}
  </div> 
{% endfor %}