---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.38 - using case


{% for tag in site.tags %}
  {% capture tag_name %}{{ tag[0] | stripe }}{% endcapture %}
  Capture: {{ tag_name }}
  {% case tag_name %}
    {% when “coding” %}
     This is a coding
    {% when “cookie”, “biscuit” %}
     This is a cookie
    {% else %}
     This is not coding
  {% endcase %}
{% endfor %}