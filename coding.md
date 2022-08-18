---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.319 - using incorrect quote character
{% for tag in site.tags %}
  {% if tag[0] == "coding" %}
    Found coding tag :)
  {% else %}
    Not coding tag :(
  {% endif %}
{% endfor %}