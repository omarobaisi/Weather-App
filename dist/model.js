class Model {
    constructor() {
        this.cityData = [];
    }

    cityExist(cityName) {
        let exist = false
        this.cityData.forEach(city => {
            if(city.name === cityName) exist = true
        })
        return exist
    }

    indexOf(cityName) {
        let index = -1;
        for(let i in this.cityData) {
            if(this.cityData[i].name === cityName) {
                index = i;
            };
        }
        return index;
    }

    async getDataFromDB() {
        try {
            this.cityData = await $.ajax("/cities");
            return this.cityData
        } catch(e) {
            console.log(e)
        }
    }

    async getCityData(cityName) {
        try {
            const data = await $.ajax("/city/"+cityName);
            if(this.cityExist(cityName)) {
                const cityIndex = this.indexOf(cityName)
                this.cityData[cityIndex] = data;
            } else {
                this.cityData.push(data);
            }
            let render = new Renderer();
            await render.renderData("#weather-container", "#weather-template", this.cityData);
        } catch(e) {
            console.log(e)
        }
    }

    async saveCity(newCity) {
        try {
            const city = await $.ajax({
                type: 'POST',
                url: '/city',
                contentType: 'application/json',
                data: JSON.stringify(newCity),
                dataType: 'json'
            });
            const cityIndex = this.indexOf(newCity.name)
            this.cityData[cityIndex] = city;
            let render = new Renderer();
            await render.renderData("#weather-container", "#weather-template", this.cityData);
        } catch(e) {
            console.log(e)
        }
    }

    async removeCity(cityName) {
        try {
            await $.ajax({
                type: 'DELETE',
                url: '/city/'+cityName
            });
            const cityIndex = this.indexOf(cityName)
            delete this.cityData[cityIndex]._id;
            let render = new Renderer();
            await render.renderData("#weather-container", "#weather-template", this.cityData);
        } catch(e) {
            console.log(e);
        }        
    }
}