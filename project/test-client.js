const axios = require('axios');

setInterval(async () => {
    await axios
            .get('http://localhost:9000/getStatus').then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
}, 5000);