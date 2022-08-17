---
title: Coding
layout: home
nav_order: 2
---

### Coding
{% for post in site.posts %}
    {% if post.tag contains “coding” %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    
    {% endif %}
{% endfor %}