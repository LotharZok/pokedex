/*
 *  Globale Variablen (Voreinstellungen)
 */
let startNumber = 0;    // Aktuelle Startnummer des angezeigten Sets
let maxNumber = 0;      // maximale Anzahl der Pokemons, wird beim ersten Start gesetzt
let curLanguage = 'de'; // Aktuelle Sprache (von: current Language)
let curCard = 0;        // Aktuelle Karte, die vergrößert angezeigt wird. Wird benötigt beim Blättern.
let curCardSet = [];    // Enthält die Karten des aktuell angezeigten Sets. Da gegen Ende die Karten nicht unbedingt eine lfd. ID-Nummer haben, brauche ich das beim Blättern.
let statsChart = null;  // Der Chart für die Statistics


/*
 *  Startet den Aufbau der Seite. Wird beim Laden der Seite aufgerufen.
 */
function init() {
    loadListOfPokemons(startNumber);
    loadSearchData();  // NICHT asynchron, damit die Suchdaten nebenbei geladen werden können
}


/*
 *  Startet das Laden der Übersicht für die Pokemons
 *
 *  @Param {integer} start - Die Nummer, mit der bei der Anzeige gestartet werden soll. Wird zum Blättern benötigt.
 */
async function loadListOfPokemons(start) {
    resetSearch();  // evtl. vorhandene Sucheinträge werden gelöscht

    let url = `https://pokeapi.co/api/v2/pokemon?offset=${start}&limit=40`; // offset = start (von 0 ausgehend), limit = anzahl
    let response = await fetch(url);
    let respJson = await response.json();
    curCardSet = [];

    document.getElementById('pokedex').innerHTML = '';
    maxNumber = +respJson['count'];  // Setzen der globalen Variablen mit der maximalen Anzahl der Pokemons, die angezeigt werden können

    for (let i = 0; i < respJson.results.length; i++) {
        const element = respJson.results[i];
        await loadPokemonByUrl(element.url);
    }
    showHideNextPrevious();
}


/*
 *  Lädt die Daten einer Pokemon-Karte
 *
 *  @Param {string} url - Die URL der Karte, deren Daten geladen werden sollen.
 */
async function loadPokemonByUrl(url) {
    let response = await fetch(url);
    let respJson = await response.json();

    // Variablen setzen, die ich noch brauche
    curCardSet.push(respJson.id);
    let color = `color${respJson['types'][0]['type']['name']}`;
    let imgLink = getImgLink(respJson);
    let languageName = await getLanguageName(respJson['species']['url']);

    renderSmallCard(languageName, respJson.id, color, imgLink);

    // types auswerten und ergänzen
    let typeArray = respJson['types'];
    for (let i = 0; i < typeArray.length; i++) {
        const element = typeArray[i];
        let typeUrl = element['type']['url'];
        color = `color${element['type']['name']}`;
        writeTypeData(typeUrl, `types-${respJson.id}`, `${color}dark`);
    }
}


/*
 *  Gibt den Link zum Image des gewählten Bildes zurück
 *  Problem ist die Stelle [home][front_shiny]
 *  --> [home] existiert evtl. nicht
 *  --> [home][front_shiny] enthält null
 *  --> In beiden Fällen soll [official-artwork][front_shiny] zurückgegeben werden
 * 
 *  @Param {JSON} srcJson - Das JSON-Objekt, daß u.a. die Pfadangaben enthält
 */
function getImgLink(srcJson) {
    let tmpLink = srcJson['sprites']['other'];
    if (tmpLink['home']) {
        if (srcJson['sprites']['other']['home']['front_shiny'] != null) {
            imgLink = srcJson['sprites']['other']['home']['front_shiny'];
        } else {
            imgLink = srcJson['sprites']['other']['official-artwork']['front_shiny'];
        }
    } else {
        imgLink = srcJson['sprites']['other']['official-artwork']['front_shiny'];
    }
    return imgLink;
}


/*
 *  Rendert die kleinen Übersichtskarten
 *
 *  @Param {string} name - Name der Figur
 *  @Param {string} id - Die ID der Figur
 *  @Param {string} color - Die Angaben für den Farbhintergrund der Karte, d.h. der Name der CSS-Klasse
 *  @Param {string} imgLink - Der im JSON angegebene Link zur Bilddatei
 */
function renderSmallCard(name, id, color, imgLink) {
    let cardNo = id.toString().padStart(4, '0');
    let cardString = `<div class="pokemonType cardNo">#${cardNo}</div>`;
    let newCard = `
        <div class="pokemonSmallCard ${color}" id="${id}">
            <div class="smallCardHeader">${name}</div>
            <div class="smallCardContent">
                <div class="pokemonTypes" id="types-${id}">
                    ${cardString}
                </div>
                <img src="${imgLink}" alt="${name}" class="pokemonImg" id="image-${id}" onclick="openCard(${id})">
            </div>
        </div>
    `;

    document.getElementById('pokedex').innerHTML += newCard;
}


/*
 *  Schreibt die zu suchenden Information in das übergebene Feld
 *
 *  @Param {string} url - Die URL, von der die Daten geholt werden sollen
 *  @Param {string} field - Die ID des Feldes, in das das Ergebnis geschrieben werden soll
 *  @Param {string} colorCode - Hintergrundfarbe, abhängig vom Type
*/
async function writeTypeData(url, field, colorCode) {
    let languageName = await getLanguageName(url);

    let newCode = `
        <div class="pokemonType ${colorCode}">${languageName}</div>
    `;
    document.getElementById(field).innerHTML += newCode;
}


/*
 *  Gibt die Bezeichnung anhand der eingestellten Sprache zurück
 *  Funktioniert für folgende Fälle:
 *      types
 *      abilities
 * 
 *  @Param {string} url - Die url des Objekts, für das ich die Übersetzung brauche
 */
async function getLanguageName(url) {
    let urlData = await fetch(url);
    let urlJSON = await urlData.json();

    for (let i = 0; i < urlJSON['names'].length; i++) {
        const element = urlJSON['names'][i];
        if (element['language']['name'] == curLanguage) { 
            return element.name;
        }
    }
}


/*
 *  Gibt den Namen der Figur zurück, abhängig von der eingestellten Sprache.
 *  Ausgelagert in separate Funktion, weil der Zugriff hier ein wenig anders erfolgt, als in getLanguageName
 *
 *  @Param {string} url - Die url des Objektes, in der ich die Übersetzung finde
 */
async function getSpeciesName(url) {
    let urlData = await fetch(url);
    let urlJSON = await urlData.json();

    for (let i = 0; i < urlJSON['genera'].length; i++) {
        const element = urlJSON['genera'][i];
        if (element.language.name == curLanguage) {
            return element.genus;
        }
    }
}


/*
 *  Öffnet eine Karte in großer Ansicht
 *
 *  @Param {string} cardID - Die ID der Karte, die geöffnet werden soll
 */
async function openCard(cardID) {
    document.getElementById('openCard').style.display = 'flex';  // sichtbar schalten
    curCard = +cardID;

    // Daten laden
    let url = `https://pokeapi.co/api/v2/pokemon/${cardID}/`;
    let response = await fetch(url);
    let respJson = await response.json();

    // Grunddaten einfügen
    let name = await getLanguageName(respJson['species']['url']);
    document.getElementById('lgTitle').innerHTML = name;
    document.getElementById('lgNumber').innerHTML = '#' + cardID.toString().padStart(4, '0');

    // id cardUpperPart bekommt eine Farbklasse, je nach erstem type
    color = `color${respJson['types'][0]['type']['name']}`;
    // bisherige Farb-Klassen löschen (Kann beim Blättern vorkommen, daß eine Klasse vorhanden ist)
    // Da außer der Farbklasse keine Klassen eingetragen werden, kann ich auch einfach löschen
    document.getElementById('cardUpperPart').classList = '';
    document.getElementById('cardUpperPart').classList.add(color);
    
    // Typen einfügen
    await openCardAddTypes(respJson['types']);

    // Informationen einfügen
    await openCardAddInformations(respJson);

    // Statistiken einfügen
    openCardAddStats(respJson);
}


/*
 *  Ergänzt die Typangaben zur großen geöffneten Karte
 *  Ausgelagert, damit openCard kürzer ist ... hat ansonsten keinen Sinn. Leichter lesbar wird es m.E. nicht...
 * 
 *  @Param {array} typeArray - Das Array mit den einzelnen Typen. Enthält jeweils ein JSON mit weiteren Infos
 */
async function openCardAddTypes(typeArray) {
    document.getElementById('lgTypes').innerHTML = '';
    for (let i = 0; i < typeArray.length; i++) {
        const element = typeArray[i];
        let typeUrl = element['type']['url'];
        color = `color${element['type']['name']}dark`;
        let languageName = await getLanguageName(typeUrl);

        let newCode = `
            <span class="lgType ${color}">${languageName}</span>
        `;
        document.getElementById('lgTypes').innerHTML += newCode;
    }
}


/*
 *  Ergänzt die Fähigkeiten zur großen geöffneten Karte
 *  Ausgelagert, damit openCard kürzer ist ... hat ansonsten keinen Sinn. Leichter lesbar wird es m.E. nicht...
 * 
 *  @Param {json} respJson - Ein JSON mit allen benötigten Infos
 */
async function openCardAddInformations(respJson) {
    // Weitere Daten einfügen
    document.getElementById('lgImg').src = getImgLink(respJson);                          // Bild
    let languageSpecies = await getSpeciesName(respJson['species']['url']);
    document.getElementById('lgInfoSpecies').innerHTML = languageSpecies;                 // Spezies
    document.getElementById('lgInfoHeight').innerHTML = (+respJson['height'])/10 + ' m';  // Größe
    document.getElementById('lgInfoWeight').innerHTML = (+respJson['weight'])/10 + ' kg'; // Gewicht

    // Fähigkeiten (können mehrere sein)
    let abilities = [];
    for (let i = 0; i < respJson['abilities'].length; i++) {
        const element = respJson['abilities'][i];
        let languageName = await getLanguageName(element['ability']['url']);
        abilities.push(languageName);
    }
    document.getElementById('lgInfoAbi').innerHTML = abilities.join(', ');
}


/*
 *  Ergänzt die Statistiken zur großen geöffneten Karte
 *  Ausgelagert, damit openCard kürzer ist ... hat ansonsten keinen Sinn. Leichter lesbar wird es m.E. nicht...
 * 
 *  @Param {json} respJson - Ein JSON mit allen benötigten Infos
 */
function openCardAddStats(respJson) {
    let values = [];
    let valuesArray = respJson['stats'];
    for (let i = 0; i < valuesArray.length; i++) {
        const value = valuesArray[i];
        values.push(value['base_stat']);
    }
    renderStats(values);
}


/* 
 * Schließt das Vergrößerungsfenster
 */
function closeCard() {
    document.getElementById('openCard').style.display = 'none';  /* Die Zuweisung der Klasse d-none hat hier nicht funktioniert ... warum nicht? */
}


/*
 *  Blättert in der Vergrößerungsansicht
 *  Vorsicht: Da die IDs nicht unbedingt fortlaufend sind, muss ich erst nachsehen, an welcher Stelle die aktuelle ID im Array curCardSet steht.
 * 
 *  @Param {string} whereTo - 'previous' oder 'next'
 */
function goToCard(whereTo, event) {
    event.stopPropagation();

    let pos = curCardSet.indexOf(curCard);
    if (whereTo == 'previous') {
        (pos == 0) ? curCard = curCardSet[curCardSet.length - 1] : curCard = curCardSet[pos - 1];
    } else {
        (pos == curCardSet.length - 1) ? curCard = curCardSet[0] : curCard = curCardSet[pos + 1];
    }
    openCard(curCard);
}


/*
 *  Blättert zur vorherigen Übersichtsseite
 */
function prevPage() {
    if (startNumber >= 40) {
        startNumber = startNumber - 40;
        loadListOfPokemons(startNumber);
    }
}


/*
 *  Blättert zur nächsten Übersichtsseite
 */
function nextPage() {
    if (startNumber <= maxNumber - 40) {
        startNumber = startNumber + 40;
        loadListOfPokemons(startNumber);
    }
}


/*
 *  Zeigt abhängig von der aktuellen Start-Nummer die Buttons 'vorherige Seite' und/oder 'nächste Seite' an
 */
function showHideNextPrevious() {
    (startNumber < 40) ? document.getElementById('btnPrevious').classList.add('d-none') : document.getElementById('btnPrevious').classList.remove('d-none');
    (startNumber > maxNumber - 40) ? document.getElementById('btnNext').classList.add('d-none') : document.getElementById('btnNext').classList.remove('d-none');
}


/*
 *  Zeigt auf der großen Karte zu einer Figur den Bereich 'Information' an
 */
function showAbout(event) {
    event.stopPropagation();
    document.getElementById('lgAbout').classList.remove('d-none');
    document.getElementById('lgStats').classList.add('d-none');
}


/*
 *  Zeigt auf der großen Karte zu einer Figur den Bereich 'Statistiken' an
 */
function showStats(event) {
    event.stopPropagation();
    document.getElementById('lgAbout').classList.add('d-none');
    document.getElementById('lgStats').classList.remove('d-none');
}


/*
 *  Rendert auf der großen Karte zu einer Figur den Chart-Bereich
 *
 *  @Param {array} values - Ein Array mit den darzustellenden Werten
 */
async function renderStats(values) {
    // Wichtig: Wenn vorher bereits einmal eine Chart erstellt wurde, muss diese zunächst entfernt werden.
    //          Ansonsten ist der Canvas bereits belegt und es gibt einen Fehler
    if (statsChart) {
        statsChart.clear();
        statsChart.destroy();
    }
    const ctx = document.getElementById('chart').getContext('2d');

    statsChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: chartLabels,
            datasets: [{
                label: '',
                data: values,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            indexAxis: 'y',
            plugins: {
                legend: {
                    display: false,
                }
            },
            responsive: false,
            scales: {
                x: {
                    max: 255,
                },
                y: {
                    beginAtZero: true,
                }
            },
        }
    });
}