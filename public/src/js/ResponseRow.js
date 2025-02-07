export default class ResponseRow {

    constructor(parent, currentPage) {
        this.parent = parent;
        this.currentPage = currentPage;
    }

    add({id, name, price}) {
        const div = document.createElement('div');
        div.classList.add('row', 'gap-2', 'mb-2');

        const idElement = this.#createElementWithClass('span', 'col-md-1');
        const nameElement = this.#createElementWithClass('span', 'col-md-1');
        const priceElement = this.#createElementWithClass('span', 'col-md-1');

        idElement.textContent = id;
        nameElement.textContent = name;
        priceElement.textContent = price;
        
        div.append(idElement, nameElement, priceElement);

        const buttonView = document.createElement('a');
        let textNode = document.createTextNode('view');
        buttonView.appendChild(textNode);
        buttonView.setAttribute('data-bs-toggle', 'modal');;
        buttonView.setAttribute('data-bs-target', '#viewModal');
        buttonView.classList.add('btn', 'btn-primary', 'col-auto');
        buttonView.dataset.id = id;
        buttonView.dataset.name = name;
        buttonView.dataset.price = price;
        buttonView.dataset.url = "/product/" + id;
        buttonView.dataset.method = "get";

        const buttonEdit = document.createElement('a')
        textNode = document.createTextNode('edit');
        buttonEdit.appendChild(textNode);
        buttonEdit.setAttribute('data-bs-toggle', 'modal');
        buttonEdit.setAttribute('data-bs-target', '#editModal');
        buttonEdit.classList.add('btn', 'btn-warning', 'col-auto');
        buttonEdit.dataset.id = id;
        buttonEdit.dataset.name = name;
        buttonEdit.dataset.price = price;
        buttonEdit.dataset.url = "/product/" + id;
        buttonEdit.dataset.method = "put";

        const buttonDelete = document.createElement('a')
        textNode = document.createTextNode('delete');
        buttonDelete.appendChild(textNode);
        buttonDelete.setAttribute('data-bs-toggle', 'modal');
        buttonDelete.setAttribute('data-bs-target', '#deleteModal');
        buttonDelete.classList.add('btn', 'btn-danger', 'col-auto');
        buttonDelete.dataset.id = id;
        buttonDelete.dataset.name = name;
        buttonDelete.dataset.price = price;
        buttonDelete.dataset.url = "/product/" + id;
        buttonDelete.dataset.method = "delete";

        div.appendChild(buttonView);
        div.appendChild(buttonEdit);
        div.appendChild(buttonDelete);

        this.parent.appendChild(div);
    }

    #createElementWithClass(tag, className) {
        const element = document.createElement(tag);
        element.classList.add(className);
        return element;
    }

    oldadd(data) {
        const div = document.createElement('div');
        const {id, name, price} = data;
        let textNode = document.createTextNode(id + ' ' + name + ' ' + price);
        div.appendChild(textNode);

        const buttonView = document.createElement('button');
        textNode = document.createTextNode('view');
        buttonView.appendChild(textNode);
        buttonView.setAttribute('data-bs-toggle', 'modal');;
        buttonView.setAttribute('data-bs-target', '#viewModal');
        buttonView.classList.add('btn', 'btn-primary');
        buttonView.dataset.id = id;
        buttonView.dataset.name = name;
        buttonView.dataset.price = price;
        buttonView.dataset.url = "/product/" + id;
        buttonView.dataset.method = "get";

        const buttonEdit = document.createElement('button')
        textNode = document.createTextNode('edit');
        buttonEdit.appendChild(textNode);
        buttonEdit.setAttribute('data-bs-toggle', 'modal');
        buttonEdit.setAttribute('data-bs-target', '#editModal');
        buttonEdit.classList.add('btn', 'btn-warning');
        buttonEdit.dataset.id = id;
        buttonEdit.dataset.name = name;
        buttonEdit.dataset.price = price;
        buttonEdit.dataset.url = "/product/" + id;
        buttonEdit.dataset.method = "put";

        const buttonDelete = document.createElement('button')
        textNode = document.createTextNode('delete');
        buttonDelete.appendChild(textNode);
        buttonDelete.setAttribute('data-bs-toggle', 'modal');
        buttonDelete.setAttribute('data-bs-target', '#deleteModal');
        buttonDelete.classList.add('btn', 'btn-danger');
        buttonDelete.dataset.id = id;
        buttonDelete.dataset.name = name;
        buttonDelete.dataset.price = price;
        buttonDelete.dataset.url = "/product/" + id;
        buttonDelete.dataset.method = "delete";

        div.appendChild(buttonView);
        div.appendChild(buttonEdit);
        div.appendChild(buttonDelete);

        this.parent.appendChild(div);
    }
}