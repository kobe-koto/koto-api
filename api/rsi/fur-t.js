const https = require('https');

const type = "transfur";
const originatorAPI = "https://drive-koto.vercel.app/api/raw/?path=/Image/GetColorImg/";

const options = {
	hostname: "ghs.koto.cc",
	port: 443,
	path: "/database/"+type+".txt",
	method: 'GET',
}

let data = '';

const req = https.request(options, res => {
	console.log(`状态码: ${res.statusCode}`)
	req.on('data', chunk => {
		data += chunk;
	})
	req.on('end', () => {
		const ColorImgJson = JSON.parse(data);
		while (true) {
			const name = global.ColorImgJson.pics[(Math.round((global.ColorImgJson.fileNum - 1) * Math.random()))].name;
			if (name != "LetMeFixThisErrorButDoNotThinkSoItIsWorkGood?.jpg") {
				const url = originatorAPI + type + "/" + name;
				const count = global.ColorImgJson.fileNum;
				const urlPreview = "https://drive.koto.cc/Main/Image/GetColorImg/" + type + "/" + name + "?preview";
				const returnData = "{\"code\":\"200\",\"msg\":\"OK\",\"type\":\"" + type + "\",\"count\":\""+count+"\",\"name\":\""+name+"\",\"url\":\""+url+"\",\"urlPreview\":\""+urlPreview+"\"}";
				//return new Response(returnData);


				//res.setHeader('Content-Type', 'application/json;charset=UTF-8');
				//res.setHeader('Access-Control-Allow-Origin', '*');
				//res.setHeader('Cache-Control', 'no-store');
				response.status(200).send("\`"+returnData+"\`");



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
})

req.on('error', error => {
	console.error(error)
})


req.end()