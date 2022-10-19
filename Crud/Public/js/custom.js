jQuery(document).ready(function() {
var owl = jQuery('.CarouselOwl');
owl.owlCarousel({
margin: 5,
nav: false,
loop: true,
responsive: {
0: {items: 1},
480: {items: 1},
576: {items: 1},
768: {items: 1},
992: {items: 1},
1200: {items: 1}
}
})
})

jQuery(".menu-btn, .body-overlay").click(function(){
jQuery(".sidebar, .body-overlay").toggleClass("active");
});
jQuery(".menu-btn, .body-overlay").click(function(){
jQuery("body").toggleClass("noscroll");
})