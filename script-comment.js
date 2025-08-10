$.noConflict();
jQuery(function($){

	// load more button click event
	$('.misha_comment_loadmore').click( function(){
		var button = $(this);

		// decrease the current comment page value
		cpage--;

		$.ajax({
			url : ajaxurl, // AJAX handler, declared before
			data : {
				'action': 'cloadmore', // the parameter for admin-ajax.php
				'post_id': parent_post_id, // the current post
				'cpage' : cpage, // current comment page
			},
			type : 'POST',
			beforeSend : function ( xhr ) {
				button.text('กำลังโหลด...'); // some type of preloader
			},
			success : function( data ){
				if( data ) {
					$('ol.commentlist').append( data ); // insert comments
					button.text('โหลดความเห็นเพิ่มเติม...');
					if ( cpage == 1 ) // if the last page, remove the button
						button.remove();
				} else {
					button.remove();
				}
			}
		});
		return false;
	});

});

// If you would like infinite scrolling, uncomment this
//
// jQuery(document).on('scroll', function() {
// 	var btn = jQuery('.misha_comment_loadmore');
// 	if( (jQuery(this).scrollTop() + jQuery(window).height() ) >= btn.offset().top){
//
// 		// check if the ajax request isn't in process right now
// 		if( button.text() == 'More comments' ) {
// 			button.trigger('click'); // click the button
// 		}
//
// 	}
// });
