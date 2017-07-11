
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
  // } );
} );
// http://www.petmd.com/servicefinderapi/select?lat=33.644949&lng=-117.834808&radius=3