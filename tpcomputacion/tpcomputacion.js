let modo = 0;

// NUEVA VARIABLE
let intensidad = 0; 
let objetivo = 0;

function setup() {

  createCanvas(windowWidth, windowHeight);

  document.body.style.margin = "0";
  document.body.style.overflow = "hidden";

  stroke(255);
  noFill();
}

function draw() {

  background(0);

  // =========================
  // SUAVIZADO (RETORNO)
  // =========================
  intensidad = lerp(intensidad, objetivo, 0.08);

  let columnas = 28;
  let filas = 28;
  let tam = 16;

  let anchoGrilla = columnas * tam;
  let altoGrilla = filas * tam;

  let inicioX = width / 2 - anchoGrilla / 2;
  let inicioY = height / 2 - altoGrilla / 2;

  for (let y = 0; y < filas; y++) {
    for (let x = 0; x < columnas; x++) {

      let posX = inicioX + x * tam;
      let posY = inicioY + y * tam;

      // =========================
      // DISTORSIÓN POR MOUSE (CONTROLADA)
      // =========================

      let d = dist(mouseX, mouseY, posX, posY);
      let fuerza = map(d, 0, 300, 40, 0);

      let offsetX = sin(frameCount * 0.05 + y) * fuerza * intensidad;
      let offsetY = cos(frameCount * 0.05 + x) * fuerza * intensidad;

      posX += offsetX;
      posY += offsetY;

      let paridad = (x + y) % 3;

      if (modo === 0) {

        rect(posX, posY, tam, tam);

        if (paridad === 0) {

          rect(
            posX + tam / 2 - 4,
            posY + tam / 2 - 4,
            8,
            8
          );
        }

        if (paridad !== 0) {

          let t = (paridad === 1) ? 10 : 4;

          ellipse(
            posX + tam / 2,
            posY + tam / 2,
            t,
            t
          );
        }
      }

      if (modo === 1) {
        rect(posX, posY, tam, tam);
      }

      if (modo === 2) {

        let shift = sin(frameCount * 0.02) * 10 * intensidad;

        rect(posX + shift, posY, tam, tam);
        rect(posX, posY + shift, tam, tam);
      }

      if (modo === 3) {

        let pulso = sin(frameCount * 0.1 + x * 0.2) * 5 * intensidad;

        rect(posX, posY, tam + pulso, tam + pulso);
      }
    }
  }
}

// =========================
// CLICK → VUELVE A ESTÁTICO
// =========================

function mousePressed() {
  objetivo = 0;
}

// =========================
// OPCIONAL: activar distorsión al mover mouse
// =========================

function mouseMoved() {
  objetivo = 1;
}

// =========================

function keyPressed() {

  if (key === '1') modo = 0;
  if (key === '2') modo = 1;
  if (key === '3') modo = 2;
  if (key === '4') modo = 3;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
