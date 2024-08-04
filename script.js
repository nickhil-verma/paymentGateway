const input = document.querySelector("#generate-form input");
const qr = document.getElementById("qrcode");
const dynamicLink = document.getElementById('dynamic-link');
const defaultURL = "upi://pay?pa=vermanick75-1@okhdfcbank&pn=Nikhil%20verma&aid=uGICAgICnmMDKLQ";

// Function to update QR code
const updateQRCode = (url) => {
  clearUI();
  generateQRCode(url, 300); // Set the size as 300x300 by default
  setTimeout(() => {
    // Get save URL
    const saveUrl = qr.querySelector("canvas").toDataURL();
    // Create save button
    createSaveBtn(saveUrl);
  }, 50);
};

// Listen for input changes
input.addEventListener("input", () => {
  const amount = input.value.trim();
  let qrCodeUrl = defaultURL;

  if (amount !== "") {
    qrCodeUrl = `upi://pay?pa=vermanick75-1@okhdfcbank&pn=Nikhil%20verma&am=${amount}&cu=INR&aid=uGICAgICnmMDKLQ`;
  }

  updateQRCode(qrCodeUrl);
  dynamicLink.href = qrCodeUrl;
});

// Generate QR code
const generateQRCode = (url, size) => {
  new QRCode(qr, {
    text: url,
    width: size,
    height: size,
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList = 'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.innerHTML = "Save Image";

  link.href = saveUrl;
  link.download = "qrcode.png";

  document.getElementById("generated").appendChild(link);
};

// Generate default QR code on page load
updateQRCode(defaultURL);

document.addEventListener("DOMContentLoaded", () => {
  const showQRButton = document.querySelector("button");

  // Function to remove blur and hide the button
  const showQRCode = () => {
    qr.style.filter = "none"; // Remove blur
    showQRButton.style.display = "none"; // Hide button
  };

  // Event listener for button click
  showQRButton.addEventListener("click", showQRCode);
});
