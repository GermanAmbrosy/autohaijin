const verses = {
  primavera: [
    "Cerezo rosa",
    "Vencejos pardos.",
    "Canto de aves al alba.",
    "Las flores se abren",
    "La brisa susurra",
    "El jardinero.",
    "La brisa perfumada",
    "Abejas zumbando,",
    "El sol se asoma",
    "Los pájaros cantan",
    "Verde es el campo,",
    "La lluvia de Abril",
    "Flores renacen",
    "Arco iris en el cielo",
    "Las mariposas blancas",
    "Sobre las amapolas",
    "Bailan al viento",
    "Ya renace la vida.",
    "Colores que alegran el alma",
    "La vida se renueva",
    "Lluvia que refresca",
    "Gotas que caen del cielo",
    "Arcoiris que brilla",
    "Mariposas vuelan",
    "Entre las hojas verdes",
    "Belleza que asombra",
    "Melodías que encantan",
    "Algodón blanco",
    "Las abejas que vuelan",
    "cerca de la maceta",
    "Bajo las nubes",
    "van robando el polen",
    "ya se va despertando",
    "Los blancos pétalos"
  ],
  verano: [
    "Calor sofocante",
    "Mosquito en la luz",
    "Sol ardiente brilla",
    "Arena caliente quema",
    "El mar en calma",
    "Sol que calienta",
    "Calor intenso",
    "Busco la sombra de un árbol",
    "Yo refresco mi sed",
    "El mar es azul",
    "invita a zambullirnos",
    "La espuma de las olas",
    "Noche estrellada",
    "La luna llena brilla",
    "Grillos chirriando",
    "Noche cerrada",
    "El Sabor del verano",
    "Ojos profundos",
    "Canto rodado",
    "Roca redonda",
    "El océano gris",
    "Arena que acaricia",
    "Final de Junio"
  ],
  otoño: [
    "Las hojas rojas",
    "Naranja se pondrá",
    "Tapizan el suelo gris",
    "De rojo y oro",
    "Arrastra las nubes",
    "Frío en el aire",
    "La Calabaza",
    "Naranjas y redondas",
    "La sopa calentita",
    "Humo, aroma",
    "Viento susurra",
    "soplan las hojas secas",
    "Montón crujiente",
    "Cuando baja el sol",
    "Final de Octubre",
    "Amarilla la parra",
    "fiebre otoñal",
    "mis orejas están rojas"
  ],
  invierno: [
    "Nieve en la montaña",
    "El año es fugaz",
    "La manga larga",
    "Blanca y silenciosa",
    "Paisaje de paz",
    "Frío que cala",
    "Me abrigo con un gorro",
    "Y una bufanda",
    "Chocolate calentito",
    "Con nubes de azúcar",
    "Dulce tentación",
    "Copos de nieve",
    "Únicos e irrepetibles",
    "Belleza efímera",
    "Nieve que cubre",
    "la montaña dormida"
  ]
};

const recentVerses = {
  primavera: [],
  verano: [],
  otoño: [],
  invierno: []
};

const maxRecentVerses = 10; // Número máximo de versos recientes a almacenar

function generateHaiku(season) {
  const line1 = document.getElementById("line1");
  const line2 = document.getElementById("line2");
  const line3 = document.getElementById("line3");

  if (!line1 || !line2 || !line3) {
    alert("Uno o más elementos de línea no fueron encontrados en el DOM.");
    return;
  }

  const possibleVerses = verses[season];
  if (!possibleVerses) {
    alert("La temporada proporcionada no es válida.");
    return;
  }

  const chosenIndices = [];
  const recent = recentVerses[season];

  function getRandomVerse(targetSyllables) {
    let randomIndex;
    let verse;
    let attempts = 0;
    const maxAttempts = 100;

    do {
      randomIndex = Math.floor(Math.random() * possibleVerses.length);
      verse = possibleVerses[randomIndex];
      attempts++;
    } while (
      (countSyllables(verse) !== targetSyllables ||
      !isUnique(randomIndex, chosenIndices) ||
      recent.includes(verse)) &&
      attempts < maxAttempts
    );

    if (attempts >= maxAttempts) {
      console.log("No se pudo encontrar un verso adecuado después de varios intentos.");
      return null;
    }

    // Añadir el verso a la lista de recientes y eliminar los más antiguos si es necesario
    recent.push(verse);
    if (recent.length > maxRecentVerses) {
      recent.shift();
    }

    return { index: randomIndex, verse: verse };
  }

  const verse1Obj = getRandomVerse(5);
  const verse2Obj = getRandomVerse(7);
  const verse3Obj = getRandomVerse(5);

  if (verse1Obj && verse2Obj && verse3Obj) {
    line1.textContent = verse1Obj.verse;
    line2.textContent = verse2Obj.verse;
    line3.textContent = verse3Obj.verse;
  } else {
    alert("Al poeta se le ha acabado la inspiración: No se pueden generar más versos.");
  }
}

// Función que comprueba si un índice es único y lo añade al array de índices elegidos
function isUnique(index, array) {
  if (array.includes(index)) {
    return false;
  }
  array.push(index);
  return true;
}

function countSyllables(verse) {
  const vowels = "aeiouáéíóúüAEIOUÁÉÍÓÚÜ";
  let syllables = 0;
  let length = verse.length;

  for (let i = 0; i < length; i++) {
    if (vowels.includes(verse[i])) {
      if (i > 0 && vowels.includes(verse[i - 1])) {
        // Skip this syllable if it's part of a diphthong
        continue;
      }
      syllables++;
    }
  }

  return syllables;
}

function hasSineresis(verse) {
  const sineresisPatterns = [
    "ae", "ao", "ea", "eo", "ia", "ie", "io", "iu",
    "oa", "oe", "oi", "ou", "ua", "ue", "ui", "uo"
  ];
  for (let pattern of sineresisPatterns) {
    if (verse.includes(pattern)) {
      return true;
    }
  }
  return false;
}

function revisarMetrica(haiku) {
  const versos = haiku.split("\n");
  if (versos.length !== 3) {
    return "Un haiku debe tener tres versos";
  }
  const silabas = versos.map((verso) => countSyllables(verso));
  if (silabas[0] !== 5 || silabas[1] !== 7 || silabas[2] !== 5) {
    return "Un haiku debe tener 5-7-5 sílabas en sus versos";
  }
  return "El haiku cumple con la métrica tradicional";
}
