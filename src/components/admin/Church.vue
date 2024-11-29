<script>
import axios from 'axios';

    export default {
        data() {
            return {
                token: '',
                confirmDelete: false,
                form_church: false,
                btnEditChurch: false,
                
                allChurch: [],
                dataEditChurch: {},
                
                // for form churc
                idChurchSelect: 0,
                nama_gereja: '',
                alamat_gereja: '',
                search: "",

                // pagination
                currentPage: 1,
                lastPage: 0,

            }
        },
        created() {
            this.token = localStorage.getItem('token');
        },

        mounted() {
            this.getAllChurch();
        },
        watch: {
            search(newValue){
                this.getAllChurch(newValue);
            }
        },
        methods: {
            getAllChurch: async function(query = '') {
                try {
                    const response = await axios.get('http://e-consultationbe.test/api/church', {
                        params: {
                            query: query,
                            page: this.currentPage,
                        },
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    })

                    console.log(response.data.data.data)
                    this.allChurch = response.data.data.data
                    this.currentPage = response.data.data.current_page; // Menyimpan first page data pagination
                    this.lastPage = response.data.data.last_page; // Menyimpan data last page pagination
                }catch (error) {
                    console.log('error : ' + error )
                }
            },
            nextPage() {
                if(this.currentPage < this.lastPage){
                    this.currentPage++;
                } 
                this.getAllChurch();
            },

            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
                this.getAllChurch();
            },
            addChurch: async function(){
                try {
                    const response = await axios.post('http://e-consultationbe.test/api/church', {
                        nama_gereja: this.nama_gereja,
                        alamat_gereja: this.alamat_gereja
                    }, {
                        headers: {
                        Authorization: `Bearer ${this.token}`
                    }
                    })
                    alert(response.message)
                    this.getAllChurch();
                } catch(error) {
                    console.log(error);
                }

                this.clearData();
            },
            clearData: function() {
                this.nama_gereja = '';
                this.alamat_gereja = '';
                this.form_church = false
            },
            btnAddChurch: function() {
                this.form_church = true;
                this.btnEditChurch = false;
            },
            btnCloseFormChurch: function () {
                this.form_church = false;
                this.clearData();
            },
            editChruch: async function(id) {
                this.idChurchSelect = id;
                this.btnEditChurch = true;
                this.form_church = true;

                try {
                    const response = await axios.get(`http://e-consultationbe.test/api/church/${id}`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                )
                this.dataEditUser = response;
                this.nama_gereja = response.data.data.nama_gereja;
                this.alamat_gereja = response.data.data.alamat_gereja;
                } catch (error) {
                    
                }
            },
            btnConfirmEdit: async function() {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const dataToUpdate = {
                        nama_gereja: this.nama_gereja,
                        alamat_gereja: this.alamat_gereja,
                    };

                    const response = await axios({
                        method: 'patch',
                        url: `http://e-consultationbe.test/api/church/${this.idChurchSelect}`,
                        headers: headers,
                        data: dataToUpdate,
                    });

                    alert(response.data.message);
                    this.getAllChurch();
                    }catch(error) {
                    console.log('Error', error);
                    }
                    this.clearData();
            },
            deleteChurch: function(id) {
                this.confirmDelete = true;
                this.idChurchSelect = id;
            },
            btnCloseDelete: function() {
                this.confirmDelete = false;
            },
            confirmDeleteChurch: async function() {
                try {
                    const response = await axios.delete(`http://e-consultationbe.test/api/church/${this.idChurchSelect}`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    });

                    alert(response.data.message);
                    this.getAllChurch();
                } catch (error) {
                    console.log('Error', error);
                }

                this.btnCloseDelete();
            },

        }


    }
</script>

<template>
    <div>

        <!-- confirm delete -->
        <div v-if="confirmDelete" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div tabindex="-1" class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-md w-10/12">
                <div class="relative p-4 w-full max-w-md max-h-full">
                    <div class="relative bg-white rounded-lg dark:bg-gray-700">
                        <div class="p-4 md:p-5 text-center">
                            <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                            </svg>
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Church?</h3>
                            <button @click="confirmDeleteChurch" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                Yes, I'm sure
                            </button>
                            <button @click="btnCloseDelete" data-modal-hide="popup-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- confirm delete -->

        <!-- form add blog -->
        <div v-if="form_church" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div class="absolute top-1/2 left-1/2 bg-white p-6 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-3xl max-h-[600px] w-10/12">

                <form @submit.prevent>
                    <div class="mb-1">
                        <label for="nama_gereja" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nama Gereja</label>
                        <input v-model="nama_gereja" type="text" id="nama_gereja" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900">
                    </div>

                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label for="alamat_gereja" class="sr-only">Alamat Gereja</label>
                            <textarea v-model="alamat_gereja" id="alamat_gereja" rows="8" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Alamat gereja..." required ></textarea>
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2 border-t dark:border-gray-600">
                            <button v-if="!btnEditChurch" @click="addChurch" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Add church
                            </button>
                            <button v-else @click="btnConfirmEdit" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Edit church
                            </button>
                            <button @click="btnCloseFormChurch" type="button" class=" text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium px-4 rounded-md text-sm py-2 text-center ">Cancel</button>
                        </div>
                    </div>

                </form>


            </div>
        </div>
        <!-- form add blog -->

        <!-- Blog -->
        <div class="">
            <div class="pl-20 pb-2 border-b-2 border-gray-200">
                <h1 class="font-semibold text-3xl text-slate-700">Church</h1>
            </div>

            <!-- search user -->
            <div class="mt-5 px-7 bg-white">
                <div class="flex items-center p-1">
                    <box-icon name='search-alt-2'></box-icon>
                    <input v-model="search" type="text" class="border-none focus:ring-white w-full" placeholder="Church name">
                </div>
            </div>
            <!-- search user -->

        <div class="mx-10 mt-8">

            <button @click="btnAddChurch" type="button" class="text-white px-10 p-2 rounded-md shadow bg-blue-900 hover:bg-blue-800">Add Chruch</button>

            <!-- all church -->
            <div class="mt-3 bg-white">
                

                <div class="overflow-x-auto shadow-md sm:rounded-lg">
                    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" class="px-6 py-3">
                                    Nama
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Alamat
                                </th>
                                <th scope="col" class="px-6 py-3">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="church in allChurch" :key="church.id"
                                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {{ church.nama_gereja }}
                                </th>
                                <td class="px-6 py-4">
                                    {{ church.alamat_gereja }}
                                </td>
                                <td class="px-6 py-4">
                                    <button @click="editChruch(church.id)" type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                        Edit
                                    </button> |
                                    <button @click="deleteChurch(church.id)" type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>

            <!-- paginate -->
            <div class="mt-4 w-[150px] mx-auto flex flex-row justify-center">
                <span @click="prevPage" class="mr-2 btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                    Prev
                </span>
                <span @click="nextPage"  class="btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                    Next
                </span>
            </div>
            <!-- paginate -->

            <!-- all church -->
        </div>

        </div>
        <!-- Blog --> 
    </div>
</template>