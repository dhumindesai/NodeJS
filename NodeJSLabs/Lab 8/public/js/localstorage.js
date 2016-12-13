
(function ($, localStorage,location) {
    // localStorage.clear();
    //1. set interval
    if(!localStorage["intervals"]){
        localStorage["intervals"] = 0;
    }
    let intervalVal = localStorage["intervals"];

    window.setInterval(function () {
        ++intervalVal;
        localStorage["intervals"] = intervalVal;
        $("#intervalCounts").text(localStorage["intervals"]);
    }, 1500);

    var localStorageTableBody = $("#localstorage-data tbody");
    var newHtmlString = "<tr><td>intervals</td><td id='intervalCounts'>" + localStorage["intervals"] + "</td></tr>"
    localStorageTableBody.append(newHtmlString);

    //2,3. form counts, last value
    let nameInput = $("#inputVal");
    let formAlert = $("#form-alert");
    if(!localStorage["formCounts"]){
        localStorage["formCounts"] = 0;
    }
    if(!localStorage["lastVal"]){
        localStorage["lastVal"] = '';
    }

    let formCountsVal =  localStorage["formCounts"];

    localStorageTableBody.append("<tr><td>Form Counts</td><td id='formCounts'>" + localStorage["formCounts"] + "</td></tr>");
    localStorageTableBody.append("<tr><td>Last submitted Name</td><td id='lastSubmitted'>" + localStorage["lastVal"] + "</td></tr>");

    $("#localstorage-form").submit(function (event) {
        formAlert.addClass('hidden');
        formAlert.text('');
        if (!nameInput.val()){
            formAlert.removeClass('hidden');
            formAlert.text('You must provide a name');
           // return;
        }
       else{
            localStorage["lastVal"] = nameInput.val();
            $("#lastSubmitted").text(localStorage["lastVal"]);

            formCountsVal++;
            localStorage["formCounts"] = formCountsVal;
            $("#formCounts").text(localStorage["formCounts"]);
        }
        event.preventDefault();
    });

    //4. HashChange
    localStorageTableBody.append("<tr><td>hash</td><td id='hashId'>" + location['hash'] + "</td></tr>");
    window.addEventListener("hashchange", ()=>{
        $("#hashId").text(location['hash']);
    }, false);
   
})(jQuery, window.localStorage, window.location);

