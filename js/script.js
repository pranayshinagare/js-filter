$(document).ready(function () {
    var names;

    $('#search_button').click(function () {
        var startTime = Date.now();

        var nameSearch = $('#name-search').val();
        var surnameSearch = $('#surname-search').val();
        var searchUrl, output;

        if(!nameSearch && !surnameSearch){
            searchUrl = '';
        }

        if(!!nameSearch){
            searchUrl = 'first_name=' + nameSearch;
        }

        if(!!surnameSearch){
            searchUrl = 'last_name=' + surnameSearch;
        }
        
        if(!!surnameSearch && !!nameSearch){
            searchUrl = 'first_name=' + nameSearch + '&last_name=' + surnameSearch;
        }
        $.ajax({
            url: 'https://data.cityofnewyork.us/resource/5scm-b38n.json?' + searchUrl,
            data: {},
            datatype: 'JSON',
            method: 'GET',
            success: function (response) {
                names = response;
                var endTime = Date.now();
                output = '<div></div>';
                output += '<table class="table table-bordered table-responsive margin-top20">';
                output += '<tr>';
                output += '<th>List No.</th>';
                output += '<th>Exam No.</th>';
                output += '<th>First Name</th>';
                output += '<th>Last Name</th>';
                output += '<th>List agancy desc</th>';
                output += '<th>Published Date</th>';
                output += '<th>Title disc</th>';
                output += '</tr>';
                
                $.each(names, function (key, val) {
                    output += '<tr>';
                    output += '<td>' + val.list_no + '</td>';
                    output += '<td>' + val.exam_no + '</td>';
                    output += '<td>' + val.first_name + '</td>';
                    output += '<td>' + val.last_name + '</td>';
                    output += '<td>' + val.list_agency_desc + '</td>';
                    output += '<td>' + val.published_date + '</td>';
                    output += '<td>' + val.list_title_desc + '</td>';
                    output += '</tr>';
                });
                console.log(endTime-startTime);
                $('#filter-records').html(output);
            },
            error: function (error) {
                alert("Somthing went wrong");
            }
        });
    });
});
