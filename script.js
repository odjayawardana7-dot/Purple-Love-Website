const pages = [...document.querySelectorAll(".page")];

function showPage(number) {
  pages.forEach((page, index) => {
    page.classList.toggle("active", index === number - 1);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

document.getElementById("loginNext").addEventListener("click", () => {
  const name = document.getElementById("herName").value.trim();
  const passcode = document.getElementById("passcode").value.trim();
  // This is a sweet intro screen, not a real secure login.
  if (!name) {
    document.getElementById("loginHint").textContent = "Please type your name first, my love 💜";
    document.getElementById("herName").focus();
    return;
  }
  localStorage.setItem("loveSiteName", name);
  if (passcode) localStorage.setItem("loveSitePasscode", passcode);
  document.getElementById("endingTitle").textContent = `I love you, ${name}.`;
  showPage(2);
});

document.querySelectorAll("[data-next]").forEach(button => {
  button.addEventListener("click", () => showPage(Number(button.dataset.next)));
});

document.getElementById("sendWhatsApp").addEventListener("click", () => {
  const thoughts = document.getElementById("herThoughts").value.trim();
  const mood = document.getElementById("herMood").value;
  const name = localStorage.getItem("loveSiteName") || "My love";
  if (!thoughts) {
    document.getElementById("herThoughts").focus();
    document.getElementById("herThoughts").placeholder = "Write a little something before sending 💗";
    return;
  }

  // IMPORTANT: replace 94770000000 with your WhatsApp number in international format.
  // For Sri Lanka, use 94 followed by the number without the first 0.
  const yourWhatsAppNumber = "94740324570";
  const message = `Hi Oshada 💜 It's ${name}!\n\nHow your surprise made me feel: ${mood}\n\nWhat I think:\n${thoughts}`;
  const url = `https://wa.me/${yourWhatsAppNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

document.getElementById("restart").addEventListener("click", () => showPage(1));
