---
layout: default
title: Consulting
nav_order: 2
has_children: false
---

## Consulting posts
{% for tag in site.tags %}
  {% if tag[0] == "consulting" %}
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ post.url }})

    {% endfor %}
  {% endif %}
{% endfor %}
