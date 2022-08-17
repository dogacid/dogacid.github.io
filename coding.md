---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.3

{% for tag in site.tags %}
### {{ tag[0] }} {{ tag[0].size }}
  {% if tag[0] contains “coding” %}
### {{ tag[0] }}
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    {% endfor %}
  {% endif %} 
{% endfor %}