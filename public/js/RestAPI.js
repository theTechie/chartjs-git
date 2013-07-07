var API = {
    Get : function Get(url, withParams){

        // Apped authentications details
        if(withParams === true){
            url = url.concat("&client_id=41d0a2a0c8b5f79e7a50&client_secret=78fb9a9747a05b6a99dbd84a7f20445f9f9bb930");
        }else{
            url = url.concat("?client_id=41d0a2a0c8b5f79e7a50&client_secret=78fb9a9747a05b6a99dbd84a7f20445f9f9bb930");
        }
    	
        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", url, false );
        xmlHttp.send( null );

        if(xmlHttp.status == 403){
        	return "ERROR";
        }

        return xmlHttp.responseText;
    }
};