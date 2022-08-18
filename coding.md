---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.317 - using 
{% assign coding = “coding” %}
{% for tag in site.tags %}
  Inspect: {{ tag[0] | inspect }}
  {% if tag[0] == coding %}
    Found coding tag :)
  {% else %}
    Not coding tag :(
  {% endif %}
{% endfor %}