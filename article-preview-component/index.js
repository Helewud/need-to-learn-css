console.log("Script intiated...");

const DIALOG = document.getElementsByTagName("dialog")[0];
const MAIN = document.getElementsByTagName("main")[0];
const PROFILE_GROUP = document.querySelector(".profile-group");

const SHARE_ICON = document.querySelector(".share-icon");
const DIALOG_SHARE_ICON = DIALOG.querySelector(".share-icon");

const MOBILE_BREAKPOINT = 767;

const positionDialog = () => {
  const shareIconRect = SHARE_ICON.getBoundingClientRect();
  DIALOG.style.top = `${shareIconRect.top - 80}px`;
  DIALOG.style.left = `${shareIconRect.left - 110}px`;
};

const resetDialog = () => {
  DIALOG.style.top = MAIN.style.top;
  DIALOG.style.left = MAIN.style.left;
};

const openDialog = () => {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  DIALOG.style.display = "flex";

  if (isMobile) {
    PROFILE_GROUP.style.display = "none";
    DIALOG_SHARE_ICON.classList.add("share-icon-active");

    return resetDialog();
  }

  SHARE_ICON.classList.add("share-icon-active");

  return positionDialog();
};

const closeDialog = () => {
  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  DIALOG.style.display = "none";

  if (isMobile) {
    PROFILE_GROUP.style.display = "flex";
    DIALOG_SHARE_ICON.classList.remove("share-icon-active");
  }

  SHARE_ICON.classList.remove("share-icon-active");
};

const syncStates = () => {
  if (!DIALOG.style.display) return;

  const isMobile = window.innerWidth <= MOBILE_BREAKPOINT;
  const dialogOpen = DIALOG.style.display === "flex";

  if (isMobile && dialogOpen) {
    PROFILE_GROUP.style.display = "none";
    DIALOG_SHARE_ICON.classList.add("share-icon-active");
    SHARE_ICON.classList.remove("share-icon-active");

    return resetDialog();
  }

  if (!isMobile && dialogOpen) {
    PROFILE_GROUP.style.display = "flex";
    DIALOG_SHARE_ICON.classList.remove("share-icon-active");
    SHARE_ICON.classList.add("share-icon-active");

    return positionDialog();
  }
};

const toggleDialog = () => {
  const dialogOpen = DIALOG.style.display === "flex";

  if (dialogOpen) return closeDialog();

  if (!dialogOpen) return openDialog();
};

let resizeTimeout;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimeout);
  resizeTimeout = setTimeout(syncStates, 100);
});

DIALOG_SHARE_ICON.addEventListener("click", toggleDialog);
SHARE_ICON.addEventListener("click", toggleDialog);

console.log("Script loaded...");
