---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.314 - using to_s

{% for tag in site.tags %}
  To String: {{ tag[0].to_s }}
  Inspect: {{ tag[0] | inspect }}
  {% if tag[0].to_s contains “consulting” %}
    Found consulting tag :)
  {% else %}
    Not consulting tag :(
  {% endif %} 
{% endfor %}