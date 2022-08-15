---
title: Blog
layout: home
nav_order: 1
---

{% for post in site.posts %}
#### [{{ post.title }}]({{ post.url }}) - {{ post.date | date_to_string }}
{{ post.content }}

{% endfor %}