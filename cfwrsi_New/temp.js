const originatorAPI = "https://drive-koto.vercel.app/api/raw/?path=/Image/GetColorImg/";
const availableType = {
	all:["fur","gay","transfur","fur-r","gay-r","transfur-r"],
	redirect:["fur-r","gay-r","transfur-r"],
	json:["fur","gay","transfur"]
};

addEventListener("fetch", (event) => {
	return event.respondWith(
		handleRequest(event.request)
	);
});

async function handleRequest(request) {
	const url = new URL(request.url);
	const { pathname } = url;
	const requestType = pathname.split("/")[1];
	const databaseType = requestType.split("-")[0]
	for (var i=0;i<availableType.all.length;i++) {
		if (requestType.toLowerCase() == availableType.all[i].toLowerCase() ) {
			const ColorImgJson = await fetch("https://ghs.koto.cc/database/"+databaseType+".txt").then(response => response.json())

			while (true) {
				const name = ColorImgJson.pics[(Math.round((ColorImgJson.fileNum - 1) * Math.random()))].name;
				if (name != "LetMeFixThisErrorButDoNotThinkSoItIsWorkGood?.jpg") {
					const url = originatorAPI + databaseType + "/" + name;
					const count = ColorImgJson.fileNum;
					const urlPreview = "https://drive.koto.cc/Main/Image/GetColorImg/" + databaseType + "/" + name + "?preview";
					const returnData = "{\"code\":\"200\",\"msg\":\"OK\",\"type\":\"" + databaseType + "\",\"count\":\""+count+"\",\"name\":\""+name+"\",\"url\":\""+url+"\",\"urlPreview\":\""+urlPreview+"\"}";

					if (pathname.match(/(-r)/i)) {
						return Response.redirect(url, 307)
					} else {
						return new Response(returnData, {
							headers: {
								'Content-Type':'application/json;charset=UTF-8',
								'Access-Control-Allow-Origin':'*',
								'Cache-Control':'no-store'
							}
						})
					}

				}
			}
		}
	}
	return new Response("404 NOT FOUND",{
		headers:{"Content-Type":"text/plain;charset=UTF-8"},
		status:404
	});
}
