const toastStart = sessionStorage.getItem("toastStart");

if (toastStart) {
  sessionStorage.removeItem("toastStart");

  const verstreken = Date.now() - Number(toastStart);
  const resterend = 3000 - verstreken;

  if (resterend > 0) {
    toonToast(resterend, false);
  }
}