document.addEventListener("DOMContentLoaded", function () {
  function setEqualHeights() {
    const history1 = document.querySelector(".homeRestHistory");
    const history2 = document.querySelector(".homeRestHistory1");

    if (history1 && history2) {
      const height1 = history1.scrollHeight;
      const height2 = history2.scrollHeight;
      const maxHeight = Math.max(height1, height2);

      document.documentElement.style.setProperty(
        "--history-height",
        maxHeight + "px"
      );
    }
  }

  // Call on page load
  setEqualHeights();
  // Call on window resize
  window.addEventListener("resize", setEqualHeights);
});
