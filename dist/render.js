class Renderer {
    async renderData(container, template, data) {
        $(container).empty();
        const source = $(template).html();
        const temp = Handlebars.compile(source);
        const newHTML = temp({ item: await data });
        $(container).append(newHTML);
    }
}