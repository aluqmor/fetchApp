import HttpClient from './HttpClient.js';
import ResponseContent from './ResponseContent.js';

export default class ModalEvents {

    constructor(url, csrf) {
        this.url = url;
        this.csrf = csrf;

        this.content = document.getElementById('content');
        this.userContent = document.getElementById('userContent');
        this.pagination = document.getElementById('pagination');
        this.responseContent = new ResponseContent(this.content, this.pagination, this.userContent);

        this.fetchUrl = '';
        this.httpClient = new HttpClient(this.url, this.csrf);

        this.modalCreate = document.getElementById('createModal');
        this.modalCreateButton = document.getElementById('modalCreateButton');
        this.createName = document.getElementById('createName');
        this.createPrice = document.getElementById('createPrice');

        this.modalDelete = document.getElementById('deleteModal');
        this.modalDeleteButton = document.getElementById('modalDeleteButton');
        this.deleteName = document.getElementById('deleteName');
        this.deletePrice = document.getElementById('deletePrice');

        this.modalEdit = document.getElementById('editModal');
        this.modalEditButton = document.getElementById('modalEditButton');
        this.editName = document.getElementById('editName');
        this.editPrice = document.getElementById('editPrice');

        this.modalLogin = document.getElementById('loginModal');
        this.modalLoginUserButton = document.getElementById('modalLoginUserButton');
        this.loginEmail = document.getElementById('loginEmail');
        this.loginPassword = document.getElementById('loginPassword');

        this.modalRegister = document.getElementById('registerModal');
        this.modalRegisterUserButton = document.getElementById('modalRegisterUserButton');
        this.registerConfirmPassword = document.getElementById('registerConfirmPassword');
        this.registerEmail = document.getElementById('registerEmail');
        this.registerName = document.getElementById('registerName');
        this.registerPassword = document.getElementById('registerPassword');

        this.modalView = document.getElementById('viewModal');
        this.viewCreatedAt = document.getElementById('viewCreatedAt');
        this.viewId = document.getElementById('viewId');
        this.viewName = document.getElementById('viewName');
        this.viewPrice = document.getElementById('viewPrice');
        this.viewUpdatedAt = document.getElementById('viewUpdatedAt');

        this.productError = document.getElementById('productError');
        this.productSuccess = document.getElementById('productSuccess');

        this.logoutButton = document.getElementById('logoutButton');

        this.assignEvents();
    }

    assignEvents() {

        this.modalCreate.addEventListener('show.bs.modal', event => {
            document.getElementById('modalCreateWarning').style.display = 'none';
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.createName.value = '';
            this.createPrice.value = '';
        });

        this.modalDelete.addEventListener('show.bs.modal', event => {
            document.getElementById('modalDeleteWarning').style.display= 'none';
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.deleteName.value = event.relatedTarget.dataset.name;
            this.deletePrice.value = event.relatedTarget.dataset.price;
        });

        this.modalEdit.addEventListener('show.bs.modal', event => {
            document.getElementById('modalEditWarning').style.display= 'none';
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.editName.value = event.relatedTarget.dataset.name;
            this.editPrice.value = event.relatedTarget.dataset.price;
        });

        this.modalLogin.addEventListener('show.bs.modal', event => {
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.loginEmail.value = '';
            this.loginPassword.value = '';
        });

        this.modalRegister.addEventListener('show.bs.modal', event => {
            this.fetchUrl = event.relatedTarget.dataset.url;
            this.registerConfirmPassword.value = '';
            this.registerEmail.value = '';
            this.registerName.value = '';
            this.registerPassword.value = '';
        });

        this.modalView.addEventListener('show.bs.modal', event => {
            document.getElementById('modalViewWarning').style.display= 'none';
            this.viewCreatedAt.value = '';
            this.viewId.value = event.relatedTarget.dataset.id;
            this.viewName.value = event.relatedTarget.dataset.name;
            this.viewPrice.value = event.relatedTarget.dataset.price;
            this.viewUpdatedAt.value = '';    
            const url = event.relatedTarget.dataset.url;
            this.httpClient.get(
                url,
                {},
                data => this.responseShow(data)
            );
        });

        this.modalCreateButton.addEventListener('click', event => {
            this.httpClient.post(
                this.fetchUrl,
                {
                    name: this.createName.value,
                    price: this.createPrice.value,
                    page: this.responseContent.currentPage
                },
                data => this.responseCreate(data)
            );
        });

        this.modalDeleteButton.addEventListener('click', event => {
            this.httpClient.delete(
                this.fetchUrl,
                {
                    page: this.responseContent.currentPage
                },
                data => this.responseDelete(data));
        });

        this.modalEditButton.addEventListener('click', event => {
            this.httpClient.put(
                this.fetchUrl,
                {
                    name: this.editName.value,
                    price: this.editPrice.value,
                    page: this.responseContent.currentPage
                },
                data => this.responseEdit(data)
            );
        });

        this.modalLoginUserButton.addEventListener('click', event => {
            this.httpClient.post(
                this.fetchUrl,
                {
                    email: this.loginEmail.value,
                    password: this.loginPassword.value,
                },
                data => this.responseLogin(data)
            );
        });

        this.modalRegisterUserButton.addEventListener('click', event => {
            this.httpClient.post(
                this.fetchUrl,
                {
                    name: this.registerName.value,
                    email: this.registerEmail.value,
                    password: this.registerPassword.value,
                    password_confirmation: this.registerConfirmPassword.value
                },
                data => this.responseRegister(data)
            );
        });

        /*this.logoutButton.addEventListener('click', event => {
            console.log('adios');
        });*/
    }

    formattedDate(date) {
        date = new Date(date);
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    responseCommonContent(data) {
        this.responseContent.setContent(data);
        let link = document.getElementById('logoutLink');
        if(link) {
            link.addEventListener('click', event => {
                this.httpClient.post(
                    link.dataset.url,
                    {},
                    data => console.log(data) //this.responseCommonContent(data)
                );
            });
        }
    }

    responseCreate(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalCreate).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalCreateWarning').style.display = 'block';
        }
    }

    responseDelete(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalDelete).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalDeleteWarning').style.display = 'block';
        }
    }

    responseEdit(data) {
        if(data.result) {
            this.productSuccess.style.display = 'block';
            bootstrap.Modal.getInstance(this.modalEdit).hide();
            this.responseCommonContent(data);
            setTimeout(() => {
                this.productSuccess.style.display= 'none';
            }, 4000);
        } else {
            document.getElementById('modalEditWarning').style.display = 'block';
        }
    }

    responseLogin(data) {
        data = {
            name: 'Juan'
        }
        console.log('login ' + data);
        this.responseContent.setUserContent(data);
    }

    responseRegister(data) {
        console.log('register ' + data);
    }

    responseShow(data) {
        const {id, name, price, created_at, updated_at} = data.product;
        this.viewCreatedAt.value = this.formattedDate(created_at);
        this.viewId.value = id;
        this.viewName.value = name;
        this.viewPrice.value = price;
        this.viewUpdatedAt.value = this.formattedDate(updated_at);
    }

    init() {
        this.httpClient.get(
            '/product',
            {},
            (data) => {
                this.responseCommonContent(data);
            }
        );
    }
}