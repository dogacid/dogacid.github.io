---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.312 - using case

{% for tag in site.tags %}
  Inspect: {{ tag[0] | inspect }}
  {% if tag[0] == “consulting” %}
    Found consulting tag :)
  {% else %}
    Not consulting tag :(
  {% endif %} 
{% endfor %}