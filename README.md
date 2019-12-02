
# now-playing-card

This is a **beta version** and not yet ready for release.  


Custom card for [Home Assistant](https://www.home-assistant.io/) to display a poster of the currently playing item in designated media_player.


This works with those media_player entities supporting the entity_picture attribute.   Roku, Kodi, and Amazon Echo Dot seem to work well for me.


------------

#### entity
(string)(Required)

Entity id
 
&nbsp;
  
  
#### off_image
(string)(optional)

Optional Image to display when idle.  This must be the same size as the media image if using scaling.




------------

## Example Usage


          - type: "custom:now-playing-poster"
            entity: media_player.dot_lr  
              
              

              
              
              
# Installation
  
Installation is the same as any custom card.

1. Copy the file [now-playing-card.js](https://github.com/bradcrc/Now-Playing-Card) to your /config/www/js/ directory

2. Add the following to the resources area of your ui-lovelace.yaml


            - url: /local/js/now-playing-card.js
              type: js

