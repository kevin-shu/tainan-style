window.fbAsyncInit = function() {
      FB.init({
        appId      : '482683101771246', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });
      FB.Event.subscribe('auth.login', function(response) {  
          document.location.href="http://"+window.location.host+"/session/login?uid="+response.authResponse.userID; 
          //document.location.reload(true);
          //alert(response.authResponse.accessToken);
      });
      FB.Event.subscribe('auth.authResponseChange', function(response) {  
          //document.location.href="http://"+window.location.host+"/session/login?uid="+response.authResponse.userID; 
          //document.location.reload(true);
          //alert(response.authResponse.accessToken);
      });  
      FB.getLoginStatus(function (response) {
           if (response.status === 'connected') {  
                window.uid = response.authResponse.userID; 
                $("#uid").val(uid);
                window.accessToken = response.authResponse.accessToken; // accessToken
                //document.getElementById("msg").innerText="Welcome "+uid;
                if(window.location.pathname=='/users/new'){
                    FB.api('/me?fields=name,email', function(response) {
                        $("#User_name").val(response.name);
                        $("#User_email").val(response.email);
                    });
                }

                if(window.location.pathname=='/bets/new'){
                    FB.api('/me?fields=name,email', function(response) {
                        $("#Bet_owner").val(response.id);
                    });
                }
                $("#login").click(function(){
                    document.location.href="http://"+window.location.host+"/session/login?uid="+uid;
                });
           } else if (response.status === 'not_authorized') {  
                //alert("You havn't login yet.");
           } else {   
                
           }
      });
};

// Load the SDK Asynchronously
(function(d){
   var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement('script'); js.id = id; js.async = true;
   js.src = "//connect.facebook.net/en_US/all.js";
   ref.parentNode.insertBefore(js, ref);
}(document));
