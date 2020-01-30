let saveButton = document.getElementById('save');

saveButton.addEventListener("click", function (element) {

    console.log('just clicked');
    var redirectFrom = document.getElementById("from").value;
    var redirectTo = document.getElementById("to").value;

    if (!redirectFrom || !redirectTo) {
        alert('all fields are required');
        return;
    }

    var obj = new Object
    obj[redirectFrom] = redirectTo;
    chrome.storage.sync.set(obj, function () {
        console.log('redirect from ' + redirectFrom + ' set to ' + redirectTo);
    });
});


var data = chrome.storage.sync.get(null, function (res) {

    var html = "<BR><Table><TH>Redirect</TH><TH>TO</TH>";

    for (var item in res) {
        var elem = "<TR><TD>" + item + "</TD><TD>" + res[item] + "</TD></TR>";
        html += elem;
    }

    html += "</TABLE>";

    document.getElementById('redirects').innerHTML = html;
})
