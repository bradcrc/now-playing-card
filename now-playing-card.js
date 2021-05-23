function removeURLParameter(url, parameter) {
  //prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');
  if (urlparts.length >= 2) {

      var prefix = encodeURIComponent(parameter) + '=';
      var pars = urlparts[1].split(/[&;]/g);

      //reverse iteration as may be destructive
      for (var i = pars.length; i-- > 0;) {
          //idiom for string.startsWith
          if (pars[i].lastIndexOf(prefix, 0) !== -1) {
              pars.splice(i, 1);
          }
      }

      return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  }
  return url;
}

class NowPlayingPoster extends HTMLElement {
  set hass(hass) {
    if (!this.content) {
      const card = document.createElement('ha-card');
      this.content = document.createElement('div');
      //this.content.style = "!important;";
      card.appendChild(this.content);
      card.style = "background: none;";
      this.appendChild(card);
    }

    const offposter = this.config.off_image;
    const entityId = this.config.entity;
    const state = hass.states[entityId];
    const stateStr = state ? state.state : 'unavailable';

    if (state) {
      const movposter = removeURLParameter(state.attributes.entity_picture,'cache');
      if (["playing", "on"].indexOf(stateStr) > -1 ) {
        if ( !movposter ) {
          if ( offposter ) {
            this.content.innerHTML = `
            <!-- now playing card ${entityId} -->
            <img src="${offposter}" width=100% align="center" style="">
            `;
          } else {
            this.content.innerHTML = `
            <!-- now playing card ${entityId}  no image-->
            `;
          }
        }  else {
        this.content.innerHTML = `
        <!-- now playing card ${entityId}  -->
        <img src="${movposter}" width=100% height=100%">
        `;
        }
      } else {
        if ( offposter ) {
          this.content.innerHTML = `
          <!-- now playing card ${entityId} -->
          <img src="${offposter}" width=100% align="center" style="">
          `;
        }  else {
          this.content.innerHTML = `
          <!-- now playing card ${entityId}  no image-->
          `;
        }
      }
    } else {
      this.content.innerHTML = `
      <!-- now playing card ${entityId} not playing -->
      `;
    }
  }

  setConfig(config) {
    if (!config.entity) {
      throw new Error('You need to define an entity');
    }
    this.config = config;
  }

  // The height of your card. Home Assistant uses this to automatically
  // distribute all cards over the available columns.
  getCardSize() {
    return 3;
  }
}

customElements.define('now-playing-poster', NowPlayingPoster);
