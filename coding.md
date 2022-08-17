---
title: Coding
layout: home
nav_order: 2
---

{% for tag in site.tags %}
  ### {{ tag[0] }}
  {% for post in tag[1] %}
    - {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
  {% endfor %}
{% endfor %}


### Coding
{% for post in site.posts %}
    {% if post.tag contains “coding” %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})
    
    {% endif %}
{% endfor %}