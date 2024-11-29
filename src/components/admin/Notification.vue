<style scoped>
    .slide-fade-enter-active, .slide-fade-leave-active {
    transition: transform 0.5s, opacity 0.5s;
    }
    .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(100%);
    opacity: 0;
    }
    .slide-fade-enter-to {
    transform: translateX(0);
    opacity: 1;
    }
    .slide-fade-leave {
    transform: translateX(0);
    opacity: 1;
    }
</style>

<template>
    <div>

        
        <div class="relative">
            <!-- notif toast -->
             <transition name="slide-fade">
                <div v-if="showToast" class="absolute right-8 flex items-center w-full max-w-[260px] px-4 py-3 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800" role="alert">
                    <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                        </svg>
                        <span class="sr-only">Check icon</span>
                    </div>
                    <div class="ms-3 text-sm font-normal">Account successfully Active.</div>
                </div>
             </transition>
            <!-- notif toast -->

            <div class="pl-10 pb-2 border-b-2 border-gray-200">
                <h1 class="font-semibold text-2xl text-slate-700">Notifications</h1>
            </div>
        </div>

        <!-- modal -->
         <div v-if="confirmActive" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
             <div class="overflow-y-auto overflow-x-hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg max-w-md w-full">
                 <div class="relative p-4 w-full max-w-md max-h-full">
                     <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
                         <button @click="closeConfirm" type="button" class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="popup-modal">
                             <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                             </svg>
                         </button>
                         <div class="p-4 md:p-5 text-center">
                             <svg class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                             </svg>
                             <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to active this pastor account?</h3>
                             <button @click="btnConfirmActive" type="button" class="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                                 Yes, I'm sure
                             </button>
                             <button @click="closeConfirm" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">No, cancel</button>
                         </div>
                     </div>
                 </div>
             </div>
         </div>
        <!-- modal -->

        <!-- search user -->
        <div class="mt-3 px-7 bg-white">
            <div class="flex items-center p-1">
                <box-icon name='search-alt-2'></box-icon>
                <input v-model="search" type="text" class="border-none focus:ring-white w-full" placeholder="Username">
            </div>
        </div>
        <!-- search user -->
        <div class="mx-8 mt-5">


            <div class="mt-3 bg-white">
                    

                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                        <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" class="px-6 py-3">
                                        Username
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Role User
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Status
                                    </th>
                                    <th scope="col" class="px-6 py-3">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="active in allActive" :key="active.id"
                                    class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {{ active.name }}
                                    </th>
                                    <td class="px-6 py-4">
                                        {{ active.role_id === 1 ? 'Admin' : (active.role_id === 2 ? 'User' : 'Pastor') }}
                                    </td>
                                    <td class="px-6 py-4" :class="active.role_id == 1 ? 'text-green-300' : 'text-yellow-400' ">
                                        {{ active.active.active }}
                                    </td>
                                    <td class="px-6 py-4">
                                        <button @click="activePastor(active.id)"  type="button" class="ml-3 font-medium text-blue-600 dark:text-blue-500 hover:underline">
                                            <box-icon color="blue" type='solid' name='edit'></box-icon>
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    
                </div>

                <div class="mt-4 w-[150px] mx-auto flex flex-row justify-center">
                    <span @click="prevPage" class="mr-2 btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                        Prev
                    </span>
                    <span @click="nextPage"  class="btn btn-primary cursor-pointer bg-blue-900 hover:bg-blue-800 text-white rounded-md px-4 py-1">
                        Next
                    </span>
                </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios'

    export default{
        inject: ['parentNotifActive'],
        data() {
            return {
                token: '',
                confirmActive: false,
                allActive: [],
                idPastorAccount: 0,

                // pagination
                currentPage: 1,
                lastPage: 0,

                search: '',

                showToast: false,
            }
        },

        mounted() {
            this.token = localStorage.getItem('token');

            this.fetchAllPastorPending();
        },

        watch: {
            search(newValue){
                this.fetchAllPastorPending(newValue)
            }
        },

        methods: {

            fetchAllPastorPending: async function(query = '') {
                try {
                    const headers = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'  
                    }

                    const params = {
                        query: query,
                        page: this.currentPage,
                    }

                    const responseAllPasstor = await axios({
                        method: 'get',
                        url: 'http://e-consultationbe.test/api/active_pastor',
                        headers: headers,
                        params: params
                    })

                    console.log(responseAllPasstor.data.data);
                    this.allActive = responseAllPasstor.data.data.data;
                    this.currentPage = responseAllPasstor.data.data.current_page;
                    this.lastPage = responseAllPasstor.data.data.last_page;
                }catch(error){

                } 
            },

            nextPage() {
                if(this.currentPage < this.lastPage){
                    this.currentPage++;
                } 
                this.fetchAllPastorPending()
            },

            prevPage() {
                if (this.currentPage > 1) {
                    this.currentPage--;
                }
                this.fetchAllPastorPending()
            },

            activePastor: async function (id) {
                this.idPastorAccount = id;
                this.confirmActive = true;
            },

            btnConfirmActive: async function () {
                try {
                    const header = {
                        'Authorization': `Bearer ${this.token}`,
                        'Content-Type': 'application/json'
                    };

                    const active = {
                        active_id: 1
                    }

                    const response = await axios({
                        method: 'patch',
                        url: `http://e-consultationbe.test/api/active_pastor/${this.idPastorAccount}`,
                        headers: header,
                        data: active
                    });

                     // Tampilkan toast setelah berhasil
                    this.showToast = true;

                    // Sembunyikan toast setelah beberapa detik (contoh: 3 detik)
                    setTimeout(() => {
                        this.showToast = false;
                    }, 3000);

                    this.fetchAllPastorPending();
                    this.parentNotifActive();
                    this.confirmActive = false;
                }catch(error){
                    console.log('Error', error);
                }
            },

            closeConfirm: function () {
                this.confirmActive = false;
            },
            notifToast: function () {

            },
        }
    }
</script>