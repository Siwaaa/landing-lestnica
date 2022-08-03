const e=document.querySelectorAll("[data-animate-on-scroll]"),t=new IntersectionObserver((e=>{e.forEach((e=>{e.isIntersecting&&e.target.setAttribute("data-animate-on-scroll","animated")}))}),{threshold:.25});e.forEach((e=>{t.observe(e)}));
//# sourceMappingURL=index.24358a84.js.map
