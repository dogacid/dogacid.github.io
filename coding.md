---
title: Coding
layout: home
nav_order: 2
---

{% for tag in site.tags %}
  {% if tag == “coding” %}
    ### {{ tag }}
    {% for post in tag %}
      #### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    {% endfor %}
  {% endif %} 
{% endfor %}