const weather = new Model();
let render = new Renderer();

const loadPage = async () => {
    const weatherData = await weather.getDataFromDB();
    await render.renderData("#weather-container", "#weather-template", weatherData);
    save();
    remove();
}

const handleSearch = () => {
    $("#citySearch").on("click", async function() {
        let input = $("#cityInput").val();
        await weather.getCityData(input);
        save();
        remove();
    })
}

const save = () => {
    $(".save-city").on("click", async function() {
        const cityName = $(this).closest(".save-remove").siblings(".name-temp").find(".city-name").text();
        const cityTemp = $(this).closest(".save-remove").siblings(".name-temp").find(".temp").text();
        const cityCondition = $(this).closest(".save-remove").siblings(".condition-pic").find(".city-condition").text();
        const cityPic = $(this).closest(".save-remove").siblings(".condition-pic").find(".city-pic").find("img").attr('src');
        const newCity = {
            "name": cityName,
            "temperature": cityTemp,
            "condition": cityCondition,
            "conditionPic": cityPic
        }
        await weather.saveCity(newCity);
        save();
        remove();
    })
}

const remove = () => {
    $(".remove-city").on("click", async function() {
        const cityName = $(this).closest(".save-remove").siblings(".name-temp").find(".city-name").text();
        await weather.removeCity(cityName);
        save();
        remove();
    })
}

loadPage();
handleSearch();