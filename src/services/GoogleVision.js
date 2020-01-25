
const googleVisionApiUrl = 'https://vision.googleapis.com/v1/images:annotate';

export async function getFaceInformation(base64Image, key) {
    let data = await fetch(`${googleVisionApiUrl}?key=${key}`, {
        method: 'POST',
        body: JSON.stringify({
            "requests": [{
                "image": {
                    "content": base64Image
                },
                "features": [{
                    "maxResults": 5,
                    "type": "FACE_DETECTION"
                }]
            }]
        })
    }).then(response => {
        return response.json();
    }).then(jsonRes => {
        console.log(jsonRes);
        return jsonRes.responses[0].faceAnnotations[0];
    }).catch(err => {
        console.log('Error', err)
    });

    return data;
}
