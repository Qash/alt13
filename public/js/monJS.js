function init(){
  var $body = document.body
  , $menu_trigger = $body.getElementsByClassName('menu-trigger')[0], $menubis_trigger = $body.getElementsByClassName('menubis-trigger')[0];

  if ( typeof $menu_trigger !== 'undefined' ) {
    $menu_trigger.addEventListener('click', function() {
      $body.className = ( $body.className == 'menu-active' )? '' : 'menu-active';
    });
  }
  if ( typeof $menubis_trigger !== 'undefined' ) {
    $menubis_trigger.addEventListener('click', function() {
      $body.className = ( $body.className == 'menubis-active' )? '' : 'menubis-active';

    });
  }
}





