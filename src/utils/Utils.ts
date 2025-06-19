export const setWidthStyle = (width?: any) => {
  if (width && typeof width === "number") {
    return { width: `${width}px !important` };
  }
  if (width && typeof width === "string") {
    return { width: `${width} !important` };
  }
  return {};
};

export const truncateAddress = (addr: string) => {
  return `${addr.slice(0, 5)}...${addr.slice(-5)}`;
};

export const decodeToken = (token: string) =>
  JSON.parse(atob(token.split(".")[1]));

export const isMobileDevice = (): boolean => {
  const userAgent =
    navigator.userAgent || navigator.vendor || (window as any).opera;

  return (
    /Android/i.test(userAgent) ||
    /webOS/i.test(userAgent) ||
    /iPhone/i.test(userAgent) ||
    /iPad/i.test(userAgent) ||
    /iPod/i.test(userAgent) ||
    /BlackBerry/i.test(userAgent) ||
    /IEMobile/i.test(userAgent) ||
    /Opera Mini/i.test(userAgent)
  );
};

export const exitGame = () => {
  const existingScript = document.getElementById("game-play");
  if (existingScript) {
    if (document.Runner?.instance_) {
      document.Runner.instance_.crashed = true;
      document.Runner.instance_.stopListening();
      document.Runner.instance_.stop();
    }
    existingScript.remove();
    delete document.Runner;
  }
};

export const handleCopyClick = (text: string) => {
  if (navigator?.clipboard?.writeText) {
    navigator.clipboard.writeText(text);
  }
};
