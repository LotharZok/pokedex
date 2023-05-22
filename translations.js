/*
 *  Hinweis zu den Übersetzungs-JSONs:
 *  Der Key innerhalb der JSONs entspricht jeweils der ID des Elements, dessen Text (innerHTML) ersetzt werden soll.
 */


/*
 *  Deutsche Übersetzungen
 */
const translation_de = {
    'btnPrevious': 'vorherige Seite',
    'btnNext': 'nächste Seite',
    'btnSearch': 'Suchen',
    'btnImprint': 'Impressum',
    'btnPolicy': 'Datenschutz',
    'btnCloseSearch': 'Suchergebnis schließen',
    'selectInfo': 'Information',
    'selectStats': 'Statistiken',
    'lblInfoSpecies': 'Spezies',
    'lblInfoHeight': 'Gewicht',
    'lblInfoWeight': 'Größe',
    'lblInfoAbilities': 'Fähigkeiten',
}
const chartLabels_de = ['KP', 'Angriff', 'Verteidigung', 'Spez.-Angr.', 'Spez.-Vert.', 'Initiative'];
const searchPlaceholder_de = 'Suche in Pokémon Dex';


/*
 *  Englische Übersetzungen
 */
const translation_en = {
    'btnPrevious': 'previous page',
    'btnNext': 'next page',
    'btnSearch': 'Search',
    'btnImprint': 'Disclaimer (german)',
    'btnPolicy': 'Privacy Policy (german)',
    'btnCloseSearch': 'Close search results',
    'selectInfo': 'Information',
    'selectStats': 'Statistics',
    'lblInfoSpecies': 'Species',
    'lblInfoHeight': 'Height',
    'lblInfoWeight': 'Weight',
    'lblInfoAbilities': 'Abilities',
}
const chartLabels_en = ['HP', 'Attack', 'Defense', 'Sp. Attack', 'Sp. Defense', 'Speed'];
const searchPlaceholder_en = 'Search in Pokémon Dex';


/*
 *  Französische Übersetzungen
 */
const translation_fr = {
    'btnPrevious': 'page précédente',
    'btnNext': 'page suivante',
    'btnSearch': 'Rechercher',
    'btnImprint': 'Avertissements (allemand)',
    'btnPolicy': 'PDC (allemand)',
    'btnCloseSearch': 'Fermer les résultats de la recherche',
    'selectInfo': 'Informations',
    'selectStats': 'Statistiques',
    'lblInfoSpecies': 'Espèce',
    'lblInfoHeight': 'Taille',
    'lblInfoWeight': 'Poids',
    'lblInfoAbilities': 'Talents',
}
const chartLabels_fr = ['PV', 'Attaque', 'Défense', 'Att. Spec.', 'Déf. Spec.', 'Vitesse'];
const searchPlaceholder_fr = 'Rechercher sur Pokémon Dex';


/*
 *  Spanische Übersetzungen
 */
const translation_es = {
    'btnPrevious': 'página precedente',
    'btnNext': 'página siguiente',
    'btnSearch': 'Buscar',
    'btnImprint': 'LDR (alemán)',
    'btnPolicy': 'PP (alemán)',
    'btnCloseSearch': 'Cerrar resultado de búsqueda',
    'selectInfo': 'Información',
    'selectStats': 'Estadísticas',
    'lblInfoSpecies': 'Especie',
    'lblInfoHeight': 'Altura',
    'lblInfoWeight': 'Peso',
    'lblInfoAbilities': 'Habilidad',
}
const chartLabels_es = ['PS', 'Ataque', 'Defensa', 'At. esp.', 'Def. esp.', 'Velocidad'];
const searchPlaceholder_es = 'Buscar en Pokémon Dex';


/*
 *  Italienische Übersetzungen
 */
const translation_it = {
    'btnPrevious': 'pagina precedente',
    'btnNext': 'pagina successiva',
    'btnSearch': 'Cerca',
    'btnImprint': 'Avvertenze (tedesco)',
    'btnPolicy': 'PP (tedesco)',
    'btnCloseSearch': 'Chiudere i risultati della ricerca',
    'selectInfo': 'Informazioni',
    'selectStats': 'Statistiche',
    'lblInfoSpecies': 'Specie',
    'lblInfoHeight': 'Altezza',
    'lblInfoWeight': 'Peso',
    'lblInfoAbilities': 'Abilità',
}
const chartLabels_it = ['PS', 'Attacco', 'Difesa', 'Att. Sp.', 'Dif. Sp.', 'Velocità'];
const searchPlaceholder_it = 'Cerca in Pokémon Dex';


/*
 *  Dies sind die Variablen, die zur Anzeige herangezogen werden. Ihnen wird bei einem Sprachwechsel die jeweils ausgewählte Sprache zugeordnet.
 *  Vorgabe ist Deutsch.
 */
let translations = translation_de;
let chartLabels = chartLabels_de;
let searchPlaceholder = searchPlaceholder_de;


/*
 *  Ändert die Spracheinstellung und lädt mit dieser die Seite neu.
 *
 *  @Param {string} language - Das Kürzel der Sprache, die geladen werden soll. Vorgabe: 'de'.
 */
function changeLanguage(language) {
    // console.log('changeLanguage gestartet');
    // Ziehen der Spracheinstellungen/Übersetzungen
    curLanguage = language;
    switch (language) {
        case 'de':
            translations = translation_de;
            chartLabels = chartLabels_de;
            searchPlaceholder = searchPlaceholder_de;
            searchArray = deSearchArray;
            break;
        case 'en':
            translations = translation_en;
            chartLabels = chartLabels_en;
            searchPlaceholder = searchPlaceholder_en;
            searchArray = enSearchArray;
            break;
        case 'fr':
            translations = translation_fr;
            chartLabels = chartLabels_fr;
            searchPlaceholder = searchPlaceholder_fr;
            searchArray = frSearchArray;
            break;
        case 'es':
            translations = translation_es;
            chartLabels = chartLabels_es;
            searchPlaceholder = searchPlaceholder_es;
            searchArray = esSearchArray;
            break;
        case 'it':
            translations = translation_it;
            chartLabels = chartLabels_it;
            searchPlaceholder = searchPlaceholder_it;
            searchArray = itSearchArray;
            break;
        default:
            translations = translation_de;
            chartLabels = chartLabels_de;
            searchPlaceholder = searchPlaceholder_de;
            searchArray = deSearchArray;
            curLanguage = 'de';
    }
    // Zuteilen der Übersetzungen
    for (var key in translations) {
        document.getElementById(key).innerHTML = translations[key];
    }
    document.getElementById('search').placeholder = searchPlaceholder;

    loadListOfPokemons(startNumber);
}