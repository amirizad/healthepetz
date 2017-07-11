$(document).ready(function() {
  $('.carousel').carousel()

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = this.href.split('#');
    $('.nav a').filter('[href="#'+target[1]+'"]').tab('show');
  });
  $("input.reqfield").prop("required",true);

  $(".petstooltip").tooltipster({
    theme: ['tooltipster-light', 'tooltipster-light-customized']
  });

  // $('table.display').DataTable( {
  //   "order": [[ 3, "desc" ]],
  //   "paging":   true,
  //   "ordering": true,
  //   "info":     true,
  //   "lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
  //   stateSave: true
    // ,"columnDefs": [
    //         {
    //             "targets": [ 2 ],
    //             "visible": false,
    //             "searchable": false
    //         },
    //         {
    //             "targets": [ 3 ],
    //             "visible": false
    //         }
    //     ]
  	// });
});

$(".submitbtn").click(function(event){
	event.preventDefault();
	var verified=1;
	var $error="";
	var $form = $(this).closest('form');
	var formId = $form.attr("id");
	var $action = $form.attr("action");
	var $errmsg = $form.find('.message').attr('id');
	$('#' + formId + ' [required]').each(function(){
		var elemval=$.trim($(this).val());
		var elempatt=$(this).attr('pattern');
		if (elemval === "" || !elemval.match(elempatt)){
			verified=0;
			$error=$(this).attr('id');
			return false;
		};
	});
	if(verified===1){
		$('.message').css('display','none');
		$.post($action, $(this.form).serialize() , function(data, status){
			if(status="success"){
				var stat = data;
				if(stat.length>3){
					$("#user_idx").val(stat);
					$("#submitbtn").val("login");
					$("#portalx").val("system");
					$form.submit();						
				}
			};
		});
	}
	else{
		$("#"+$errmsg).html('Please fill in the required fields (*)');
		$("#"+$errmsg).css('display','block');
		$("#"+$error).focus();
	};
});  


function signupTab(){
  $('#signuptab').addClass('hide');
};

function fetVet(info){
// http://www.petmd.com/servicefinderapi/select?lat=33.644949&lng=-117.834808&radius=3
};