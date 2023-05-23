// Die Such-Arrays enthalten später die Namen der Pokemons in der jeweiligen Sprache und
// getrennt durch ein ~~~ den Link zum Pokemon. Auf diese Weise können die Daten dann 
// mit einer einfachen Suche mittels .includes(...) durchsucht werden.
let deSearchArray = [];
let enSearchArray = [];
let frSearchArray = [];
let esSearchArray = [];
let itSearchArray = [];

let searchArray = [];
let resultArray = [];


/* 
 *  Startet das Laden der Suchdaten. Ruft hierzu Unterfunktionen auf.
 *
 *  Der Code wurde bewusst weitgehend getrennt vom üblichen Code gehalten, damit das Laden der Such-Infos parallel erfolgen kann
 */
async function loadSearchData() {
    document.getElementById('search').placeholder = searchWait;
    document.getElementById('search').disabled = true;
    let url = 'https://pokeapi.co/api/v2/pokemon?limit=10000&offset=0';  // Damit zukünftige Erweiterungen auch geladen werden: limit: 10000
    let dataset = await fetch(url); // Das ist ein Array mit allen Pokemons (es gibt. z.Z. 1281)
    let json = await dataset.json();

    jsonArray = json['results'];
    for (let i = 0; i < jsonArray.length; i++) {
        const element = jsonArray[i];

        await getPokemonData(element['url']);
    }

    setSearchArray();
    document.getElementById('search').disabled = false;
    document.getElementById('search').placeholder = searchPlaceholder;
}


/*
 *  Lädt die Daten des Pokemons, dessen URL übergeben wurde. Ruft anschließend die Species-Daten auf.
 *
 *  @Param {string} url - Die URL des Pokemons, dessen Daten geladen werden sollen.
 */
async function getPokemonData(pokeUrl) {
    let dataset = await fetch(pokeUrl); // Das sind jetzt die Daten des Pokemons
    let json = await dataset.json();
    let speciesUrl = json['species']['url'];

    getSpeciesLanguage(speciesUrl, pokeUrl);
}


/*
 *  Lädt die Species-Daten eines Pokemons. Diese enthalten die Übersetzugen des Namens.
 *
 *  @Param {string} speciesUrl - Die URL des Species-Eintrags, aus dem die Daten geladen werden sollen.
 *  @Param {string} pokeUrl - Die URL des Pokemons. Diese Angabe wird zur Speicherung im Array benötigt.
 */
async function getSpeciesLanguage(speciesUrl, pokeUrl) {
    let dataset = await fetch(speciesUrl); // Das sind jetzt die Daten der Species
    let json = await dataset.json();
    let nameArray = json['names'];
    for (let i = 0; i < nameArray.length; i++) {
        let el = nameArray[i]['language']['name'];
        switch(el) {
        case 'en':
            enSearchArray.push(nameArray[i]['name'] + '~~~' + pokeUrl);
            break;
        case 'de':
            deSearchArray.push(nameArray[i]['name'] + '~~~' + pokeUrl);
            break;
        case 'fr':
            frSearchArray.push(nameArray[i]['name'] + '~~~' + pokeUrl);
            break;
        case 'es':
            esSearchArray.push(nameArray[i]['name'] + '~~~' + pokeUrl);
            break;
        case 'it':
            itSearchArray.push(nameArray[i]['name'] + '~~~' + pokeUrl);
        }
    }
}


/*
 *  Überschreibt das searchArray mit dem Array der aktuell gewählten Sprache
 */
function setSearchArray() {
    switch(curLanguage) {
        case 'en':
            searchArray = enSearchArray;
            break;
        case 'de':
            searchArray = deSearchArray;
            break;
        case 'fr':
            searchArray = frSearchArray;
            break;
        case 'es':
            searchArray = esSearchArray;
            break;
        case 'it':
            searchArray = itSearchArray;
        }
}


/*
 *  Startet eine Suche und zeigt ggf. das Ergebnis an
 */
async function startSearch() {
    resultArray = [];  // Falls bereits ein Suchergebnis vorhanden ist, dieses löschen
    if (!document.getElementById('search').checkValidity()) {
        alert(document.getElementById('search').validationMessage);
    } else {
        curCardSet = [];  // Wird benötigt zum Blättern durch die Suchergebnisse
        let searchValue = document.getElementById('search').value;
        for (let i = 0; i < searchArray.length; i++) {
            let element = searchArray[i];
            let splitted = element.split('~~~'); // [0] enthält den Namen, [1] die URL zur Karte
            if(splitted[0].toLowerCase().includes(searchValue.toLowerCase())) {
                resultArray.push(splitted);
            }
        }
        // Die gefundenen Karten rendern
        document.getElementById('pokedex').innerHTML = '';
        for (let j = 0; j < resultArray.length; j++) {
            let url = resultArray[j][1];
            await loadPokemonByUrl(url);
        }
        // Button 'Suche schließen' sichtbar schalten
        document.getElementById('closeSearch').style.display = 'block';
    }
}


/*
 *  Resettet eine Suchanfrage
 */
function resetSearch() {
    document.getElementById('search').value = '';
    document.getElementById('closeSearch').style.display = 'none';
    resultArray = [];
}