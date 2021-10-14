/*
  Specs:
    - apostrophe: \' (example: There\'s)
    - line break: <br> (example: Find one.<br>Or two.)
    - non-breakable space: &nbsp; (example: There&nbsp;is)
*/

let texts = {
  fr: {
    title: 'Memory',
    start_title: 'Une mémoire d\'éléphant ',
    start_text: 'Retrouvez les paires de cartes cachées en un minimum de temps !',
    start_button: 'Commencer',
    orientation_text: 'Orientation conseillée&nbsp;:<br>portrait',
    action_text: 'Action&nbsp;:<br>touchez l\'écran',
    settings_title: 'Paramètres',
    music_label: 'Musique',
    sounds_label: 'Sons',
    close_button: 'Fermer',
    close_button_settings: 'Fermer',
    success_title: 'Bravo&nbsp;!',
    success_text: 'Vous avez réussi à retrouver toutes les paires de cartes !',
    success_button: 'Terminer <img id="exit" src="image/exit.png"  class="position-relative" style="width: 23px; height: 23px; bottom: 2px;">',
    time_text: '<span id="time"></span>',
    reset_game: '<img id="retry" src="image/retry.png"  class="position-relative" style="width: 20px; height: 20px; bottom: 2px;"> Rejouer'
  },
  en: {
	start_button: 'start',
  },
  de: {

  }
};
