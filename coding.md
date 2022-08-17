---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.36 - using assign


{% for tag in site.tags %}
  {% assign tag_name = tag[0] %}
  {{ tag_name | stripe }}
  {% if tag_name == “coding” %}
### Coding posts
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    {% endfor %}
  {% endif %} 
{% endfor %}