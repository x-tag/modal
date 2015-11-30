
(function(){

  var oldiOS = /OS [1-4]_\d like Mac OS X/i.test(navigator.userAgent),
      oldDroid = /Android 2.\d.+AppleWebKit/.test(navigator.userAgent),
      gingerbread = /Android 2\.3.+AppleWebKit/.test(navigator.userAgent);

  if (oldDroid){
    //<meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=0;" />
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width; initial-scale=1.0; maximum-scale=1.0; minimum-scale=1.0; user-scalable=0;';
    document.head.appendChild(meta);
  }

  function setTop(modal){
    modal.style.top = (window.pageYOffset + window.innerHeight * 0.5) + 'px';
  }

  function insertOverlay(modal){
    var next = modal.nextElementSibling;
    if (next) modal.parentNode.insertBefore(modal.xtag.overlayElement, next);
    else modal.parentNode.appendChild(modal.xtag.overlayElement);
  }

  window.addEventListener('keyup', function(event){
    if (event.keyCode == 27) xtag.query(document, 'x-modal[hide-triggers~="esc"]:not([hidden])').forEach(function(modal){
      modal.hide();
    });
  });

  if (oldiOS || oldDroid) {
    window.addEventListener('scroll', function(event){
      xtag.query(document, 'body > x-modal').forEach(setTop);
    });
  }

  xtag.addEvents(document, {
    'tapstart:delegate(x-modal-overlay)': function(e){
      this.__overlayTapstart__ = true;
    },
    'tapend:delegate(x-modal-overlay)': function(e){
      var modal = this.__modal__;
      if (this.__overlayTapstart__ && modal && (modal.hideTriggers || '').indexOf('tap') > -1){
        this.__overlayTapstart__ = false;
        modal.hide();
      }
    }
});

  xtag.register('x-modal', {
    lifecycle: {
      created: function() {
        this.xtag.overlayElement = document.createElement('x-modal-overlay');
        this.xtag.overlayElement.setAttribute('hidden','');
        this.xtag.overlayElement.__modal__ = this;
      },
      inserted: function() {
        if (oldiOS || oldDroid) setTop(this);
        insertOverlay(this);
      },
      removed: function(parent){
        if (parent) parent.removeChild(this.xtag.overlayElement);
      }
    },
    accessors: {
      overlay: {
        attribute: {boolean: true}
      },
      hideTriggers: {
        attribute: {}
      }
    },
    methods: {
      'show:transition(before)': function(){
        this.removeAttribute('hidden');
        this.xtag.overlayElement.removeAttribute('hidden');
        xtag.fireEvent(this, 'show');
      },
      'hide:transition(after)': function(){
        this.setAttribute('hidden', '');
        this.xtag.overlayElement.setAttribute('hidden','');
        xtag.fireEvent(this, 'hide');
      },
      toggle: function() {
        this[this.hasAttribute('hidden') && 'show' || 'hide']();
      }
    }
  });

})();
