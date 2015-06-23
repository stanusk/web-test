// hide all links
$(".menu").hide();

var win = $(window),
    gallery = $("#gallery"),
    gallerySets = ["gallery-index", "gallery-gallery2", "gallery-gallery3"],
    lastLoadedGallery = 0,
    loading = $("<img/>", {src: "img/heart.svg", id: "loading"}).hide();



win.scroll(function(evt){

    if ($("#" + gallerySets[gallerySets.length - 1]).length < 1) {

        var scrollTop = $(this).scrollTop(),
            innerHeight = $(this).innerHeight(),
            scrollHeight = document.body.scrollHeight;

        if (scrollTop > (scrollHeight - innerHeight - 293)){
            var url = gallerySets[lastLoadedGallery+1].split("-")[1] + ".html";

            gallery.append(loading);
            loading.show();

            $.ajax({
                url: url,
            })
            .done(function(data) {
                var targetGallery = $(data).find(".gallery-set");

                gallery.append(targetGallery.hide());
                targetGallery.fadeIn();

                lastLoadedGallery += 1;
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                loading.hide();
            });
        }
    }
});
