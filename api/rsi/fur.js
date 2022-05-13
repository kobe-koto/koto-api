const fetch = require('node-fetch');

export default function handler(request, response) {
	const type = "transfur";
	const originatorAPI = "https://drive-koto.vercel.app/api/raw/?path=/Image/GetColorImg/";
	fetch("https://ghs.koto.cc/database/"+type+".txt")
		.then(response => response.json())
		.then(ColorImgJson => {
			while (true) {
				const name = ColorImgJson.pics[(Math.round((ColorImgJson.fileNum - 1) * Math.random()))].name;
				if (name != "LetMeFixThisErrorButDoNotThinkSoItIsWorkGood?.jpg") {
					const url = originatorAPI + type + "/" + name;
					const count = ColorImgJson.fileNum;
					const urlPreview = "https://drive.koto.cc/Main/Image/GetColorImg/" + type + "/" + name + "?preview";
					const returnData = "{\"code\":\"200\",\"msg\":\"OK\",\"type\":\"" + type + "\",\"count\":\""+count+"\",\"name\":\""+name+"\",\"url\":\""+url+"\",\"urlPreview\":\""+urlPreview+"\"}";
					//return new Response(returnData);


					//res.setHeader('Content-Type', 'application/json;charset=UTF-8');
					//res.setHeader('Access-Control-Allow-Origin', '*');
					//res.setHeader('Cache-Control', 'no-store');
					response.status(200).send("\`"+returnData+"\`");
					return false;



					/*return new Response(returnData, {
						headers: {
							'content-type': 'application/json;charset=UTF-8',
							'Access-Control-Allow-Origin': '*',
							'Cache-Control': 'no-store',
						},
					})*/
				}
			}
		})
}