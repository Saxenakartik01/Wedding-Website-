# 🎨 Pixel Perfect Design Recreation with Interactive Rope Intro

## 📌 Overview

This project recreates the provided design as a **pixel-perfect, production-ready website** while preserving the original layout, spacing, typography, colors, and visual style.

Before the website is displayed, users experience a **premium interactive rope intro animation**, creating a unique and engaging entry without affecting the original design.

---

# ✨ Features

## 🎯 Pixel-Perfect Recreation

* Recreates the attached design as accurately as possible.
* Matches layout, spacing, typography, colors, icons, and images.
* Clean, semantic HTML structure.
* Modern CSS architecture.
* Responsive for Mobile, Tablet, and Desktop.

---

## 🎬 Premium Intro Experience

Instead of opening the website immediately, users first see an interactive intro screen.

### Intro Includes

* Full-screen loading page
* Realistic hanging rope at the top-center
* "Pull the Rope to Enter" instruction
* Interactive rope dragging
* Smooth rope physics
* Premium reveal animation
* No page reload
* Skip Intro button
* Session-based intro (plays only once)

---

# 🪢 Rope Interaction

Users can:

* Click the rope
* Touch the rope on mobile
* Drag it downward

When the rope crosses a predefined threshold:

* Fade transition
* Curtain reveal or cinematic opening
* Website appears smoothly
* Intro is removed

---

# ⏭ Skip Intro

A **Skip Intro** button is available at the bottom-center.

Clicking it:

* Skips the animation instantly
* Opens the website immediately
* Stores the session so the intro won't play again

---

# 🔄 Session Behavior

The intro should only play **once per browser session**.

Example:

* First visit → Intro plays ✅
* Refresh page → Website opens directly ✅
* New browser session → Intro plays again ✅

Use `sessionStorage` for this behavior.

---

# 📱 Responsive Design

The project must work flawlessly on:

* Desktop
* Laptop
* Tablet
* Mobile

No layout breaking or animation issues.

---

# ✨ Animations

Smooth animations using modern libraries such as:

* GSAP
* Matter.js (optional)
* Lenis (optional)
* Framer Motion (if using React)

Maintain approximately **60 FPS** performance.

---

# 🔊 Sound Effects

Optional.

If supported:

* Play subtle rope pull sound
* Play reveal transition sound

Only after user interaction to comply with browser autoplay policies.

---

# 🎨 Design Rules

* Do **not** modify the recreated website.
* Preserve the original UI.
* Only prepend the intro experience.
* Make polished decisions only where the reference design is unclear.

---

# 🧱 Tech Stack

* HTML5
* CSS3
* JavaScript (ES6+)

Optional Libraries:

* GSAP
* Matter.js
* Lenis
* Locomotive Scroll

---

# 📂 Suggested Project Structure

```text
project/
│
├── index.html
├── css/
│   ├── style.css
│   └── intro.css
│
├── js/
│   ├── intro.js
│   ├── animations.js
│   └── main.js
│
├── assets/
│   ├── images/
│   ├── icons/
│   ├── audio/
│   └── fonts/
│
└── README.md
```

---

# 🚀 Performance Goals

* Production-ready code
* Optimized assets
* Fast loading
* Smooth transitions
* Accessible markup
* Cross-browser compatibility
* Responsive layouts
* Clean and maintainable code

---

# 📜 License

This project is intended for educational and design recreation purposes. Ensure that any third-party assets, fonts, or images used comply with their respective licenses.

live Demo : theweddingverse-ks.vercel.app
