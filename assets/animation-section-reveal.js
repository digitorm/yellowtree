const rootMargin=window.matchMedia("(max-width: 992px)").matches?"-100px 0px":"-200px 0px",sections=document.querySelectorAll(".shopify-section");sections.forEach(s=>{const e=new IntersectionObserver((e,o)=>{e[0].isIntersecting&&(s.classList.add("shopify-section--reveal"),o.unobserve(s))},{rootMargin:rootMargin,root:null,threshold:0});e.observe(s)});