---
title: Gallery
layout: layout.html
---

<div class="gallery_container">
    {% for image in collections.gallery %}
        {% assign image_url = image | replace: "gallery", "." %}
        <div class="gallery_thumb"><a href="../{{ image }}"><img src="{{image}}" alt="" width=225></a></div>
    {% endfor %}
</div>

<!-- ![image](./assets/images/250423.webp) -->