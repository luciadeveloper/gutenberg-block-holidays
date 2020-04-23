( function( blocks, components, i18n, element ) {

    var el = element.createElement;
    var MediaUpload = wp.blockEditor.MediaUpload;
    var InnerBlocks = wp.blockEditor.InnerBlocks;
    var IconButton = components.Button;
   
  
    blocks.registerBlockType(
      'wpbeta/book', {
      title: i18n.__( 'Holidays' ),
      icon: 'book',
      category: 'common',
      attributes: {
        title: {type: 'string'},
        total: {type: 'int'},
        date: {type: 'string'},
        text: {type: 'string'},
        mediaID: {
          type: 'number',
        },
        mediaURL: {
          type: 'string',
          source: 'attribute',
          selector: 'img',
          attribute: 'src',
        }
      },
  
      edit: function( props ) {
  
        var focus = props.focus;
        var focusedEditable = props.focus ? props.focus.editable || 'name' : null;
        var alignment = props.attributes.alignment;
        var attributes = props.attributes;
        var contactURL = props.attributes.contactURL;
  
        function updateTitle(event) {
          props.setAttributes({title: event.target.value})
        }
  
        function updateURL(event) {
          props.setAttributes({url: event.target.value})
        }
        function updateTotal(event) {
          props.setAttributes({total: event.target.value})
        }
  
       
        function updateText(event) {
          props.setAttributes({text: event.target.value})
        }
  
      
  
        var onSelectImage = function( media ) {
          return props.setAttributes( {
            mediaURL: media.url,
            mediaID: media.id,
          } );
        };
        return [
         
          el( 'div', { className: props.className },
            el( 'div', {
              className: attributes.mediaID ? ' imgactive box-img' : ' img-disabled box-img',
              style: attributes.mediaID ? { backgroundImage: 'url(' + attributes.mediaURL + ')' } : {}
            },
              el( MediaUpload, {
                onSelect: onSelectImage,
                type: 'image',
                value: attributes.mediaID,
                render: function( obj ) {
                  return el( IconButton, {
                    className: attributes.mediaID ? 'image-button' : 'button button-large',
                    onClick: obj.open
                    },
                    ! attributes.mediaID ? i18n.__( 'Adjuntar una imagen' ) : el( 'img', { src: attributes.mediaURL } )
                  );
                }
              } )
            ),
            el( 'div', {
              className: 'form', style: { textAlign: alignment } },
              
                el(
                  "div",
                  { class: "form-box col2"},
                      el("label", {},'Total nights'),
                      el("input", { type: "number", value: props.attributes.total, onChange: updateTotal }),
                ),
  
                el(
                  "div",
                  { class: "form-box col2"},
                      el("label", {},'Destination'),
                      el("input", { type: "text", value: props.attributes.title, onChange: updateTitle }),
                ),
                el(
                  "div",
                  { class: "form-box"},
                      el("label", {},'Review'),
                      el("textarea", { rows: "4", cols: "90", value: props.attributes.text, onChange: updateText }),
                )
            ),
  
            el(InnerBlocks, {
              className:'prueba',
               allowedBlocks: [
                  'common/timeline',
                ],
             render: function( obj ) {
  
                console.log(obj);
            
            }}),
          )
        ];
      },
  
      save: function( props ) {
  
  
        var attributes = props.attributes;
  
        return (
          el( 'div', { className: props.className },
            el( "div",
              { class: "bloqueTimeline", 
                data_total: props.attributes.total, 
                data_read: props.attributes.read },
  
                el( "div",
                  { class: "content"},
                  el( "div",
                  { class: "infoD"},
                    el('div', { class: "date"},  props.attributes.date),
                  ),
  
                  el("div",
                    { class: "infoR"},
                    el( 'img', { src: attributes.mediaURL } ),
                    
                    el("div",{ class: "text"},
                      el( "h3",{ class: "title"},  props.attributes.title), 
                      el( "div",{ class: "total"}, 'Total nights: ' + props.attributes.total), 
                      el('div', {numberOfLines: 10, class: "desc"},  props.attributes.text),
                      el( InnerBlocks.Content, null ),
  
                    ),
                  ),
                  
                ), 
              )
          )
        );
      },
    } ),
  

    /* Child block */

    blocks.registerBlockType(
      'common/timeline', {
        title: i18n.__( 'Coments timeline' ),
        icon: 'chart-area',
        category: 'common',
        disabled:true,
        attributes: {
            hotel: {type: 'string'},
            nights: {type: 'int'},
            date: {type: 'string'},
            timeline: {type: 'string'}
        },
    
        edit: function( props ) {
    
            var focus = props.focus;
            var focusedEditable = props.focus ? props.focus.editable || 'name' : null;
            var alignment = props.attributes.alignment;
            var attributes = props.attributes;
            var contactURL = props.attributes.contactURL;
    
            function updateNights(event) {
            props.setAttributes({nights: event.target.value})
            }
    
            function updateTimeline(event) {
            props.setAttributes({timeline :event.target.value})
            }

            function updateHotel(event) {
                props.setAttributes({hotel :event.target.value})
            }
    
            return [
            
            el( 'div', { className: props.className },
                
                el( 'div', {
                className: 'form', style: { textAlign: alignment } },
                

                    el(
                        "div",
                        { class: "form-box col2"},
                            el("label", {},'Hotel '),
                            el("input", { type: "string", value: props.attributes.hotel, onChange: updateHotel }),
                        
                    ),

                    el(
                    "div",
                    { class: "form-box col2"},
                        el("label", {},'Nights '),
                        el("input", { type: "number", value: props.attributes.nights, onChange: updateNights }),
                    
                    ),
                    el(
                    "div",
                    { class: "form-box"},
                        el("label", {},'Your opinion'),
                        el("textarea", { rows: "4", cols: "90", value: props.attributes.timeline, onChange: updateTimeline }),
                    )
                )
            )
            ];
        },
    
        save: function( props ) {
    /*
            const monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
            var date = new Date().getDate(); //Current Date
            var month = monthNames[new Date().getMonth()]; //Current Month
            var year = new Date().getFullYear(); //Current Year
            var hours = new Date().getHours(); //Current Hours
            var min = new Date().getMinutes(); //Current Minutes
            var sec = new Date().getSeconds(); //Current Seconds
            var time = hours + ": " + min +" : "+ sec;
            var attributes = props.attributes;
    */
    
            return el("div",
                { class: "timeline"},

/*
                el('div', { class: "date"}, 
                    el('span', { class: "dia"}, date),
                    el('span', { class: "mes"}, month),
                    el('span', { class: "anio"}, year),
                ),
*/
                el('div', { class: "hotel"}, 'Hotel: ' +props.attributes.hotel),

                el('div', { class: "nights"}, 'Nigths at this hotel: ' +props.attributes.nights),
                
                el("div",{ class: "text"},
                    el('div', {
                        data_total:props.attributes.nights,
                        class: "desc",
                        data_total: props.attributes.total, 
                        data_read: props.attributes.nights,
                    },  
                    props.attributes.timeline),
                ),
            )
        },
    } );

} )(
    window.wp.blocks,
    window.wp.components,
    window.wp.i18n,
    window.wp.element,
);
  