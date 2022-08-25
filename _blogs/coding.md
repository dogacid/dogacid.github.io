---
layout: default
title: Coding
nav_order: 1
has_children: false
---

## Coding posts
{% for tag in site.tags %}
  {% if tag[0] == "coding" %}
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ post.url }})

    {% endfor %}
  {% endif %}
{% endfor %}
