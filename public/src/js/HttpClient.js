export default class HttpClient {

    constructor(baseUrl = '', csrfToken = '') {
        this.baseUrl = baseUrl;
        this.csrfToken = csrfToken;
    }

    request(url, method = 'GET', callBack, parameters = {}, headers = {}) {
        const fullUrl = this.baseUrl + url;
        if (method !== 'GET') {
            headers['X-CSRF-Token'] = this.csrfToken;
        }
        //const cleanUrl = url.replace(this.baseUrl, '');
        //const fullUrl = this.baseUrl + cleanUrl;
        const options = {
            method,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                ...headers
            }
        }
        if (method === 'GET' && Object.entries(parameters).length > 0) {
            const queryString = new URLSearchParams(parameters).toString();
            fullUrl = fullUrl + '?' + queryString;
        } else if (method !== 'GET') {
            options.body = JSON.stringify(parameters);
        }
        fetch(fullUrl, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                callBack(data);
            })
            .catch(error => {
                console.log(url, method, error);
            })
    }

    delete(url, callBack) {
        this.request(url, 'DELETE', callBack);
    }

    get(url, parameters = {}, callBack) {
        this.request(url, 'GET', callBack, parameters);
    }

    post(url, parameters = {}, callBack) {
        this.request(url, 'POST', callBack, parameters);
    }

    put(url, parameters = {}, callBack) {
        this.request(url, 'PUT', callBack, parameters);
    }
}