export function drawRoute() {
  const markers = Array.from(document.querySelectorAll('.marker'));
  if (markers.length < 2) return;

  const map = document.getElementById('map');
  const rect = map.getBoundingClientRect();

  const coords = markers.map(el => {
    const r = el.getBoundingClientRect();
    return {
      x: r.left + r.width / 2 - rect.left,
      y: r.top + r.height / 2 - rect.top
    };
  });

  const d = [];
  d.push(`M ${coords[0].x},${coords[0].y}`);
  for (let i = 1; i < coords.length; i++) {
    const p0 = coords[i - 1];
    const p1 = coords[i];
    const cx1 = p0.x + (p1.x - p0.x) / 3;
    const cy1 = p0.y;
    const cx2 = p0.x + 2 * (p1.x - p0.x) / 3;
    const cy2 = p1.y;
    d.push(`C ${cx1},${cy1} ${cx2},${cy2} ${p1.x},${p1.y}`);
  }

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${rect.width} ${rect.height}`);
  svg.setAttribute("style", "position:absolute; top:0; left:0; pointer-events:none; z-index:5;");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", d.join(" "));
  path.setAttribute("fill", "none");

  // ✨ Винтажный стиль линии
  path.setAttribute("stroke", "#7a6f5a");
  path.setAttribute("stroke-width", "2");
  path.setAttribute("stroke-dasharray", "1000");
  path.setAttribute("stroke-dashoffset", "1000");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("class", "route-path");

  svg.appendChild(path);
  map.appendChild(svg);
}
