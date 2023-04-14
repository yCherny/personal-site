---
startDate: '2023-04-04T05:54:00.322Z'
title: 'Rally'
excerpt: 'A social-media, geolocation based, anonymous group chat app.'
tags: ['Mobile']
color: '#00cc00'
coverImage: { url: '/assets/app.png' }
authors: [{ name: Yegor Chernyshev, picture: '/assets/cat.jpg', url: '' }]
---

Why, when there are tons of platforms and libraries to choose from to develop a personal site, and tons of readily available free-resources to host them on, do you create an entire full-stack application from the ground up just for your personal site? **_Because I can_**.

## yegor.codes Reborn

My old site was probably created in 4 hours, maybe less. And most of that time was spent redesigning the layout over and over again until I was satisfied with the look of it. However, I was never a fan of the design and functionality of that site and I don't think any visitors were all too impressed with it either. Unfortunately, at that time I was preoccupied with finishing up my graduate studies at NYU and I had neither the time nor energy to refactor it.

Well, I have finally survived graduate school and entered a new chapter of my life. Something called ~~unemployement~~ adulthood. And with this new free time on my hands and the crushing anxiety of artificial intelligence making employment obsolete, I decided to exapand my tech stack by taking a deeper dive into Python.

World, say hello to yegor.codes Mark II (there will be many more as there is a brutal fight between versions for Yegor's approval and also because Yegor is a very restless and frequently bored individual). This website is now mostly powered by Django, which does the heavy lifting on the back-end. For the front-end, I could not give up my love for React so soon, so that powers the dynamic functionality of each page on the client side.

## The Tech Stack

### The Old Site

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

So long sweet prince, you will _**not**_ be missed.
