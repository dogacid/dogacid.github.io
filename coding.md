---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.313 - using contains

{% for tag in site.tags %}
  Inspect: {{ tag[0] | inspect }}
  {% if tag[0] contains “consulting” %}
    Found consulting tag :)
  {% else %}
    Not consulting tag :(
  {% endif %} 
{% endfor %}