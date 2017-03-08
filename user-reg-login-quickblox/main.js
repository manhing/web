// Init QuickBlox application here
//
QB.init(QBApp.appId, QBApp.authKey, QBApp.authSecret, true);

$(document).ready(function() {

  // First of all create a session and obtain a session token
  // Then you will be able to run requests to Users
  //
  var token = '';

  QB.createSession(function(err,result){
    console.log('Session create callback', err, result);
    token = result.token;
  });


  // Create user
  //
  $('#sign_up').on('click', function() {
    var login = $('#usr_sgn_p_lgn').val();
    var password = $('#usr_sgn_p_pwd').val();

    var params = {'login': login, 'password': password};

    QB.users.create(params, function(err, user){
      if (user) {
        $('#output_place').val(JSON.stringify(user));
        window.location = "user_login.html";

      } else  {
        //$('#output_place').val(JSON.stringify(err));
        alert('Please try again: ' + JSON.stringify(err));
      }

      $("#progressModal").modal("hide");

      $("html, body").animate({ scrollTop: 0 }, "slow");

    });
  });


  // Login user
  //
  $('#sign_in').on('click', function() {
    var login = $('#usr_sgn_n_lgn').val();
    var password = $('#usr_sgn_n_pwd').val();

    var params = { 'login': login, 'password': password};

    QB.login(params, function(err, user){
      if (user) {
        $('#output_place').val(JSON.stringify(user));
        window.location = "user_list.html";

      } else  {
        $('#output_place').val(JSON.stringify(err));
      }

      $("#progressModal").modal("hide");

      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  });


  //Retrieve User List
  $('#get_by').on('click', function() {

    var params = { page: '1', per_page: '100'};
 
    QB.users.listUsers(params, function(err, result){
      if (result) {
//         $('#output_place').val(JSON.stringify(result));
        var resultsContainer = $('#output_place');
        var usersCount = 0;
        usersCount += result.items.length;

        for(var i = 0; i < usersCount; i++) {
          console.log(result.items[i].user.login);
          resultsContainer.append(result.items[i].user.login + '<br>');
        }

      } else  {
        $('#output_place').val(JSON.stringify(err));
      }

      $("#progressModal").modal("hide");

      $("html, body").animate({ scrollTop: 0 }, "slow");
    });

  });

});