---
createdDate: '2023-04-04T05:54:00.322Z'
title: 'NYU Machine Learning Project'
excerpt: 'Improving object detection in surveillance footage using ESRGAN Image Upscaling and Inception ResNet v2'
tags: ['Machine Learning']
color: '#A020F0'
githubLink: 'https://github.com/yCherny/NYU-ML-Project-Fall-2021'
coverImage: { url: '/assets/improving-surveillance-footage.png' }
authors:
    [
        { name: Yegor Chernyshev, picture: '/assets/me.jpg', url: '' },
        {
            name: Yulian Kraynyak,
            picture: 'https://yulian.codes/static/media/avatar-hex.d1abb4fbe6d7e23733af.webp',
            url: 'https://yulian.codes',
        },
    ]
---

_**A little disclaimer:** this was our first graduate course in machine learning. So it was both a giant leap in terms of complexity but also relatively laid back when it came to the project. So don't approach this work as if it was done by two post-docs with decades of experience._

# All Hail Big Brother

Not really, I don't support a mass-surveillance state. However, in the last-minute crunching days of finals week we had to come up with a creative project that flexed most of what we learned during the course and was relatively simple to get off the ground without requiring weeks of model training.

## Brainstorming

After a few back and forth brainstorming sessions, we decided to bridge the two by taking compressed

By no means an original idea (even our grading TA gave us a B+ for creativity 😑), but at the time we didn't find open papers directly merging the two. Maybe we didn't look hard enough. Still, the project terms were not about originality, but execution.

Now, onto the process.

I'm sure governments across the world implemented such systems

## Mental Walkthrough of the Process

There are many ways to validate the efficacy of a machine learning model: the number of correctly labeled pieces of data, the quality of a supersampled picture, correctly predicting letters in a hand-written sentence, etc. We needed some quantitative value to merit the success of our model and since we were planning to work with existing models that did both upsampling and

## Results

So, you might be thinking to yourself, higher resolution photos coupled with object detection means higher rates of detection, right? Not quite, at least that's not what came out of our project. In some instances, object detection went up by near 30%, in other instances, such as when applying our workflow to surveillance videos, our detection plummeted. We have a few theories as to why that might have been. The first elephant in the room was that the object detection model we were using was retrained on a very limited dataset, not enough to properly tweak all the parameters for solid detection. The second issue was something we noticed only after getting well into the project. ESRGAN, while doing a fantastic job of trying to increase the resolution of low quality images, also resulted in some expected artifacts in the images. These artifacts, while not mission critical to the human eye, are significant enough to most likely confuse object detection models trained on normal images. This could all be fixed most certainly given enough time and training of object detection models on super-resolutioned images. However, moving forward, we leave that to other teams and curious students to tackle and leave this work squarely as just another project for a university course.
