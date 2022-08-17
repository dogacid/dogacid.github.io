---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.37 - using capture


{% for tag in site.tags %}
  {% capture tag_name %}{{ tag[0] | stripe }}{% endcapture %}
  Capture: {{ tag_name }}
  {% if tag_name == “coding” %}
### Coding posts
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    {% endfor %}
  {% endif %} 
{% endfor %}