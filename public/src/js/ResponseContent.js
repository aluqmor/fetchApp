import PageItem from './PageItem.js';
import ResponseRow from './ResponseRow.js';

export default class ResponseContent {

    constructor(content, paginationContent) {
        this.content = content;
        this.currentPage = 1;
        this.paginationContent = paginationContent;
        this.pageItem = new PageItem(this.paginationContent);
        this.responseRow = new ResponseRow(this.content);
    }

    cleanContent(element) {
        while (element.firstChild) {
            element.removeChild(element.firstChild);
        }
    }

    currentPage() {
        return this.currentPage;
    }

    setContent(result) {
        this.cleanContent(this.content);
        this.cleanContent(this.paginationContent);

        this.currentPage = result.products.current_page;

        const buttonCreate = document.createElement('button');
        buttonCreate.textContent = 'create';
        buttonCreate.setAttribute('data-bs-toggle', 'modal');
        buttonCreate.setAttribute('data-bs-target', '#createModal');
        buttonCreate.classList.add('btn', 'btn-success');

        buttonCreate.dataset.url = "/product";
        buttonCreate.dataset.method = "post";
        content.appendChild(buttonCreate);
        result.products.links.forEach(element => {
            this.pageItem.add(element, (data) => {
                this.setContent(data);
            });
        });
        result.products.data.forEach(element => {
            this.responseRow.add(element);
        });
    }
}
