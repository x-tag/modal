
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
    if (next) modal.parentNode.insertBefore(modal.overlayElement, next);
    else modal.parentNode.appendChild(modal.overlayElement);
  }
  
  window.addEventListener('keyup', function(event){
    if(event.keyCode == 27) xtag.query(document, 'x-modal[escape-hide]:not([hidden])').forEach(function(modal){
      modal.hide();
    });
  });

  if (oldiOS || oldDroid) {
    window.addEventListener('scroll', function(event){
      xtag.query(document, 'body > x-modal').forEach(setTop);
    });
  }

  xtag.register('x-modal', {
    lifecycle: {
      created: function() {
        this.overlayElement = document.createElement('x-modal-overlay');
        insertOverlay(this);
      },
      inserted: function() {
        if (oldiOS || oldDroid) setTop(this);
        this.xtag.lastParent = this.parentNode;
        insertOverlay(this);
      },
      removed: function(){
        if (this.xtag.lastParent) this.xtag.lastParent.removeChild(this.overlayElement);
        this.xtag.lastParent = null;
      }
    },
    events: {
      'tap:outer': function(e){
        if (!this.hasAttribute('hidden') && this.clickHide) this.hide();
      }
    },
    accessors: {
      overlay: {
        attribute: {boolean: true},
        set: function(){
          var last = this.className;
          this.className += ' x-modal-safari-redraw-bug';
          this.className = last;
        }
      },
      escapeHide: {
        attribute: {
          boolean: true,
          name: 'escape-hide'
        }
      },
      clickHide: {
        attribute: {
          boolean: true,
          name: 'click-hide'
        }
      }
    },
    methods: { 
      'show:transition(before)': function(){
        this.removeAttribute('hidden');
      },
      'hide:transition(after)': function(){
        this.setAttribute('hidden', '');
      },
      toggle: function() {
        this[this.hasAttribute('hidden') && 'show' || 'hide']();
      }
    }
  });
  
})();
