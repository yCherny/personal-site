---
createdDate: '2023-04-04T05:54:00.322Z'
editedDate: '2023-04-15T05:46:00.322Z'

title: 'yegor.codes'
excerpt: "There's a lot more to this site under the surface than meets the eye."
tags: ['Web']
color: '#A020F0'
coverImage: { url: '/assets/creator-of-worlds.png' }
authors: [{ name: Yegor Chernyshev, picture: '/assets/me.jpg', url: '' }]
---

## The Tech Stack

-   Typescript
-   Next.JS (Back-end Logic)
-   React (Front-end Components)
-   Tailwind CSS (Styling)
-   React Three Fiber (3D Interactivity)
-   Amazon Web Services (Hosting)

---

# A Walkthrough of yegor.codes

The original goal of this site was to learn new technologies while also flexing my software development abilities to potential recruiters. But I also wanted it to be an extension of me and a place where people all of the world can visit to learn more about this one human living on the planet.

## The Brainstorming

I wanted to not only learn the entire tech stack for modern web-development, but I also wanted to have control over it. That meant knowing front-end, back-end, databases and everything in between to the point where I can manage all the pieces and not rely on a single third-party to handle anything. The reason being that I was used to building front-end applications with backend support via Google's Firebase, which pretty much abstracted away all the complexities of a backend and made it hard to pivot away from.

On top of that, as a person, I like to have complete liberties and control when

### Stack Decision

![A dog looking at you](https://ichef.bbci.co.uk/news/976/cpsprodpb/17638/production/_124800859_gettyimages-817514614.jpg)

I decided I was going to learn the MERN (MongoDB, Express, React and Node) stack. The primary reasoning being it's popularity in production which meant learning the tech also made me a more competitive candidate for employment. However, I wanted to also take it one step further and sprinkle in the latest in the flashy web toys: NextJS. I've been hearing about it more and more and despite initial hesitation to learn, found it to be a pretty inuitive and easy learning curve on top of knowing Node and React. It also solved all my existing problems for my site, namely allowing me to use slugs for blog and portfolio articles, allowing me to write back-end and front-end code in one repository and to optimize on SEO due to Next's Server Side Rendering.

## The Walkthough

I intended to have **four parts** to the site. I wanted one landing page that supported a mini game environment in the browser full of models, animations, interactions and more. This was meant to allow visitors to learn more about me by interacting with a 3D representation of my room. Two of the remaining parts were meant to provide the same information (resume, qualifications, projects, etc) about me that the landing page did, but in a more structured way that was convenient for users with slower internet access or weaker devices that didn't support the performance needed to run the game on the landing page (more on this later).
