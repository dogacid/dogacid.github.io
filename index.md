---
title: Blog
layout: home
nav_order: 1
---

{% for post in site.posts %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ site.base_url }}{{ post.url }})

{% endfor %}