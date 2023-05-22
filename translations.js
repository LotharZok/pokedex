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