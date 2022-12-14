let img = document.querySelector("img");
let upload = document.getElementById("upload");
let saturate = document.getElementById("saturate");
let contrast = document.getElementById("contrast");
let sepia = document.getElementById("sepia");
let blur = document.getElementById("blur");
let brightness = document.getElementById("brightness");
let grayscale = document.getElementById("grayscale");
let huerotate = document.getElementById("hue-rotate");
let reset = document.querySelector(".control span");
let download = document.querySelector(".control a");
let overLayer = document.querySelector(".overLayer");
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")




upload.addEventListener("change", function () {
    reset.style.display = "block";
    download.style.display = "block";
    overLayer.style.display = "none";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0])
    file.onload = function () {
        img.src = file.result;
        resetAll();
    }
    img.onload = function () {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        img.style.display = "none"
    }
    document.querySelector(".left .image").style.display = "flex";
    document.querySelector(".left label").style.display = "block";
})



let filters = document.querySelectorAll("ul li input");
filters.forEach((filter) => {
    filter.oninput = function () {
        document.querySelector(`.${this.parentElement.className} span`).innerHTML = this.value;
        ctx.filter = `
    saturate(${saturate.value}%) 
    contrast(${contrast.value}%)
    sepia(${sepia.value}%)
    blur(${blur.value}px)
    brightness(${brightness.value}%)
    grayscale(${grayscale.value})
    hue-rotate(${huerotate.value}deg)
    `;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
})


window.addEventListener("click", function (e) {
    if (e.target.className == "reset") {
        resetAll();
    }
});


function resetAll() {
    img.style.filter = `none`;
    saturate.value = "100";
    contrast.value = "100";
    sepia.value = "0"
    blur.value = "0"
    brightness.value = "100"
    grayscale.value = "0"
    huerotate.value = "0"
    ctx.filter = `
    saturate(${saturate.value}%) 
    contrast(${contrast.value}%)
    sepia(${sepia.value}%)
    blur(${blur.value}px)
    brightness(${brightness.value}%)
    grayscale(${grayscale.value})
    hue-rotate(${huerotate.value}deg)
    `;
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    document.querySelectorAll("ul li span").forEach(span => {
        span.innerHTML = span.dataset.precentage;
    })
}


download.onclick = function () {
    download.href = canvas.toDataURL();
}

