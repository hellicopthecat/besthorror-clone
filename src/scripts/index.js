$(function () {
  $(".movie").each(function (index) {
    const $recommendSection = $(this).find(".recommend");
    const $likesCount = $recommendSection.find("span");

    function handleMinus() {
      let likesCount = parseInt($likesCount.html());
      if (likesCount > 0) {
        likesCount--;
        $likesCount.html(likesCount);
      }
    }

    function handlePlus() {
      let likesCount = parseInt($likesCount.html());
      likesCount++;
      $likesCount.html(likesCount);
    }

    $recommendSection.find("button:first-child").on("click", handleMinus);
    $recommendSection.find("button:last-child").on("click", handlePlus);
  });
  for (let a = 0; a <= $(".movie").length; a++) {
    $(".rank span").text((index) => index + 1);
  }
});
