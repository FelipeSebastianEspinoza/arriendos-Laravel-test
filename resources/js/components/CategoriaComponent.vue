<template>
    <div>
        <div>
            <h3>
                Título
                <button
                    type="button"
                    class="btn btn-primary float-right mb-2"
                    data-toggle="modal"
                    data-target="#create"
                    @click="limpiarModal"
                >
                    Nueva categoría
                </button>
            </h3>

            <table class="table table-striped table-dark table-sm">
                <!-- table-responsive-sm -->
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">
                            <a @click="ordenarTabla('name')" style="cursor:pointer;">Nombre</a>
                        </th>
                        <th scope="col">
                            <a @click="ordenarTabla('description')" style="cursor:pointer;">Description</a>
                        </th>
                        <th scope="col" width="100px">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(item, index) in categorias" :key="index">
                        <th scope="row">{{ item.id }}</th>
                        <td>{{ item.name }}</td>
                        <td>{{ item.description }}</td>
                        <td>
                            <button
                                class="btn btn-warning btn-sm"
                                @click="editarFormulario(item), resetModal()"
                            >
                                <svg
                                    class="bi bi-pencil-square"
                                    width="1.5em"
                                    height="1.5em"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                    />
                                </svg>
                            </button>
                            <button
                                class="btn btn-danger btn-sm"
                                @click="eliminarCategoria(item, index)"
                            >
                                <svg
                                    class="bi bi-trash"
                                    width="1.5em"
                                    height="1.5em"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
                                    />
                                    <path
                                        fill-rule="evenodd"
                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                    />
                                </svg>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--Modal-->
        <div>
            <!--Modal create-->
            <div
                class="modal fade"
                id="create"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Añadir categoría
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="agregar">
                                <h5>Nombre:</h5>
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Escriba un nombre..."
                                    v-model="categoria.name"
                                    v-bind:class="{
                                        'is-valid': nameValid,
                                        'is-invalid': nameInvalid
                                    }"
                                />
                                <p class="text-danger" v-if="nameInvalid">
                                    Escriba un nombre válido
                                </p>

                                <h5>Descripción:</h5>

                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Escriba una descripción..."
                                    v-model="categoria.description"
                                    v-bind:class="{
                                        'is-valid': descriptionValid,
                                        'is-invalid': descriptionInvalid
                                    }"
                                />
                                <p
                                    class="text-danger"
                                    v-if="descriptionInvalid"
                                >
                                    Escriba un texto más extenso
                                </p>
                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Cerrar
                                    </button>
                                    <button
                                        class="btn btn-primary"
                                        type="submit"
                                    >
                                        Agregar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <!--Modal edit-->
            <div
                class="modal fade"
                id="edit"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">
                                Editar categoría
                            </h5>
                            <button
                                type="button"
                                class="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                @click="cancelarEdicion"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <form @submit.prevent="editarCategoria(categoria)">
                                <!--   <h3>Editar categoria</h3> -->
                                <h5>Nombre</h5>
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Escriba un nombre..."
                                    v-model="categoria.name"
                                    v-bind:class="{
                                        'is-valid': nameValid,
                                        'is-invalid': nameInvalid
                                    }"
                                />
                                <p class="text-danger" v-if="nameInvalid">
                                    Escriba un nombre válido
                                </p>
                                <h5>Descripción</h5>
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Escriba una descripción..."
                                    v-model="categoria.description"
                                    v-bind:class="{
                                        'is-valid': descriptionValid,
                                        'is-invalid': descriptionInvalid
                                    }"
                                />
                                <p
                                    class="text-danger"
                                    v-if="descriptionInvalid"
                                >
                                    Escriba un texto más extenso
                                </p>
                                <button class="btn btn-warning" type="submit">
                                    Editar
                                </button>

                                <button
                                    class="btn btn-danger"
                                    type="button"
                                    @click="cancelarEdicion"
                                >
                                    Cancelar
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categorias: [],
            categoria: { name: "", description: "" },
            //validaciones vars
            nameValid: false,
            nameInvalid: false,
            descriptionValid: false,
            descriptionInvalid: false,
            //ordenar tabla
            nameReverse: false
        };
    },
    created() {
        axios.get("/categorias").then(res => {
            this.categorias = res.data;
        });
    },

    methods: {
        agregar() {
            var errors = [];
            if (!this.categoria.name) {
                this.nameValid = false;
                this.nameInvalid = true;
                errors.push("0");
            } else {
                this.nameValid = true;
                this.nameInvalid = false;
            }
            if (!this.categoria.description) {
                this.descriptionValid = false;
                this.descriptionInvalid = true;
                errors.push("0");
                //   } else if (!this.validEmail(this.categoria.description)) {
            } else if (this.categoria.description.length < 5) {
                this.descriptionValid = false;
                this.descriptionInvalid = true;
                errors.push("0");
            } else {
                this.descriptionValid = true;
                this.descriptionInvalid = false;
            }
            if (errors.length) {
                return;
            }

            const categoriaNueva = this.categoria;
            this.categoria = { name: "", description: "" };

            axios.post("/categorias", categoriaNueva).then(res => {
                $("#create").modal("toggle");
                const categoriaServidor = res.data;
                this.categorias.push(categoriaServidor);
            });
        },
        eliminarCategoria(categoria, index) {
            const confirmacion = confirm(
                `Eliminar categoría ${categoria.name}`
            );
            if (confirmacion) {
                axios.delete(`/categorias/${categoria.id}`).then(() => {
                    this.categorias.splice(index, 1);
                });
            }
        },
        editarFormulario(item) {
            $("#edit").modal("toggle");
            this.categoria.name = item.name;
            this.categoria.description = item.description;
            this.categoria.id = item.id;
        },
        editarCategoria(categoria) {
            const params = {
                name: categoria.name,
                description: categoria.description
            };

            var errors = [];
            if (this.categoria.name.trim() === "") {
                this.nameValid = false;
                this.nameInvalid = true;
                errors.push("0");
            } else {
                this.nameValid = true;
                this.nameInvalid = false;
            }
            if (this.categoria.description.trim() === "") {
                this.descriptionValid = false;
                this.descriptionInvalid = true;
                errors.push("0");
                //   } else if (!this.validEmail(this.categoria.description)) {
            } else if (this.categoria.description.length < 5) {
                this.descriptionValid = false;
                this.descriptionInvalid = true;
                errors.push("0");
            } else {
                this.descriptionValid = true;
                this.descriptionInvalid = false;
            }

            if (errors.length) {
                return;
            }

            axios.put(`/categorias/${categoria.id}`, params).then(res => {
                const index = this.categorias.findIndex(
                    item => item.id === categoria.id
                );
                this.categorias[index] = res.data;
                this.categorias.splice(index, 0); //para recargar los valores ya que se usa modal
            });
            $("#edit").modal("toggle");
        },
        cancelarEdicion() {
            $("#edit").modal("toggle");
            this.categoria = { name: "", description: "" };
        },
        limpiarModal() {
            this.nameValid = false;
            this.nameInvalid = false;
            this.descriptionValid = false;
            this.descriptionInvalid = false;
            this.categoria = { name: "", description: "" };
        },
        resetModal() {
            this.nameValid = false;
            this.nameInvalid = false;
            this.descriptionValid = false;
            this.descriptionInvalid = false;
        },
        validEmail: function(email) {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        },
        ordenarTabla(atributo) {
            if (this.nameReverse == false) {
                this.categorias.sort(function(a, b) {
                    if (atributo == "name") {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();

                        if (x < y) {
                            return -1;
                        }
                        if (x > y) {
                            return 1;
                        }
                    } else if (atributo == "description") {
                        var x = a.description.toLowerCase();
                        var y = b.description.toLowerCase();
                        if (x < y) {
                            return -1;
                        }
                        if (x > y) {
                            return 1;
                        }
                    }
                });
                this.nameReverse = true;
            } else {
                this.categorias.sort(function(a, b) {
                    if (atributo == "name") {
                        var x = a.name.toLowerCase();
                        var y = b.name.toLowerCase();

                        if (x > y) {
                            return -1;
                        }
                        if (x < y) {
                            return 1;
                        }
                    } else if (atributo == "description") {
                        var x = a.description.toLowerCase();
                        var y = b.description.toLowerCase();
                        if (x > y) {
                            return -1;
                        }
                        if (x < y) {
                            return 1;
                        }
                    }
                });
                 this.nameReverse = false;
            }
        }
    }
};
</script>
