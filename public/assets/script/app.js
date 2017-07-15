var returnUser = false;
var vets = [];
var myLatLong = { lat: 33.644906, lng: -117.834748 };
var baseInfo = {
	lat: 33.644906,
	lng: -117.834748,
	add: '510 E Peltason Dr, Irvine, CA 92697, USA',
	rad: 3,
	lim: 10
};

var hPetz = {

	noSignupTab: function(){
		$('#signuptab').addClass('hide');
	},

	updateNavbar: function(loggedIn){
		$('li.navto.active').removeClass('active');
		$('section').removeClass('show');
		if ( loggedIn == 1){
			$('#loginsecnav').addClass('hide');
			$('#profilesecnav').removeClass('hide');
			$('#logoutnav').removeClass('hide');
			$('#profilesecnav').addClass('active');
			$('#profilesec').addClass('show')
			$('#activesec').val('profilesec');
			hPetz.loadProfJS();
		} else{
			$('#loginsecnav').removeClass('hide');
			$('#profilesecnav').addClass('hide');
			$('#logoutnav').addClass('hide');
			$('#homesecnav').addClass('active');
			$('#homesec').addClass('show')
			$('#activesec').val('homesec');
			hPetz.loadLoginJS();
		}
	},

	changePage: function(navId){
		$('li.navto.active').removeClass('active');
		$('#' + navId).addClass('active');
		var currentSec = $('#activesec').val();
		$('#' + currentSec).removeClass('show');

		switch (navId) {
			case "homesecnav":
				$('#homesec').addClass('show');
				$('#activesec').val('homesec');
				break;
			case "findersecnav":
				$('#findersec').addClass('show');
				$('#activesec').val('findersec');
				hPetz.loadVFjs();
				break;
			case "pricesecnav":
			case "virvsecnav":
			case "telesecnav":
			case "hhubsecnav":
			case "vetnsecnav":
				$('#ucsec').addClass('show');
				$('#activesec').val('ucsec');
				break;
			case "loginsecnav":
				$('#loginsec').addClass('show');
				$('#activesec').val('loginsec');
				break;
			case "profilesecnav":
				$('#profilesec').addClass('show')
				$('#activesec').val('profilesec');
				break;
			case "logoutnav":
				hPetz.logOut();
				$('#logoutnav').removeClass('active');
				$('#homesecnav').addClass('active');
				$('#homesec').addClass('show');
				$('#activesec').val('homesec');
				break;
			default:
				break;
		}
	},

	loadVFjs: function(){
		hPetz.initMap();
		$('#vetfinderbtn').click(function(event){
			event.preventDefault();
			hPetz.findVets();
		});

		$('#findlocation').on('click', function() { hPetz.findLocation() });

		$('#loc-confirm').on('click', function() {
				var latLong = hPetz.getLatLng();
				// You can use latLong object variable to store
				// the location information here.
				// latLong.lat & latLong.lng & latLong.add
				if($('#data-input').val() !== ''){
					var dataInput = $('#data-input').val();
					$('#' + dataInput).attr({
						'data-address': latLong.add,
						'data-lat': latLong.lat,
						'data-long': latLong.lng
					});
					$('#data-input').val('');
				};
		});
	},

	loadProfJS: function(){
		// hPetz.renderTable();

		$('#petslist').on('click', 'tbody tr', function(event) {
			
		});

		$('#back-owner').click(function(e){
			e.preventDefault();
			$('#petdash').addClass('hide');
			$('#ownerdash').removeClass('hide');
		})
	},

	// renderTable: function(){
	// 	$('table.render').DataTable( {
	// 		"order": [[ 0, "desc" ]],
	// 		"paging":   true,
	// 		"ordering": true,
	// 		"info":     true,
	// 		"lengthMenu": [[5, 10, 25, -1], [5, 10, 25, "All"]],
	// 		stateSave: true
	// 		// ,"columnDefs": [
	// 		// 				{
	// 		// 						"targets": [ 2 ],
	// 		// 						"visible": false,
	// 		// 						"searchable": false
	// 		// 				},
	// 		// 				{
	// 		// 						"targets": [ 3 ],
	// 		// 						"visible": false
	// 		// 				}
	// 		// 		]
	// 	});
	// },

	loadLoginJS: function(){
		$("input.reqfield").prop("required",true);

		$(".petstooltip").tooltipster({
			theme: ['tooltipster-light', 'tooltipster-light-customized']
		});

		$(".submitbtn").click(function(event){
			event.preventDefault();
			$('.message').addClass('hide');
			var verified=1;
			var $error="";
			var $form = $(this).closest('form');
			var formId = $form.attr("id");
			var $action = $form.attr("action");
			var $errmsg = $form.find('.frontmsg').attr('id');
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
				$('#signup-err-msg').addClass('hide');
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
				$("#"+$errmsg).removeClass('hide');
				$("#"+$error).focus();
			};
		});		
	},

	logOut: function(){

	},

	findVets: function(){
		var lat = baseInfo.lat;
		var long = baseInfo.lng;
		var rad = baseInfo.rad;
		var apiURL = `/assets/data/vets.json`;
		$.getJSON(apiURL, function() {
			console.log('success');
		})
		.done(function(data) {
			console.log(data);
			vets = data;
			vets.sort(function(a, b){ return a.distance - b.distance; });
			console.log(vets);
			if(vets.length){
				hPetz.pinVets(vets);
			} else {

			}
		})
		.fail(function(error) {
			console.log(error);
		});
	},

	pinVets: function(vets){
		for ( i = 0 ; i < baseInfo.lim ; i++){
			console.log(vets[i].title);
		}
	},

	initMap: function() {
		var map = new google.maps.Map(document.getElementById('map'), {
		    zoom: 15,
		    center: myLatLong
		});
		var marker = new google.maps.Marker({
		    position: myLatLong,
		    map: map
		});

		hPetz.geocodeLatLng();

		marker.addListener('click', function() {
		    map.setZoom(20);
		    map.setCenter(marker.getPosition());
		});

		google.maps.event.addListener(map, 'click', function(event) {
		    myLatLong.lat = event.latLng.lat();
		    myLatLong.lng = event.latLng.lng();
		    hPetz.initMap();
		});

		$('#recenter').on('click', function() {
		    map.panTo(marker.getPosition());
		});
	},

	
	getLocation: function() {
			if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition);
			} else { 
					var x = "Geolocation is not supported by this browser.";
					return x;
			}
	},

	showPosition: function(position) {
		myLatLong = {
			lat: position.coords.latitude,
			lng: position.coords.longitude
		};
	},

	findLocation: function() {
		var address = $('#addresstext').val().trim();
		if (address.length > 0) {
		    $('#address').text('');
		    address = address.replace(/ /g, '+');
		    var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
				address + '&key=AIzaSyDlqM5HOhxP8DcUtTclMRu0RSvWy9t59qk';
		    $.getJSON(url, function() {
			    console.log('success');
			})
			.done(function(data) {
			    var loc = data.results;
			    var locAdd = loc[0].formatted_address;
			    $('#address').text(locAdd);
			    myLatLong.lat = loc[0].geometry.location.lat;
			    myLatLong.lng = loc[0].geometry.location.lng;
			    hPetz.initMap();
			})
			.fail(function(error) {
			    console.log(error);
			});
		}
	},

	geocodeLatLng: function() {
		var addressInfo = "";
		var geocoder = new google.maps.Geocoder;
		geocoder.geocode({ 'location': myLatLong }, function(results, status) {
		  if (status === 'OK') {
				if (results[1]) {
					addressInfo = results[1].formatted_address;
				} else {
					addressInfo = 'No results found';
				};
			} else {
				addressInfo = 'Geocoder failed due to: ' + status;
			};
			$('#baselat').text(myLatLong.lat.toFixed(4)).attr('data-lat', myLatLong.lat);
			$('#baselng').text(myLatLong.lng.toFixed(4)).attr('data-long', myLatLong.lng);
			if ($('#address').text() === '') {
				$('#address').text(addressInfo);
			};
		});
	},

	getLatLng: function() {
		var lat = parseFloat($('#baselat').attr('data-lat'));
		var long = parseFloat($('#baselng').attr('data-long'));
		var address = $('#address').text();
		var latLong = { lat: lat, lng: long, add: address };
		$('#baselat').removeAttr('data-lat').text('');
		$('#baselng').removeAttr('data-long').text('');
		$('#address').text('');
		return latLong;
	},
	
	retrieveAddress: function() {
		var $address = $(this).attr('data-address');
		$('#addresstext').val($address);
	},
};

$(document).ready(function() {

	hPetz.updateNavbar($('#loggedin').val());

	$('.navto').click(function(){
		hPetz.changePage($(this).attr('id'));
	})

  $('.carousel').carousel({ interval: 7000 })

  $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
    var target = this.href.split('#');
    $('.nav a').filter('[href="#'+target[1]+'"]').tab('show');
	});
});