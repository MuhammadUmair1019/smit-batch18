function tick() {
  const clockElement = document.querySelector(".clock");
  const now = new Date();

  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();

  const time = `${h}:${m}:${s}`;

  clockElement.textContent = time;

  // console.log(`${h}:${m}:${s}`);

  // console.log(now);
}


setInterval(tick, 1000)
// tick()

// function timeout() {
//   console.log("run");
// }

// setTimeout(timeout, 3000);

// setInterval(timeout, 1000);

let hrs = document.querySelector("#hrs")
let min = document.querySelector("#min")
let sec = document.querySelector("#sec")
let ms = document.querySelector("#ms")

function timeshow() {
  if (ms.textContent !== "100") {
    ms.textcontent = ++ms.textContent
  }
  
  if (ms.textContent > 99) {
    ms.textContent = 0
    sec.textContent = ++sec.textContent
    if (sec.textContent > 59) {
      min.textContent = ++min.textContent
      sec.textContent = 0
      if (min.textcontent > 59) {
        hrs.textContent = ++hrs.textContent
        min.textContent = 0
      }
    }
  }
  console.log(ms);
}
setInterval(timeshow, 100)