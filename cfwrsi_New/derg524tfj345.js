const originatorAPI = "https://drive-koto.vercel.app/api/raw/?path=/Image/GetColorImg/";
const availableType = {
	all:["fur","gay","transfur"]
};


addEventListener("fetch", (event) => {
	return event.respondWith(
		handleRequest(event.request).catch()
	);
});

async function handleRequest(request) {
	const url = new URL(request.url);
	const { pathname,search } = url;
	const requestType = pathname.split("/")[1];
	const databaseType = requestType.split("-")[0]
	function GetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = search.substr(1).match(reg);

		if (r != null) {
			return r[2];
		} else {
			return "";
		}
	}
	for (var i=0;i<availableType.all.length;i++) {
		if (requestType.toLowerCase() == availableType.all[i].toLowerCase() ) {
			const ColorImgJson = await fetch("https://ghs.koto.cc/database/"+databaseType+".txt").then(response => response.json())

			while (true) {
				const name = ColorImgJson.pics[(Math.round((ColorImgJson.fileNum - 1) * Math.random()))].name;
				if (name != "LetMeFixThisErrorButDoNotThinkSoItIsWorkGood?.jpg") {
					const url = originatorAPI + databaseType + "/" + name;


					const type = GetQueryString("type")

					if (type == "json") {

						const count = ColorImgJson.fileNum;
						const urlPreview = "https://drive.koto.cc/Main/Image/GetColorImg/" + databaseType + "/" + name + "?preview";
						const returnData = "{\"code\":\"200\",\"msg\":\"OK\",\"type\":\"" + databaseType + "\",\"count\":\""+count+"\",\"name\":\""+name+"\",\"url\":\""+url+"\",\"urlPreview\":\""+urlPreview+"\"}";

						return new Response(returnData, {
							headers: {
								'Content-Type':'application/json;charset=UTF-8',
								'Access-Control-Allow-Origin':'*',
								'Cache-Control':'no-store'
							}
						})
					} else if (type == "raw") {
						return Response.redirect(url, 307)
					} else if (type == "proxy") {
						const rawData = await fetch(url).then(response => response.blob())

						if (name.slice(-4) == ".jpg" || name.slice(-4) == ".jpeg" || name.slice(-4) == ".jfif") {
							return new Response(rawData, {
								headers: {
									'Content-Type':'image/jpeg;charset=UTF-8',
									'Access-Control-Allow-Origin':'*',
									'Cache-Control':'no-store'
								}
							})
						} else if (name.slice(-4) == "webp") {
							return new Response(rawData, {
								headers: {
									'Content-Type':'image/webp;charset=UTF-8',
									'Access-Control-Allow-Origin':'*',
									'Cache-Control':'no-store'
								}
							})
						} else if (name.slice(-4) == ".png") {
							return new Response(rawData, {
								headers: {
									'Content-Type':'image/png;charset=UTF-8',
									'Access-Control-Allow-Origin':'*',
									'Cache-Control':'no-store'
								}
							})
						}
					} else {
						return new Response("400 Bad Request, parameters cannot be null.",{
							headers:{"Content-Type":"text/plain;charset=UTF-8"},
							status:400
						});
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
