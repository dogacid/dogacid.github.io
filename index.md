---
title: Home
layout: home
nav_order: 1
redirect_from:
  - /blogs/coding/
  - /blogs/consulting/
  - /blogs/organisations/
description: Marc Galbraith is an engineering leader and senior software engineer in Melbourne, writing about software, organisations and change.
---

<div class="home-intro" markdown="1">
<div class="home-photo-wrap"><img class="home-photo" src="{{ '/assets/marc_2021_mono.jpg' | relative_url }}" alt="Portrait of Marc Galbraith" width="160" height="160"></div>

<div markdown="1">
# Marc Galbraith
{: .fs-8 .mb-2 }

Engineering leader and senior software engineer · Melbourne, Australia
{: .fs-5 .fw-300 .mb-3 }

I've spent more than 20 years working where software, organisations and change meet. My work has taken me from developer to architect, consultant and engineering manager, and back to hands-on engineering. Today I build data services for the Australian energy market.

[About me]({% link _resume/overview.md %}){: .btn .btn-primary .mr-2 }
[Experience]({% link _resume/experience.md %}){: .btn }
</div>
</div>

## Writing

{% for post in site.posts %}
#### {{ post.date | date_to_string }} - [{{ post.title }}]({{ post.url | relative_url }})

{% endfor %}
