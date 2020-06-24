<template>
    <div>
        <h3>
            Titulo
            <button
                type="button"
                class="btn btn-primary float-right"
                data-toggle="modal"
                data-target="#create"
            >
                Nueva categoría
            </button>
        </h3>

        <table class="table table-dark">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripción</th>
                    <th scope="col">Acciones</th>
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
                            @click="editarFormulario(item)"
                        >
                            Editar
                        </button>
                        <button
                            class="btn btn-danger btn-sm"
                            @click="eliminarNota(item, index)"
                        >
                            Eliminar
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <!--Modal-->
        <div>
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
                                Modal title
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
                            <form
                                @submit.prevent="editarNota(categoria)"
                                v-if="modoEditar"
                            >
                                <h3>Editar nota</h3>
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Nombre de la nota"
                                    v-model="categoria.name"
                                />
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Descripción de la nota"
                                    v-model="categoria.description"
                                />
                                <button class="btn btn-warning" type="submit">
                                    Editar
                                </button>
                                <button
                                    class="btn btn-danger"
                                    type="submit"
                                    @click="cancelarEdicion"
                                >
                                    Cancelar
                                </button>
                            </form>

                            <form @submit.prevent="agregar" v-else>
                                <h3>Agregar categoría</h3>
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Nombre de la nota"
                                    v-model="categoria.name"
                                />
                                <input
                                    type="text"
                                    class="form-control mb-2"
                                    placeholder="Descripción de la nota"
                                    v-model="categoria.description"
                                />

                                <div class="modal-footer">
                                    <button
                                        type="button"
                                        class="btn btn-secondary"
                                        data-dismiss="modal"
                                    >
                                        Close
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
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            categorias: [],
            modoEditar: false,
            categoria: { name: "", description: "" }
        };
    },
    created() {
        axios.get("/categorias").then(res => {
            this.categorias = res.data;
        });
    },
    methods: {
        agregar() {
            if (
                this.categoria.name.trim() === "" ||
                this.categoria.description.trim() === ""
            ) {
                alert("Debes completar todos los campos antes de guardar");
                return;
            }

            const categoriaNueva = this.categoria;
            this.categoria = { name: "", description: "" };

            axios.post("/categorias", categoriaNueva).then(res => {
                $("#create").modal("hide");
                const categoriaServidor = res.data;
                this.categorias.push(categoriaServidor);
            });
        },
        eliminarNota(categoria, index) {
            const confirmacion = confirm(
                `Eliminar categoria ${categoria.name}`
            );
            if (confirmacion) {
                axios.delete(`/categorias/${categoria.id}`).then(() => {
                    this.categorias.splice(index, 1);
                });
            }
        },
        editarFormulario(item) {
            $("#create").modal("show");
            this.categoria.name = item.name;
            this.categoria.description = item.description;
            this.categoria.id = item.id;
            this.modoEditar = true;
        },
        editarNota(categoria) {
            $("#create").modal("hide");
            const params = {
                name: categoria.name,
                description: categoria.description
            };
            axios.put(`/categorias/${categoria.id}`, params).then(res => {
                this.modoEditar = false;

                const index = this.categorias.findIndex(
                    item => item.id === categoria.id
                );
                this.categorias[index] = res.data;
            });
        },
        cancelarEdicion() {
            this.modoEditar = false;
            this.categoria = { name: "", description: "" };
        }
    }
};
</script>
