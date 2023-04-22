---
createdDate: '2023-04-04T05:54:00.322Z'
title: 'All Hail Website Mark. II'
type: 'blog'
excerpt: "Theseus' Website: if you refactor the entire website, is it still the same website?"
tags: ['Development']
color: '#A020F0'
coverImage:
    url: '/assets/theseus_ship.jpg'
    copyrightLink: 'https://commons.wikimedia.org/wiki/File:%22Olympias%22,_Nachbau_einer_Triere_im_Schiffsmuseum_Trokadero_Marina,_Paleo_Faliro,_Athen.jpg'
    copyrightOwner: 'Da Jackson, via Wikimedia Commons'
authors: [{ name: Yegor Chernyshev, picture: '/assets/me.jpg' }]
---

Why, when there are tons of platforms and libraries to choose from to develop a personal site, and tons of readily available free-resources to host them on, do you create an entire full-stack application from the ground up just for your personal site? **_Because I can_**.

## The Situation

My old site was probably created in four hours, maybe less. And most of that time was spent redesigning the layout over and over again until I was satisfied with the look of it. However, I was never a fan of the design and functionality of it and I don't think any visitors were all too impressed with it either. This was a problem, however, as I began to apply to jobs and started to notice a decent amount of traffic to my site. Unfortunately, at that time I was preoccupied with finishing up my graduate studies at NYU and I had neither the time nor energy to refactor it.

Well, now I have finally survived graduate school and entered a new chapter of my life: ~~unemployement~~ adulthood. And with this new free time on my hands and the crushing anxiety of artificial intelligence making employment obsolete, I decided to expand my tech stack by taking a deeper dive into web development.

## yegor.codes Reborn

### The Old Site's Tech Stack

-   Typescript
-   React
-   Redux
-   React Spring
-   Firebase

The original site was powered almost entirely by React. It was a single-page application that connected directly to Google's Firebase for the backend. Most assets and data was static as I didn't even get a chance to move it to the backend for proper storage. So it was nothing more than a glorified HTML file that I fragmented into React components and glued together visually with Tailwind CSS.

### The New One

-   NextJS
-   Typescript
-   React
-   Tailwind CSS
-   MongoDB

World, say hello to yegor.codes Mark II (there will be many more as there is a brutal fight between versions for Yegor's approval and also because Yegor is a very restless and frequently bored individual). This new site is powered by NextJS, which does the heavy lifting on the back-end and the front-end is handled by the good ol' React.

So long sweet prince, you will _**not**_ be missed.

---

**For more specific details on how I went about creating this site, please check out the _yegor.codes_ writeup on the projects page.**
