/* Encode UTF-8 */
/* Copyright kobe-koto */

function GenUrl() {
	URL = document.getElementById("URL").value;
	BotID = document.getElementById("BotID").value;
	title = document.getElementById("title").value;
	text = document.getElementById("text").value;
	if (document.getElementById("redirect").value != "") {
		redirect = "&redirect=" + document.getElementById("redirect").value;
	}


	const URLPath = "https://"+URL+"/"+BotID+":/?";
	const URLSearch = "title="+title+"&text="+text+redirect;
	const rawURL = URLPath+URLSearch;
	const b64URL = URLPath+"b64=true&b64c="+btoa(URLSearch);

	document.getElementById("rawURL").innerHTML = rawURL;
	document.getElementById("b64URL").innerHTML = b64URL;
}
