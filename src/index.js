// Animation

const e = document.querySelectorAll("[data-animate-on-scroll]")
const t = new IntersectionObserver((e => {
  e.forEach((e => {
    e.isIntersecting && e.target.setAttribute("data-animate-on-scroll", "animated")
  }
  ))
}), {
  threshold: 0.25
});

e.forEach((e => {
  t.observe(e)
}
))