---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.314 - using 

{% for tag in site.tags %}
  Inspect: {{ tag[0] | inspect }}
  If: {{ tag[0] == “consulting” }}
  {% if tag[0] == “consulting” %}
    Found consulting tag :)
  {% else %}
    Not consulting tag :(
  {% endif %} 
{% endfor %}