// hide all links
$(".menu li").hide();

var gallery = $("#gallery"),
    links = $(".menu").find("a"),
    gallerySets = ["gallery-index", "gallery-gallery2", "gallery-gallery3"],
    nextBtn = $("#next-page"),
    prevBtn = $("#prev-page"),
    loading = $("<img/>", {src: "img/heart.svg", id: "loading"}).hide();

gallery.prepend(loading);
nextBtn.show();

links.click(function(evt){
    evt.preventDefault();

    var visibleSet = $(".gallery-set").filter(":visible").attr("id"),
        galleryPosition = gallerySets.indexOf(visibleSet),
        prevGalleryID = gallerySets[galleryPosition - 1],
        nextGalleryID = gallerySets[galleryPosition + 1],
        btnID = $(this).parent().attr("id"),
        url = null;

    $(".gallery-set").filter(":visible").hide();
    loading.show();
    $(".dir-btn").show();

    if (btnID === "next-page") {
        var nextGallery = $("#" + nextGalleryID);

        if (galleryPosition === 1) nextBtn.hide();

        if (nextGallery.length) {
            loading.hide();
            nextGallery.fadeIn();
            return;
        }
        url = nextGalleryID.split("-")[1] + ".html";
    }
    else if (btnID === "prev-page") {
        var prevGallery = $("#" + prevGalleryID);

        if (galleryPosition === 1) prevBtn.hide();

        loading.hide();
        prevGallery.fadeIn();
        return;
    }


    $.ajax({
        url: url,
    })
    .done(function(data) {
        var targetGallery = $(data).find(".gallery-set");

        gallery.prepend(targetGallery.hide());
        targetGallery.fadeIn();

    })
    .fail(function() {
        alert("WTF did just happen?");
    })
    .always(function() {
        loading.hide();
    });
});
