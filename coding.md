---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.34


{% for tag in site.tags %}
  {{ tag[0].lstrip }}
  {% if tag[0].lstrip == “coding” %}
### Coding posts
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    {% endfor %}
  {% endif %} 
{% endfor %}