import HttpClient from './HttpClient.js';
export default class PageItem {

    constructor(parent, currentPage) {
        this.parent = parent;
        this.currentPage = currentPage;
        this.httpClient = new HttpClient();
    }

    add(link, callBack) {
        const li = document.createElement('li');
        li.classList.add('page-item');
        let tag;
        if(link.active) {
            li.classList.add('active');
        }
        if(link.url) {
            tag = document.createElement('a');
            tag.setAttribute('href', '#');
        } else {
            tag = document.createElement('span');
            tag.classList.add('disabled');
        }
        tag.classList.add('page-link');
        tag.dataset.url = link.url;
        if(link.label == '&laquo; Previous') {
            link.label = '<';
        } else if(link.label == 'Next &raquo;') {
            link.label = '>';
        }
        const textNode = document.createTextNode(link.label);
        tag.appendChild(textNode);
        li.appendChild(tag);
        this.parent.appendChild(li);
        tag.addEventListener('click', (event) => {
            if(event.target.dataset.url != 'null') {
                this.httpClient.get(event.target.dataset.url, {}, (data) => {
                    callBack(data);
                });
            }
        });
    }
}