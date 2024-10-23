function preload() {
  // put preload code here
}

function setup() {
  createCanvas(windowWidth, windowHeight); // canvas della dimensione dello schermo
  noLoop(); // disegna solo una volta

  const message =
    "This is a template repository\nfor the course Laboratorio di Computergrafica\nCommunication Design, Politecnico di Milano";
  textAlign(CENTER, CENTER);
  textSize(16);
  text(message, width / 2, height / 2);
}

function draw() {
  background(255); // sfondo bianco

  let frameSize = 75; // dimensioni cornice (pixel)
  let squareSize = 40; // dimensione dei quadrati

  // variabili per definire quanti quadrati per riga e colonna ci possono essere in base alla finestra su cui visualizzo
  // calcolo: spazio totale disponibile meno la cornice (frameSize)
  let cols = floor((width - frameSize) / squareSize); 
  let rows = floor((height - frameSize) / squareSize); 

  strokeWeight(2); // Spessore del contorno
  stroke(0); // Colore del contorno (nero)
  noFill(); // Nessun riempimento per i quadrati

  // definisco i centri del canvas
  let centerX = width / 2;
  let centerY = height / 2;
  let maxDist = dist(0, 0, centerX, centerY); // Distanza massima dal centro, serve a far si che la randomicità vari a seconda della distanza dal centro.

  // definisco delle colonne e righe "sicure" che non verranno intaccate troppo dalla randomicità
  let safeColumns = 12; // 12 colonne "salve"
  let safeRows = 5; // 5 righe "salve"

  // Ciclo per disegnare i quadrati
  for (let i = 0; i < cols; i++) { //colonne
    for (let j = 0; j < rows; j++) { //righe

      // Calcola la posizione del quadrato  in modo che sia centrato nella finestra, considerando la cornice (framesize/2 serve a questo)
      let x = i * squareSize + frameSize / 2; //calcola quanto spostare il quadrato verso destra
      let y = j * squareSize + frameSize / 2; //calcola quanto spostare il quadrato verso il basso

      // variabile per calcolare la distanza del quadrato dal centro della griglia (in vista di quello che viene dopo)
      let distFromCenter = dist(x, y, centerX, centerY);

      // uso la funzione map() [che serve a trasformare un valore da un intervallo di numeri a un altro] e distortionfactor per far si che la distorsione dei quadrati avvenga in base alla distanza dal centro
      let distortionFactor = map(distFromCenter, 0, maxDist * 0.7, 20, 0); 
      // 0.7 è il valore massimo del distFromCenter che sto considerando (distanza massima dal centro)
      // 20 è il valore più alto del distortionFactor quando il quadrato è al centro (molto distorto)
      // 0 è il valore più basso del distortionFactor, quando il quadrato è all'estremo (poco distorto)

      // x ridurre gradualmente la distorsione dei quadrati man mano che mi avvicino ai bordi della griglia
      if (i < safeColumns || i >= cols - safeColumns || j < safeRows || j >= rows - safeRows) {
        // se il quadrato si trova nelle colonne/righe sicure la distorsione si riduce
        let edgeFactor = map(min(i, cols - 1 - i, j, rows - 1 - j), 0, max(safeColumns, safeRows), 0, 1);
        distortionFactor *= edgeFactor;
        // x capire quanto il quadrato è vicino ai bordi:
        //se il quadrato è molto vicino al bordo, edgeFactor sarà vicino a 1
        //se è lontano, edgeFactor sarà vicino a 0
      }

      // Applica una traslazione casuale e una leggera rotazione basata sulla distorsione
      push(); //funzione x "congelare" la posizione attuale delle cose che ho disegnato, così posso fare cambiamenti temporanei senza rovinare tutto :)

      translate(x + random(-distortionFactor, distortionFactor), y + random(-distortionFactor, distortionFactor));
      //genera un numero casuale che varia da -distortionFactor a +distortionFactor, così ogni quadrato viene spostato leggermente in modo casuale dalla sua posizione originale (effetto più omogeneo)
      
      // Aumenta l'ampiezza dell'angolo di rotazione
      rotate(random(-PI / 4, PI / 4) * (distortionFactor / 20)); // ruota il quadrato di un angolo casuale tra -45° e +45°, ma l'ampiezza dipende da quanto è distorto

      rect(0, 0, squareSize, squareSize);//disegna effettivamente i quadrati
      pop();//rippristina come era prima di "push"
    }
  }

  stroke(255); // Colore del contorno (bianco)

  // Imposta il titolo
  textAlign(CENTER);
  textSize(18);
  fill(0); // Colore del testo (nero)
  text("Boxes by William J. Kolomyjec, 1970-1975", width / 2, height - frameSize / 2 + 20); // posizione del testo
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight); // Ridimensiona il canvas se la finestra cambia dimensione
  redraw(); // Ridisegna il canvas
}