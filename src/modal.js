
(function(){

  var oldiOS = /OS [1-4]_\d like Mac OS X/i.test(navigator.userAgent),
    oldDroid = /Android 2.\d.+AppleWebKit/.test(navigator.userAgent),
    gingerbread = /Android 2\.3.+AppleWebKit/.test(navigator.userAgent);

  if(oldDroid){
    //<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=0;" />
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=0;';
    document.head.appendChild(meta);
  }

  function hasParentNode(elem, parent){
      if(parent.contains){
          return parent.contains(elem);
      }
      else{
          while(elem){
              if(elem === parent){
                  return true;
              }
              elem = elem.parentNode;
          }
          return false;
      }
  }

  window.addEventListener('keyup', function(event){
    if(event.keyCode == 27) xtag.query(document, 'x-modal[esc-hide]').forEach(function(modal){
      if (modal.getAttribute('hidden') === null) xtag.fireEvent(modal, 'modalhide');
    });
  });

  xtag.addEvent(document, "tap", function(e){
    var target = e.target;
    var modals = xtag.query(document, "x-modal:not([cancel-click-hide])");
    modals.forEach(function(modal){
      if(!hasParentNode(target, modal)){
        xtag.fireEvent(modal, "modalhide");
      }
    });
  });

  if (oldiOS || oldDroid) {
    window.addEventListener('scroll', function(event){
      var modals = xtag.query(document, 'body > x-modal');
      modals.forEach(function(m){
        m.style.top = (window.pageYOffset + window.innerHeight * 0.5) + 'px';
      });
    });
  }

  xtag.register('x-modal', {
    mixins: ['request'],
    lifecycle: {
      created: function() {
        this.setAttribute('tabindex',0);
      },
      inserted: function() {
        if (oldiOS || oldDroid) {
          this.style.top = (window.pageYOffset + window.innerHeight * 0.5) + 'px';
        }
      }
    },
    events: {
      'modalhide': function() {
        this.hide();
      }
    },
    accessors:{
      "hidden": {
        attribute: {boolean: true}
      },
      "overlay": {
        attribute: {boolean: true}
      },
      "escHide": {
        attribute: {boolean: true, name:"esc-hide"}
      },
      "cancelClickHide": {
        attribute: {boolean: true, name:"cancel-click-hide"}
      }
    },
    methods: {
      toggle: function() {
        if (this.hasAttribute('hidden')) {
          this.show();
        } else {
          this.hide();
        }
      },
      hide: function(){
        this.setAttribute("hidden", "");
      },
      show: function(){
        this.removeAttribute("hidden");
      }
    }
  });

})();
