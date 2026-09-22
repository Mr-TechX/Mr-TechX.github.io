const bouquet = document.querySelector('#bouquet');
const statusText = document.querySelector('#status');

const roses = [
  [50, 4, 1, 0], [29, 18, .72, -14], [71, 18, .72, 14],
  [14, 33, .57, -24], [39, 31, .67, -7], [61, 31, .67, 7], [86, 33, .57, 24],
  [28, 47, .56, -13], [50, 45, .67, 0], [72, 47, .56, 13],
  [40, 58, .48, -7], [60, 58, .48, 7]
];

function createRose([x, y, scale, rotation], delay) {
  const rose = document.createElement('div');
  rose.className = 'rose';
  rose.style.cssText = `--x:${x}%;--y:${y}%;--s:${scale};--rot:${rotation}deg;animation-delay:${delay}ms`;
  rose.innerHTML = '<img class="rose-image" src="assets/yellow-rose-neon.png" alt="Rosa amarilla" />';
  bouquet.append(rose);
}

roses.forEach((rose, index) => setTimeout(() => {
  createRose(rose, 0);
  if (index === roses.length - 1) statusText.innerHTML = '✦ Un ramo que florece para siempre ✦<br /> ✦ By: UlisesLC | TechX ✦';
}, index * 310));
