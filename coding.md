---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.39 - using case

{% for tag in site.tags %}
  Inspect: {{ tag[0] | inspect }}
  {% capture tag_name %}{{ tag[0] | stripe }}{% endcapture %}
  Capture: {{ tag_name }}
{% endfor %}