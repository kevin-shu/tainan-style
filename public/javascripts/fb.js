window.fbAsyncInit = function() {
      FB.init({
        appId      : '482683101771246', // App ID
        status     : true, // check login status
        cookie     : true, // enable cookies to allow the server to access the session
        xfbml      : true  // parse XFBML
      });
      FB.Event.subscribe('auth.sessionChange', function(response) {  
          if (response.session) { 
             
            document.location.reload(true);
            //alert(response.authResponse.accessToken);
          } else {  
            document.location.reload(true)
          }  
      });  
      FB.getLoginStatus(function (response) {
           if (response.status === 'connected') {  
                window.uid = response.authResponse.userID; 
                window.accessToken = response.authResponse.accessToken; // accessToken
                document.getElementById("msg").innerText="Welcome "+uid;
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
