const btn = document.querySelector(".pick-color");
const colorsDom = document.querySelector(".colors");
const clearAll = document.querySelector(".clear-all");

clearAll.addEventListener("click", () => {
  localStorage.removeItem("colors");
  colorsDom.innerHTML = "";
});

let colors = [];

const copied = (e) => {
  let color = e.target.dataset.color;
  navigator.clipboard.writeText(e.target.dataset.color);
};

const fetchColors = () => {
  const arr = JSON.parse(localStorage.getItem("colors"));
  colorsDom.innerHTML = "";
  arr.forEach((color) => {
    let box = document.createElement("div");
    box.className = "box";
    box.innerHTML = `<div class="rect" data-color="${color}" style="background-color: ${color}"></div>
                <div class="hex" data-color="${color}">${color}</div>
        `;
    colorsDom.appendChild(box);
  });
  let boxs = document.querySelectorAll(".box");
  boxs.forEach((box) => {
    box.addEventListener("click", (e) => {
      copied(e);
    });
  });
};

if (JSON.parse(localStorage.getItem("colors"))) {
  colors = [...colors, ...JSON.parse(localStorage.getItem("colors"))];
  fetchColors();
}

const activateEyeDropper = async () => {
  try {
    const eyeDropper = await new EyeDropper();
    const { sRGBHex } = await eyeDropper.open();
    navigator.clipboard.writeText(sRGBHex);
    if (!colors.includes(sRGBHex)) {
      colors.push(sRGBHex);
      localStorage.setItem("colors", JSON.stringify(colors));
      fetchColors();
    }
  } catch (error) {
    console.log(error);
  }
};

btn.addEventListener("click", activateEyeDropper);
