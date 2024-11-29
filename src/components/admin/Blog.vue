<template >
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
                            <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to delete this Blog?</h3>
                            <button @click="deleteBlog" data-modal-hide="popup-modal" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
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
        <div v-if="form_Blog" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <div class="absolute top-1/2 left-1/2 bg-white p-6 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg max-w-3xl max-h-[600px] w-10/12 h-5/6 overflow-y-scroll">

                <form @submit.prevent>
                    <div class="mb-1">
                        <label for="judul_blog" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Judul Blog</label>
                        <input v-model="judul_blog" type="text" id="judul_blog" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900">
                    </div>
                    <div class="mb-1">
                        <label for="penulis" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Penulis</label>
                        <input v-model="penulis" type="text" id="penulis" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-900 focus:border-blue-900 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-900 dark:focus:border-blue-900">
                    </div>

                    <!-- tanggal publish blog -->
                    <label for="tanggal_publish" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Tanggal publish</label>
                    <div class="relative mb-4">
                        <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                            </svg>
                        </div>
                        <input v-model="tanggal_publish" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date">
                    </div>
                    <!-- tanggal publish blog -->

                    <div class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
                        <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                            <label for="blog" class="sr-only">Your blog</label>
                            <textarea v-model="isi_blog" id="blog" rows="10" class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Write a blog ..." required ></textarea>
                        </div>
                        <div class="flex items-center gap-3 px-3 py-2 border-t dark:border-gray-600">
                            <button v-if="btnEditBlog" @click="addBlog" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Post blog
                            </button>
                            <button v-else @click="btnConfirmEdit" type="submit" class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-900 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                                Edit blog
                            </button>
                            <button @click="btnCloseBlog" type="button" class=" text-white bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium px-4 rounded-md text-sm py-2 text-center ">Cancel</button>
                        </div>
                    </div>

                </form>
                <p class="ms-auto text-xs text-gray-500 dark:text-gray-400">Remember, contributions to this topic should follow our <a href="#" class="text-blue-600 dark:text-blue-500 hover:underline">Community Guidelines</a>.</p>


            </div>
        </div>
        <!-- form add blog -->

        <!-- Blog -->
        <div class="">
            <div class="pl-20 pb-2 border-b-2 border-gray-200">
                <h1 class="font-semibold text-3xl text-slate-700">Blog</h1>
            </div>

            <!-- search user -->
            <div class="mt-5 px-7 bg-white">
                <div class="flex items-center p-1">
                    <box-icon name='search-alt-2'></box-icon>
                    <input v-model="search" type="text" class="border-none focus:ring-white w-full" placeholder="Title or Author">
                </div>
            </div>
            <!-- search user -->

            <div class="mx-10 mt-8">

                <button @click="btnAddBlog" type="button" class="text-white px-10 p-2 rounded-md shadow bg-blue-900 hover:bg-blue-800">Add Blog</button>

                <!-- all blog -->
                <div class="mt-3 bg-white">
                    

                    <div class="overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Title
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Author
                                    </th>
                                    <th>
                                        Publish
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Created
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Detail Blog
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="blog in allBlog" :key="blog.id"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ blog.judul_blog }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ blog.penulis }}
                                    </td>
                                    <td>
                                        {{ blog.publish_at }}
                                    </td>
                                    <td class="px-6 py-4 text-green-500">
                                        {{ blog.created_at }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <a href="#" class="font-medium text-blue-900 dark:text-green-900 hover:underline">Detail</a>
                                    </td>
                                    <td class="px-6 py-4">
                                        <button @click="editBlog(blog.id)" type="button" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            Edit
                                        </button> |
                                        <button @click="btnConfirmDeleteBlog(blog.id)" type="button" class="font-medium text-red-600 dark:text-red-500 hover:underline">Delete</button>
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

                <!-- all blog -->
            </div>

        </div>
        <!-- Blog --> 
    </div>
</template>


<script>
import axios from 'axios';

export default {
    
    data() {
        return {
            // helper val
            token: "",
            confirmDelete: false,
            form_Blog: false,
            btnEditBlog: false,
            idBlogSelect: 0,
            
            
            allBlog: [],
            dataEditUser: {},

            // for form blog
            judul_blog: "",
            penulis: "",
            isi_blog: "",
            search: "",
            tanggal_publish: "",


            // pagination
            currentPage: 1,
            lastPage: 0,
        }
    },

    mounted() {
        this.token = localStorage.getItem('token');
        this.getAllBlog();
    },

    watch: {
        search(newValue){
            // console.log(newValue);
            this.getAllBlog(newValue);
        }
    },

    methods: {

        getAllBlog: async function(query = '') {
            try {
                const all_blog = await axios.get('http://e-consultationbe.test/api/blog', {
                    params: {
                        query: query,
                        page: this.currentPage,
                    },
                })

                console.log(all_blog.data.data.data);
                this.allBlog = all_blog.data.data.data;
                this.currentPage = all_blog.data.data.current_page; // Menyimpan first page data pagination
                this.lastPage = all_blog.data.data.last_page; // Menyimpan data last page pagination
            }catch (error) {
                console.log('error : ' + error )
            }
        },

        nextPage() {
            if(this.currentPage < this.lastPage){
                this.currentPage++;
            } 
            this.getAllBlog()
        },

        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
            this.getAllBlog()
        },

        addBlog: async function(){
            try {
                const add_blog = await axios.post('http://e-consultationbe.test/api/blog', {
                    judul_blog: this.judul_blog,
                    penulis: this.penulis,
                    isi_blog: this.isi_blog,
                    publish_at: this.tanggal_publish
                }, {
                    headers: {
                    Authorization: `Bearer ${this.token}`
                }
                })
                alert(add_blog.message)
                this.getAllBlog();
                this.form_Blog = false;
            } catch(error) {
                console.log(error);
            }

            this.clearDataBlog();
        },

        editBlog: async function(id) {
            this.idBlogSelect = id
            this.btnEditBlog = false
            this.form_Blog = true
            
            try {
                const dataEditBlog = await axios.get(`http://e-consultationbe.test/api/blog/${this.idBlogSelect}`, {
                        headers: {
                            Authorization: `Bearer ${this.token}`
                        }
                    }
                )
                this.dataEditUser = dataEditBlog;
                this.judul_blog = dataEditBlog.data.data.judul_blog;
                this.penulis = dataEditBlog.data.data.penulis;
                this.isi_blog = dataEditBlog.data.data.isi_blog;
                this.tanggal_publish = dataEditBlog.data.data.publish_at;

            }catch(error) {
                console.log(error);
            }

        },

        btnConfirmEdit: async function() {

            try {
                const headers = {
                    'Authorizationclear': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                };

                const dataToUpdate = {
                    judul_blog: this.judul_blog,
                    penulis: this.penulis,
                    isi_blog: this.isi_blog,
                    publish_at: this.tanggal_publish
                };

                const response = await axios({
                    method: 'patch',
                    url: `http://e-consultationbe.test/api/blog/${this.idBlogSelect}`,
                    headers: headers,
                    data: dataToUpdate,
                });

                console.log(response.data);
                alert(response.data.message);
                this.getAllBlog();
                this.form_Blog = false;
            }catch(error) {
                console.log('Error', error);
            }

            this.clearDataBlog();
        },

        async deleteBlog(){

            await axios.delete(`http://e-consultationbe.test/api/blog/${this.idBlogSelect}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`
                }
            }).then((response) => {
                alert(response.data.message);
                this.getAllBlog();
                this.btnCloseDelete()
            }).catch((error) => {
                console.log(error);
            });

            this.clearDataBlog()
        },

        btnAddBlog: function () {
            this.form_Blog = true;
            this.btnEditBlog = true;
        },

        btnCloseBlog: function () {
            this.form_Blog = false;
            this.clearDataBlog();
        },

        btnConfirmDeleteBlog: function(id) {
            this.confirmDelete = true;
            this.idBlogSelect = id
        },

        btnCloseDelete: function () {
            this.confirmDelete = false;
        },

        clearDataBlog() {
            this.idBlogSelect = 0;
            this.judul_blog = "";
            this.isi_blog = "";
            this.penulis = "";
        }
    }
    
}
</script>