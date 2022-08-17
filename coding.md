---
title: Coding
layout: home
nav_order: 2
---

## Tag fixes 1.34

{% assign coding = site.tags | where: “coding” %}
Output: {{ coding }}

{% for tag in site.tags %}
  {% if tag[0].lstrip == “coding” %}
### Coding posts
    {% for post in tag[1] %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    {% endfor %}
  {% endif %} 
{% endfor %}